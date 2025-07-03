const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // always use camelCase
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// module.exports =  mongoose.model("User", userSchema);

// Scheme --> Model --> Instances
