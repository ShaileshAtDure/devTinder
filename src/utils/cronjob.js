const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const connectionRequestModel = require("../models/connectionRequest");
const { set } = require("mongoose");
const sendEmail = require("../utils/sendEmail");

// ("* * * * * *") => (second (optional), minute, hour, day of month, month, day of week)
// cron.schedule("* * * * *", () => {
//   console.log("Hellow world, " + new Date());
// });

// This job will run at 8 AM in the morning everyday
cron.schedule("0 8 * * *", async () => {
  // Send emails to all people who got requests the previous day
  try {
    const yesterday = subDays(new Date(), 0);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await connectionRequestModel
      .find({
        status: "interested",
        createdAt: {
          $gte: yesterdayStart,
          $lte: yesterdayEnd,
        },
      })
      .populate("fromUserId toUserId");

    console.log("pendingRequests", pendingRequests);
    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    console.log("listOfEmails", listOfEmails);

    for (const email of listOfEmails) {
      // Send Emails
      try {
        const res = await sendEmail.run(
          "New Friend Requests pending for " + email,
          "There are so many friend requests pending, please login to DevTinder.in and accept or reject the requests"
        );
        console.log("res", res);
      } catch (err) {
        console.error(err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
