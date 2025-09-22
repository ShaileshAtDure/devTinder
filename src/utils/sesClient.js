const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1"; // set this region from your aws account ap - means asia specific
// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // we not have
    secretAccessKey: process.env.AWS_SECRET_KEY, // we not have
  },
});
module.exports = { sesClient };
// snippet-end:[ses.JavaScript.createclientv3]
