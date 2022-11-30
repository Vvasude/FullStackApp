const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const localUser = require("../models/localUser");

router.get("/getOne/", async (req, res) => {
  const filter = { email: req.body.email };

  const data = await localUser.findOne(filter);

  if (data) {
    return res.json(data);
  } else {
    return res.json("Could not be Found");
  }
});

router.post("/signin", async (req, res) => {
  const inputCredentials = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const userCount = await localUser.countDocuments(inputCredentials.email);
    if (userCount == 0) {
      return res
        .status(400)
        .send({ success: "false", msg: "User does not exist" });
    }
    const existingUser = await localUser.findOne(inputCredentials.email);

    const passwordAuth = await bcrypt.compare(
      inputCredentials.password,
      existingUser.password
    );
    if (!passwordAuth) {
      return res
        .status(400)
        .send({ sucess: "false", msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      "dev",
      { expiresIn: "1h" }
    );
    res.status(200).send({ success: existingUser, data: token });
  } catch (error) {
    return res.status(500).send({ success: "false", msg: error });
  }
});

router.post("/signup", async (req, res) => {
  const inputCredentials = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const existingUser = await localUser.countDocuments(inputCredentials.email);
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
