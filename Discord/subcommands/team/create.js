const Team = require('../../classes/Team.js');
const Command = require('../../classes/Command.js');

module.exports = Teams => {
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

  if (!newTeam.isExpired()) {
    newTeam.logTeam();
    Teams.add(newTeam);
    return newTeam.embed();
  } else {
    f;
    return 'Sorry, creating a team in the past would violate continuity.';
  }
};
