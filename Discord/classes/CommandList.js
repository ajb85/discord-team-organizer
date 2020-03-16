const reqDir = require('require-dir');

module.exports = class CommandList {
  constructor(client) {
    // this.commands = reqDir('../commands/');
    this.trigger = process.env.TRIGGER;
    this.client = client;
    this.channel;
    this.messageIDs = [];
  }

  parse(msg) {
    const split = msg.split(' ');
    if (split.shift() !== process.env.TRIGGER) {
      // Do nothing if trigger isn't used
      return;
    }
  }
};
