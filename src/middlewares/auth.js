const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // Read the token from the request cookies
    const { token } = req.cookies; //If cookie is not present [Object: null prototype] {}
    if (!token) {
      throw new Error("Token is not valid!!!!!!!!!");
    }
    // Validate the token
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    // Find the user
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

// const adminAuth = (req, res, next) => {
//   console.log("Admin auth is getting checked!!");
//   const token = "xyz";
//   const isAdminAuthorized = token === "xyz";
//   if (!isAdminAuthorized) {
//     return res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// };

// const userAuth = (req, res, next) => {
//   console.log("User auth is getting checked!!");
//   const token = "xyz";
//   const isUserAuthorized = token === "xyz123";
//   if (!isUserAuthorized) {
//     return res.status(401).send("Unauthorized");
//   } else {
//     next();
//   }
// };

module.exports = { userAuth };
// module.exports = { adminAuth, userAuth };
