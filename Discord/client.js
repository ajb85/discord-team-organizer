const Discord = require('discord.js');
const client = new Discord.Client();

const CommandList = require('./classes/CommandList.js');
const commands = new CommandList();

// Optional events
client.on('ready', () => {
  console.log('Statesman Online!');
});

client.on('error', e => {
  console.log(`Oops! ${e}`);
});

client.on('message', msg => {
  console.log('Message obj: ', msg);
  commands.parse(msg);
});

module.exports = client;
