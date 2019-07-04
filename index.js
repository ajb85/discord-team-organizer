const Discord = require("discord.js");
const DBL = require("dblapi.js");
const express = require("express");

const app = express();
const token = require("./API_TOKEN.js");
const client = new Discord.Client();
const dbl = new DBL(token, client);

// Optional events
dbl.on("posted", () => {
  console.log("Server count posted!");
});

dbl.on("error", e => {
  console.log(`Oops! ${e}`);
});

// app.use(json());
// app.use(cors());

// app.listen((port = process.env.PORT || 3333) => {
//   console.log(`Listening on port ${port}`);
// });
