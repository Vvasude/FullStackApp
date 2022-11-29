const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/user");

router.get("/login/", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(500).send({ message: "Invalid Token" });
  }
  //Get Token from Auth Header
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedKey = await admin.auth().verifyIdToken(token); //Firebase Auth
    const filter = { user_ID: decodedKey.user_ID };

    if (!decodedKey) {
      return res.status(505).json({ message: "Not Authorized" });
    } else {
      const userExists = await user.findOne(filter);

      if (!userExists) {
        newUserData(decodedKey, req, res);
      } else {
        return res.send("Need to update existing user");
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
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

module.exports = router;
