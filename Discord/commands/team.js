const moment = require('moment');
const Team = require('../classes/Team.js');
const Command = require('../classes/Command.js');

// Temporary measure until DB is up
class Teams {
  constructor() {
    this.teams = [];
  }

  add(team) {
    if (
      !this.teams.length ||
      this.teams[this.teams.length - 1].isBeforeOrEqual(team)
    ) {
      this.teams.push(team);
    } else if (team.isBeforeOrEqual(this.teams[0])) {
      this.teams.unshift(team);
    } else {
      this._binaryInsert(team);
    }
  }

  _binaryInsert(team) {
    let max = this.teams.length - 1;
    let min = 0;

    while (true) {
      let index = Math.floor((max + min) / 2);
      const current = this.teams[index];
      const next = this.teams[index + 1];
      const prev = this.teams[index - 1];
      if (current.isBeforeOrEqual(team) && team.isBeforeOrEqual(next)) {
        this.teams.splice(index + 1, 0, team);
        break;
      } else if (prev.isBeforeOrEqual(team) && team.isBefore(current)) {
        this.teams.splice(index - 1, 0, team);
        break;
      } else if (current.isBefore(team)) {
        min = index;
      } else {
        max = index;
      }
    }
  }
}

module.exports = (Teams => (args, command, owner) => {
  const teamCmd = new Command({
    date: true,
    time: true,
    level: true,
    name: true,
    alignment: true
  });

  const create = () => {
    const newTeam = teamCmd.execute(
      args,
      params => new Team({ ...params, owner })
    );

    if (!newTeam.isExpired()) {
      newTeam.logTeam();
      Teams.add(newTeam);
      return newTeam.embed();
    } else {
      f;
      return 'Sorry, creating a team in the past would violate continuity.';
    }
  };

  const join = () => {};

  const validCommands = {
    create,
    join
  };

  if (command) {
    validCommands[command]();
  }
})(new Teams());

// !statesman team, date 07/13/2018, time 07:00PM, level 45, activity Stateman Task Force,
// alignment hero
