const Razorpay = require("razorpay");

// Go to razorpay dashboard  -> accounts & settings  --> copy keyID and keySecret
var instance = new Razorpay({
  key_id: process.env.REZORPAY_KEY_ID,
  key_secret: process.env.REZORPAY_KEY_SECRET,
});

module.exports = instance;
