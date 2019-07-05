const reqDir = require("require-dir");

module.exports = class CommandList {
  constructor() {
    this.commands = reqDir("../commands/");
  }

  parse(msg) {
    const raw = msg.content;
    const trigger = "!statesman";
    if (raw.substring(0, 10) !== trigger) return;

    const args = raw.substring(11).split(",");
    const owner = {
      name: msg.author.username,
      id: msg.author.id,
      avatar: msg.author.avatar
    };
    const command = args.shift();
    console.log("PARSED: ", command);
    console.log("ARGS: ", args);
    console.log("BY OWNER: ", owner);
    if (this.commands[command]) {
      console.log("Command found");
      console.log(this.commands[command](args, owner));
    }
  }
};
