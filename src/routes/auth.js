const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// app.get or authRouter.get these are exctly same for end user behind the scene there is a different logic

// Also app.use() and router.use() are executed in the same logic, code behaviour, concept of route handler and concept of middleware all things are same

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    // Encrypt the password
    const { firstName, lastName, emailId, password } = req.body;

    // More number of salt round the tufer password to decrypt
    const passwordHash = await bcrypt.hash(password, 10); // Its a good practice to use 10 salt rounds if you set more then its take lots of time to encrypt and decrypt
    console.log("passwordHash", passwordHash);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // console.log("user", user);
    await user.save();
    res.send("User Added successfully!!");
  } catch (err) {
    console.error("Error saving the user:", err.message);
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      // throw new Error("Email Id is not present in DB"); // Never ever disclose important information this is known as information liking becase hacker can get this information which email id present in DB and which email ID not present
      throw new Error("Invalid Credentials");
    }
    // console.log("user", user);
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // Create a JWT Token

      const token = await user.getJWT();

      console.log("token", token);

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Sucessfully!!!");
    } else {
      // throw new Error("Password is not correct");
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
