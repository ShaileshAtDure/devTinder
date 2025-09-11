const express = require("express");
const userRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // User should see all the user cards except
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection request

    // Example : Rahul = [Mark, Donald, MS Dhoni, Virat]
    // R --> Akshay --> Rejected R --> Elon --> Accepted
    // Elon = [Akshay, Mark, Donald, MS Dhoni, Virat] // Elone see this feed.
    // Akshay = [Elon, Mark, Donald, MS Dhoni, Virat] // Akshay see this feed.

    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1; // page number not a problem with attacker attack
    let limit = parseInt(req.query.limit) || 10; // limit have a problem when attacker attack
    limit = limit > 50 ? 50 : limit; // do not understand these logic
    const skip = (page - 1) * limit;

    // Find all connection request
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    console.log("connectionRequests", connectionRequests);

    // connectionRequests = [
    //   {
    //     _id: new ObjectId("68c13d5b1ceb905debf71e02"),
    //     fromUserId: new ObjectId("68c13bcc1ceb905debf71ded"),
    //     toUserId: new ObjectId("68c13ccb1ceb905debf71df7"),
    //   },
    //   {
    //     _id: new ObjectId("68c13da9b1ecdd4de5a49c38"),
    //     fromUserId: new ObjectId("68c13c0f1ceb905debf71def"),
    //     toUserId: new ObjectId("68c13ccb1ceb905debf71df7"),
    //   },
    //   {
    //     _id: new ObjectId("68c13dc4b1ecdd4de5a49c3f"),
    //     fromUserId: new ObjectId("68c13c241ceb905debf71df1"),
    //     toUserId: new ObjectId("68c13ccb1ceb905debf71df7"),
    //   },
    //   {
    //     _id: new ObjectId("68c13de3b1ecdd4de5a49c46"),
    //     fromUserId: new ObjectId("68c13c331ceb905debf71df3"),
    //     toUserId: new ObjectId("68c13ccb1ceb905debf71df7"),
    //   },
    //   {
    //     _id: new ObjectId("68c13e53b1ecdd4de5a49c52"),
    //     fromUserId: new ObjectId("68c13ccb1ceb905debf71df7"),
    //     toUserId: new ObjectId("68c13cb91ceb905debf71df5"),
    //   },
    // ];

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    console.log("hideUsersFromFeed", hideUsersFromFeed);
    // {
    //     "68c13bcc1ceb905debf71ded",
    //     "68c13ccb1ceb905debf71df7",
    //     "68c13c0f1ceb905debf71def",
    //     "68c13c241ceb905debf71df1",
    //     "68c13c331ceb905debf71df3",
    //     "68c13cb91ceb905debf71df5";
    // }

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip) // default value is 0
      .limit(limit); // default value is taking all the users

    res.send(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
