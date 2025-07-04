const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //  Creating a new instance of the User model

  const user = new User(req.body);
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
