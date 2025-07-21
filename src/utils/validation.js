const validator = require("validator");
const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("First name and last name is required");
  }
  // You can skip this validation also because this validation apply from database level also.
  //  else if (firstName.length < 4 || firstName.length > 50) {
  //     throw new Error("First name should be between 4 to 50 characters");
  //   }
  else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

module.exports = { validateSignUpData };
