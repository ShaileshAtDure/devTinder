const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
      // res.status(400).send("Invalid Edit Request"); // You can do these also instade of throw error
    }

    const loggedUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));

    await loggedUser.save();

    res.json({
      message: `${loggedUser.firstName} your profile updated successfully`,
      data: loggedUser,
    }); // Good way of sending the response
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;
