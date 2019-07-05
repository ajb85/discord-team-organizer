const Discord = require("discord.js");
const client = new Discord.Client();

// Optional events
client.on("ready", () => {
  console.log("Stateman Online!");
});

client.on("error", e => {
  console.log(`Oops! ${e}`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("Pong!");
  }
});

module.exports = client;
