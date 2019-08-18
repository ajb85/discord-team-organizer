module.exports = () => {
  let teamName = args.shift();
  teamName = teamName.substring(1, teamName.length - 1);
  const slot = args.length ? args.shift() : null;
  const description = args.length ? args.shift() : null;
  const joinMsg = Teams.join(owner, description, teamName, slot);

  return joinMsg;
};
