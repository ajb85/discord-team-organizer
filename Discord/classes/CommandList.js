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
    console.log("PARSED: ", command);
    console.log("ARGS: ", args);
    if (this.commands[command]) {
      console.log("Command found");
      console.log(this.commands[command](args));
    }
  }
};
