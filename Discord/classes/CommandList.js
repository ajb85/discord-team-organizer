const reqDir = require('require-dir');

module.exports = class CommandList {
  constructor() {
    this.commands = reqDir('../commands/');
  }

  parse(msg) {
    const raw = msg.content;
    const trigger = '!statesman';
    if (raw.substring(0, 10).toLowerCase() !== trigger) return;

    const args = raw.substring(11).split(', ');

    const msgOwner = {
      name: msg.author.username,
      id: msg.author.id,
      avatar: msg.author.avatar
    };

    const command = args.shift().toLowerCase();

    if (this.commands[command]) {
      const botResponse = this.commands[command](args, msgOwner);
      if (botResponse) {
        msg.reply(botResponse);
      }
    }
  }
};
