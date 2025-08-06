const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    // always use camelCase
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validator(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      // As soon as data is put in the databse this valiadation will be run and value is pass to the database it first go throught this validation function if this validation does not throw any error then this value will be saved in the database otherwise database will not be updated and error will be thrown

      // By default this validate method only call when the new document is created. suppose existing data is there and you update that data then its not go through this validation function

      // This validate function only run when you are creating a new object but when you are updating the data then this validate function is not run we need to enbale it by using option of "runValidators: true" in patch method(API).
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
      validator(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // }, // You don't need to do this because mongodb give you a amezing thing called "timestamps" which will automatically add createdAt and updatedAt field in your schema
  },
  {
    timestamps: true, // USing this created and updated field add in your database without any extra payload
  }
);

// Do not use arrow function because arrow function does not have access to this keyword
userSchema.methods.getJWT = async function () {
  const user = this; // Here this represent to that particular instance of the user
  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;

  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  ); // If you interchange this sequence then it is not working

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

// module.exports =  mongoose.model("User", userSchema);

// Scheme --> Model --> Instances
