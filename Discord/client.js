const Discord = require('discord.js');
const client = new Discord.Client();

const CommandList = require('./classes/CommandList.js');
const commands = new CommandList(client);

// Optional events
client.on('ready', () => {
  console.log('Statesman Online!');
  // setInterval(commands.manageMessages.bind(this), 60000);
});

client.on('error', e => {
  console.log(`Oops! ${e}`);
});

client.on('message', msg => {
  if (!msg.author.equals(client.user)) {
    // Only parse the message if the bot didn't send it
    console.log('MESSAGE OBJECT: ', msg);
    commands.parse(msg);
  }
});

module.exports = client;
