const Team = require("../classes/Team.js");
const Command = require("../classes/Command.js");

module.exports = args => {
  const newTeam = new Command({
    date: true,
    time: true,
    level: true,
    activity: true,
    alignment: true
  });
  return newTeam.execute(args, params => new Team(params));
};

// !statesman team, date 07/13/2018, time 07:00PM, level 45, activity Stateman Task Force, alignment hero
