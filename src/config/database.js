const mongoose = require("mongoose");

// Good way of writing inside sync function
const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_SECRET);
}; // this is all we need to connect cluster

// mongodb+srv://namasteDevShailesh:cvitfKG3fj6J6ilN@namsatenode.45xim3f.mongodb.net/ - connect to cluster
// mongodb+srv://namasteDevShailesh:cvitfKG3fj6J6ilN@namsatenode.45xim3f.mongodb.net/DevTinder - connect to database

module.exports = connectDB;
