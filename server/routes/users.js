const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user");

router.get("/credentials", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedKey = await admin.auth().verifyIdToken(token);

    if (!decodedKey) {
      return res.status(400).send({ msg: "Token Credentials Not Found" });
    }
    const filter = { email: decodedKey.email };
    const foundUser = await user.findOne(filter);

    return res.status(200).send({ success: "true", user: foundUser });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/login/", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  //Get Token from Auth Header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedKey = await admin.auth().verifyIdToken(token); //Firebase Auth

    if (!decodedKey) {
      return res.status(505).json({ message: "Not Authorized" });
    } else {
      const filter = { user_ID: decodedKey.user_id };
      const userExists = await user.findOne(filter);

      if (!userExists) {
        newUserData(decodedKey, req, res);
      } else {
        updateUserData(decodedKey, req, res);
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});
//Function to pass new UserData into DB
const newUserData = async (decodedKey, req, res) => {
  //New User Object to be saved as user
  const newUser = new user({
    name: decodedKey.name,
    email: decodedKey.email,
    imageURL: decodedKey.picture,
    user_ID: decodedKey.user_id,
    emailVerified: decodedKey.email_verified,
    role: "member",
    authTime: decodedKey.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ success: true, user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

//Function to update existing user data
const updateUserData = async (decodedKey, req, res) => {
  const filter = { user_ID: decodedKey.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const updatedUser = await user.findOneAndUpdate(
      filter,
      { authTime: decodedKey.auth_time },
      options
    );
    res.status(200).send({ success: true, user: updatedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

module.exports = router;
