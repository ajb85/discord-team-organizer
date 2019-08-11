const Team = require('../classes/Team.js');
const Command = require('../classes/Command.js');

// Temporary measure until DB is up
const db = [];

class Teams {
  constructor() {
    this.teams = [];
  }

  add(team) {
    const { start } = team;

    if (
      !this.teams.length ||
      start >= this.teams[this.teams.length - 1].start
    ) {
      this.teams.push(team);
    } else if (start <= this.teams[0].start) {
      this.teams.unshift(team);
    } else {
      this._binaryInsert(team);
    }
  }

  _binaryInsert(team) {
    const { start } = team;
    let max = this.teams.length - 1;
    let min = 0;

    while (true) {
      let index = Math.floor((max + min) / 2);
      const current = this.teams[index];
      const next = this.teams[index + 1];
      const prev = this.teams[index - 1];
      if (start >= current.start && start <= next.start) {
        this.teams.splice(index + 1, 0, team);
        break;
      } else if (start >= prev.start && start < current.start) {
        this.teams.splice(index - 1, 0, team);
        break;
      } else if (start > current.start) {
        min = index;
      } else {
        max = index;
      }
    }
  }
}

module.exports = (Teams => (args, owner) => {
  const teamCmd = new Command({
    date: true,
    time: true,
    level: true,
    name: true,
    alignment: true
  });
  const newTeam = teamCmd.execute(
    args,
    params => new Team({ ...params, owner })
  );

  // if (new Date(newTeam.start) >= new Date()) {
  newTeam.logTeam();
  Teams.add(newTeam);

  return newTeam.embed();
  // } else {
  //   return 'Sorry, creating a team in the past would violate continuity.';
  // }
})(new Teams());
// !statesman team, date 07/13/2018, time 07:00PM, level 45, activity Stateman Task Force,
// alignment hero
