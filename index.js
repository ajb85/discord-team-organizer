const Discord = require("discord.js");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const router = require("./routes");

dotenv.config();
const app = express();
const client = new Discord.Client();

// Optional events
client.on("ready", () => {
  console.log("Server count posted!");
});

client.on("error", e => {
  console.log(`Oops! ${e}`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.status(200).send("ok");
});

app.listen((port = process.env.PORT || 3333) => {
  console.log(`Listening on port ${port}`);
});

client.login(process.env.token);
