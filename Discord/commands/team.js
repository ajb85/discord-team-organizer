const reqDir = require('require-dir');

// Temporary measure until DB is up
class Teams {
  constructor() {
    this.teams = [];
  }

  add(team) {
    // O(1) -> O(log n)
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

  join(user, description, teamName, slot) {
    // O(n)
    const team = this._findByName(teamName);
    console.log('User joining team: ', team);
    return team.join(user, description, slot);
  }

  leave(user, teamName) {
    // O(n)
    const team = this._findByName(teamName);
    return team.leave(user);
  }

  _binaryInsert(team) {
    // O(log n)
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

  _findByName(teamName) {
    // O(n)
    return this.teams.find(
      team => team.name.toLowerCase() === teamName.toLowerCase()
    );
  }
}

module.exports = (Teams => (args, commands, owner) => {
  const validCommands = reqDir('../subcommands/team/');
  const command = commands.shift().toLowerCase();

  if (command && validCommands[command]) {
    return validCommands[command](Teams);
  }
})(new Teams());

// !statesman team, date 07/13/2018, time 07:00PM, level 45, activity Stateman Task Force,
// alignment hero
