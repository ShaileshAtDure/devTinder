const express = require("express");
const { userAuth } = require("../middlewares/auth");
const paymentRouter = express.Router();
const razorpayInstance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const User = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;

    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100, // Now amount will converte into paisa and create the order sucessfully
      currency: "INR",
      receipt: "receipt#1",
      //   partial_payment: false, // bydefault it is false
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    // Save it in my database

    console.log("order", order);

    const payment = new Payment({
      userId: req.user._id,
      oderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    // Return back my order details to frontend

    res.json({ ...savedPayment.toJSON(), keyId: process.env.REZORPAY_KEY_ID }); // here we do .JSON() because we recive extra mongoose object think so we do .toJSON() and now we recive javascript object only - keyId require for frontend so we send from api or we used in hardcode frontend value also
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ msg: err.message });
  }
});

// This API Razorpay will call so do not write userAuth here
paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    console.log("webhookSignature", webhookSignature);
    // const webhookSignature = req.headers["X-Razorpay-Signature"];
    const isWebhookValid = await validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.REZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }

    // if webhook is valid

    // Update my payment status in DB

    console.log("razorpay payment details", req.body);
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    // Update the user as premium user

    // if (req.body.event == "payment.captured") {
    //   // If you want to do something for capturedn payment then do here...
    // }

    // if (req.body.event == "payment.failed") {
    //   // If you want to do something for failed payment then do here...
    // }

    // return success response to razorpay - If you not return any sucess then razorpay keep calling again and again because it is thinking API is not working

    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.post("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  if (user.isPremium) {
    console.log("user", user);
    return res.json({ ...user });
  }
  return res.json({ ...user });
});

module.exports = paymentRouter;
