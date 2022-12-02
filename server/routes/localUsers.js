const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const localUser = require("../models/localUser");

router.get("/credentials/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;

    if (!token) {
      return res.status(400).send({ msg: "Token Credentials Not Found" });
    }
    decodedData = jwt.verify(token, "dev");
    if (!decodedData) {
      return res.status(400).send({ msg: "Could Not Verify Token Request" });
    }

    const filter = { email: decodedData.email };
    const foundUser = await localUser.findOne(filter);

    return res.status(200).send({ success: "true", data: foundUser });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/signin", async (req, res) => {
  const filter = { email: req.body.email };

  const existingUser = await localUser.findOne(filter);
  if (!existingUser) {
    return res.status(400).send({ success: "false", msg: "User Not Found" });
  }

  const passwordCheck = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );

  if (!passwordCheck) {
    return res
      .status(400)
      .send({ success: "false", msg: "Invalid Credentials" });
  }

  const token = jwt.sign(
    {
      email: existingUser.email,
      id: existingUser._id,
    },
    "dev",
    { expiresIn: "1h" }
  );
  return res.status(200).send({ user: existingUser, token: token });
});

router.post("/signup", async (req, res) => {
  const inputCredentials = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const existingUser = await localUser.countDocuments({
      email: req.body.email,
    });
    if (existingUser > 0) {
      return res
        .status(400)
        .send({ success: "false", msg: "User Already Exists" });
    }

    const hashedPassword = await bcrypt.hash(inputCredentials.password, 12);
    const nameString =
      inputCredentials.firstName + " " + inputCredentials.lastName;

    const newUser = new localUser({
      name: nameString,
      email: inputCredentials.email,
      password: hashedPassword,
      role: "member",
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser._id,
      },
      "dev",
      { expiresIn: "1h" }
    );

    try {
      const savedUser = await newUser.save();
      return res.status(200).send({ user: savedUser, token: token });
    } catch (error) {
      return res.status(400).send({ success: "false", msg: error });
    }
  } catch (error) {
    return res.status(500).send({ success: "false", msg: error });
  }
});

module.exports = router;
