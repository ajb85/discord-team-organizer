const reqDir = require("require-dir");

module.exports = class CommandList {
  constructor() {
    this.commands = reqDir("../commands/");
  }

  parse(msg) {
    const raw = msg.content;
    const trigger = "!statesman";
    if (raw.substring(0, 10).toLowerCase() !== trigger) return;

    const args = raw.substring(11).split(",");
    const owner = {
      name: msg.author.username,
      id: msg.author.id,
      avatar: msg.author.avatar
    };
    const command = args.shift().toLowerCase();
    if (this.commands[command]) {
      const newTeam = this.commands[command](args, owner);
      newTeam.logTeam();
    }
  }
};
