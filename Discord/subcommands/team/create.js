const Team = require('../../classes/Team.js');
const Command = require('../../classes/Command.js');

module.exports = (args, owner, Teams) => {
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
    return `New team created in #${process.env.TEAM_CHANNEL}!`;
  } else {
    return 'Sorry, creating a team in the past would violate continuity.';
  }
};
