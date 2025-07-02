console.log("Starting a new Project");

// 15:00

// In package.json folder before version sign is known as caret sign (^4.19.2)

// Version of the package

//  4 => Major version (Major changes only updated when the changes will break existing library)
//  19 => Minor version (only change when backeword compaitable)
//  2 => Patch version (small change bug fix)

// ~version :- “Approximately equivalent to version”, will automatically update you to all future patch versions that are backwards-compatible, without incrementing the minor version. ~1.2.3 will use releases from 1.2.3 to < 1.3.0. (1.2.9)

// ^version :- “Compatible with version”, will automatically update you to all future minor/patch versions that are backwards-compatible, without incrementing the major version. ^1.2.3 will use releases from 1.2.3 to < 2.0.0. (1.9.0)

// 4.19.2 - Never update

const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Hello Namsate from the server");
});

// "/test" - Its a request handlers

app.use("/test", (req, res) => {
  res.send("Hello from the server");
});

app.listen(7000, () => {
  console.log("Server is successfully listening on port 3000...");
});
