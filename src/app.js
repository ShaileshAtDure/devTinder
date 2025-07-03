const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObject = {
    firstName: "Akshay",
    lastName: "Saini",
    emailId: "Akshay.saini@in",
    password: "Akshay123",
  };

  // Creating a new instance of the User model
  //   const user = new User({
  //     firstName: "Shailesh",
  //     lastName: "Sangle",
  //     emailId: "shailesh.sangle@in",
  //     password: "shailesh123",
  //   });

  const user = new User(userObject);

  // Most of the mongoose function return a promise so need to use async await
  // whenever you are doing some DB operation always wrap inside try and catch block
  try {
    await user.save();
    res.send("User Added successfully!!");
  } catch (err) {
    res.status(400).send("Error saving the user:", +err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    // We first established database connection and then start our server
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected!!", err);
  });
