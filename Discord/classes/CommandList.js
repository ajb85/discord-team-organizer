module.exports = class CommandList {
  constructor(client) {
    this.commands = reqDir('../commands/');
    this.trigger = process.env.TRIGGER;
    this.client = client;
    this.channel;
    this.messageIDs = [];
    this.Teams = new Teams();
    console.log('TEAMS: ', this.Teams);
  }

  parse(msg) {
    const split = msg.split(' ');
    if (split.shift() !== process.env.TRIGGER) {
      // Do nothing if trigger isn't used
      return;
    }
  }
};
