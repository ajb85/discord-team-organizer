const reqDir = require('require-dir');

module.exports = class CommandList {
  constructor(client) {
    this.commands = reqDir('../commands/');
    this.trigger = process.env.TRIGGER;
    this.client = client;
    this.channelID;
  }
  parse(msg) {
    const raw = msg.content;
    if (
      raw.substring(0, this.trigger.length).toLowerCase() !== this.trigger ||
      !this.trigger
    ) {
      return;
    }

    if (!this.channelID) {
      const existingChannel = this.client.channels.find(
        'name',
        process.env.TEAM_CHANNEL
      );

      if (existingChannel) {
        this.channelID = existingChannel.id;
      } else {
        msg.guild
          .createChannel(process.env.TEAM_CHANNEL)
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }
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
        msgOwner,
        this.client
      );

      if (botResponse) {
        msg.reply(botResponse);
      }
    }
  }
};
