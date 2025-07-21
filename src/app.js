const express = require("express");
require("./config/database");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      // throw new Error("Email Id is not present in DB"); // Never ever disclose important information this is known as information liking becase hacker can get this information which email id present in DB and which email ID not present
      throw new Error("Invalid Credentials");
    }
    console.log("user", user);
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Sucessfully!!!");
    } else {
      // throw new Error("Password is not correct");
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
  //   try {
  //     const users = await User.find({ emailId: userEmail });
  //     if (users.length === 0) {
  //       res.status(404).send("User not found");
  //     }
  //     res.send(users);
  //   } catch (err) {
  //     res.status(400).send("Something went wrong");
  //   }
});

// Feed API - GET/feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

// Delete a user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const deletedUser = await User.findByIdAndDelete(userId); // It is a shorthand of the above line
    res.send("User Deleted successfully!!");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

// Update data of the user
// If you pass extra field to update but that field is not in schema then it will not be updated in data base, any other data which is apart of schema will be ignore by API's.

app.patch("/user/:userId", async (req, res) => {
  // findByIdAndUpdate :- Here you can only pass id but behind the seens this method call findOneAndUpdate
  // findOneAndUpdate :- Here you can pass id, emailId, other thinks also
  const userId = req.params?.userId; // good to add question mark to make it optional
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      // return res.status(400).send("Update not allowed");
      throw new Error("Update not allowed");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log("user", user); // It will return document which are before update and also if you write returnDocument after then its return after updated data by default it takes before.

    res.send("User Updated successfully!!");
  } catch (err) {
    res.status(404).send("UPDATE FAILED: " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    // We first established database connection and then start our server
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database can not be connected!!", err);
  });
