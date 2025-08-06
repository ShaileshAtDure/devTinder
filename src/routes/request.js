const express = require("express");

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", async (req, res) => {
  // Sending a connection request
  console.log("Sending a connection request");

  res.send("Connection Request Sent!");
});

module.exports = requestRouter;
