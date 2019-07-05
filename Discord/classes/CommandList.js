const reqDir = require("require-dir");

module.exports = class CommandList {
  constructor() {
    this.commands = reqDir("../commands/");
  }

  parse(raw) {
    const trigger = "!statesman";
    if (raw.substring(0, 10) !== trigger) return;

    const args = raw.substring(11).split(",");
    const command = args.shift();
    if (this.commands[command]) this.commands[command](args);
  }
};
