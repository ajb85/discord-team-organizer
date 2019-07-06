const Team = require("../classes/Team.js");
const Command = require("../classes/Command.js");

// Temporary measure until DB is up
const db = [];

module.exports = (args, owner) => {
  const newTeam = new Command({
    date: true,
    time: true,
    level: true,
    activity: true,
    alignment: true,
    description: true
  });
  db.push(newTeam);
  return newTeam.execute(args, params => new Team({ ...params, owner }));
};

// !statesman team, date 07/13/2018, time 07:00PM, level 45, activity Stateman Task Force, alignment hero
