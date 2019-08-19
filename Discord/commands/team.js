const reqDir = require('require-dir');

module.exports = (args, commands, owner, Teams) => {
  const validCommands = reqDir('../subcommands/team/');
  const command = commands.shift().toLowerCase();

  if (command && validCommands[command]) {
    return validCommands[command](args, owner, Teams);
  }
};

// !statesman team, date 07/13/2018, time 07:00PM, level 45, activity Stateman Task Force,
// alignment hero
