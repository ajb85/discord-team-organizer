const reqDir = require('require-dir');

module.exports = (args, commands, owner, Teams, updateMessages) => {
  const validCommands = reqDir('../subcommands/team/');
  const command = commands.shift().toLowerCase();

  if (command && validCommands[command]) {
    const botResponse = validCommands[command](args, owner, Teams);
    updateMessages();
    return botResponse;
  }
};

// !statesman team, date 07/13/2018, time 07:00PM, level 45, activity Stateman Task Force,
// alignment hero
