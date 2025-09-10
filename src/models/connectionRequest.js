const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // refernce to the User collection
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      //   default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Creating index unnecessary also make cause because DB takes very tough time to handle indexes
// Database generally built using trees

connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); // This is a compound index which will help us to make query more efficient or fast.

// This is not mandotory to write and check this here we write because to understand how schema level validation works you can do same thing in API level also and also this is good way to write here also because here its a schema level job to check our fromUserId and toUserId is same

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // Check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send connection request to yourself!");
  }
  next();
});

const connectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = connectionRequestModel;
