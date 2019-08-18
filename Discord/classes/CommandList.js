const reqDir = require('require-dir');

module.exports = class CommandList {
  constructor() {
    this.commands = reqDir('../commands/');
    this.trigger = '!statesman'; // Could update to process.env.TRIGGER
  }
  parse(msg) {
    const raw = msg.content;
    if (
      raw.substring(0, this.trigger.length).toLowerCase() !== this.trigger ||
      !this.trigger
    ) {
      return;
    }

    // Remove trigger plus space
    const args = raw.substring(this.trigger.length + 1).split(', ');

    const msgOwner = {
      name: msg.author.username,
      id: msg.author.id,
      avatar: msg.author.avatar
    };

    const commands = args
      .shift()
      .toLowerCase()
      .split(' ');
    const command = commands.shift();

    if (this.commands[command]) {
      const botResponse = this.commands[command](
        args,
        commands.length ? commands : null,
        msgOwner
      );

      if (botResponse) {
        msg.reply(botResponse);
      }
    }
  }
};
