const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    // Using populate and ref you are joining two tables data together
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age gender about skills"
    );
    // }).populate("fromUserId", ["firstName", "lastName"]); // you can also write this way but we mostly prefred to write in a string

    res.json({
      message: "Data fetch successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    // res.json({data: connectionRequests }) // received all connection data
    console.log("connectionRequests", connectionRequests);

    // connectionRequests = [
    //   {
    //     _id: new ObjectId('6895980390e3c33b8fb07a24'),
    //     fromUserId: {
    //       _id: new ObjectId('68931d4b5129a0536804b6af'),
    //       firstName: 'rohit',
    //       lastName: 'shettya',
    //       photoUrl: 'https://akshaysaini.in/img/akshay.jpg',
    //       about: 'Software Engineer by profession and a teacher by heart.',
    //       skills: [Array],
    //       age: 30,
    //       gender: 'male'
    //     },
    //     toUserId: {
    //       _id: new ObjectId('689597d490e3c33b8fb07a1e'),
    //       firstName: 'rohit',
    //       lastName: 'shettya',
    //       photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg',
    //       about: 'This is a default about of the user!',
    //       skills: []
    //     },
    //     status: 'accepted',
    //     createdAt: 2025-08-08T06:24:03.684Z,
    //     updatedAt: 2025-09-08T12:25:01.471Z,
    //     __v: 0
    //   }
    // ]

    // Below are bug to watch again check (26 - 1:33:00)

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() == loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    console.log("data", data);

    // data =  [
    //   {
    //     _id: new ObjectId('68931d4b5129a0536804b6af'),
    //     firstName: 'rohit',
    //     lastName: 'shettya',
    //     photoUrl: 'https://akshaysaini.in/img/akshay.jpg',
    //     about: 'Software Engineer by profession and a teacher by heart.',
    //     skills: [ 'javascript', 'react', 'node' ],
    //     age: 30,
    //     gender: 'male'
    //   }
    // ]

    res.json({ data });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = userRouter;
