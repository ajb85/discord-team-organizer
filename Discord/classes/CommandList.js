const reqDir = require('require-dir');

// Temporary measure until DB is up
class Teams {
  constructor(client) {
    this.teams = [];
  }

  getSize() {
    return this.teams.length;
  }

  add(team) {
    // O(1) -> O(log n)
    if (
      !this.teams.length ||
      this.teams[this.teams.length - 1].isBeforeOrEqual(team)
    ) {
      this.teams.push(team);
    } else if (team.isBeforeOrEqual(this.teams[0])) {
      this.teams.unshift(team);
    } else {
      this._binaryInsert(team);
    }
  }

  join(user, description, teamName, slot) {
    // O(n)
    const team = this._findByName(teamName);
    console.log('User joining team: ', team);
    return team.join(user, description, slot);
  }

  leave(user, teamName) {
    // O(n)
    const team = this._findByName(teamName);
    return team.leave(user);
  }

  _binaryInsert(team) {
    // O(log n)
    let max = this.teams.length - 1;
    let min = 0;

    while (true) {
      let index = Math.floor((max + min) / 2);
      const current = this.teams[index];
      const next = this.teams[index + 1];
      const prev = this.teams[index - 1];
      if (current.isBeforeOrEqual(team) && team.isBeforeOrEqual(next)) {
        this.teams.splice(index + 1, 0, team);
        break;
      } else if (prev.isBeforeOrEqual(team) && team.isBefore(current)) {
        this.teams.splice(index - 1, 0, team);
        break;
      } else if (current.isBefore(team)) {
        min = index;
      } else {
        max = index;
      }
    }
  }

  _findByName(teamName) {
    // O(n)
    return this.teams.find(
      team => team.name.toLowerCase() === teamName.toLowerCase()
    );
  }
}
module.exports = class CommandList {
  constructor(client) {
    this.commands = reqDir('../commands/');
    this.trigger = process.env.TRIGGER;
    this.client = client;
    this.channel;
    this.messageIDs = [];
    this.Teams = new Teams();
  }

  parse(msg) {
    const raw = msg.content;
    if (
      raw.substring(0, this.trigger.length).toLowerCase() !== this.trigger ||
      !this.trigger
    ) {
      return;
    }

    if (!this.channel) {
      // In the event a channel is created, this.channel is a promise
      // So always use it with a .then()
      this.channel = findOrCreateChannel(msg, this.client);
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
        this.Teams,
        this.manageMessages.bind(this)
      );

      if (botResponse) {
        msg.reply(botResponse);
      }
    }
  }

  manageMessages() {
    for (let i = this.Teams.getSize(); i < this.messageIDs.length; i++) {
      this.channel.then(channel =>
        channel.fetchMessage(this.messageIDs[i].delete())
      );
    }
    console.log(
      'MODIFY MESSAGES: ',
      this.messageIDs.slice(this.Teams.getSize()).length ===
        this.Teams.getSize() - this.messageIDs.length
    );

    if (!this.Teams.getSize()) {
      return;
    }

    this.Teams.teams.forEach((team, i) => {
      if (this.messageIDs(i)) {
        this.channel
          .fetchMessage(this.messageIDs[i])
          .then(msg => msg.edit(team.embed()));
      } else {
        this.channel.send(team.embed()).then(msg => {
          console.log('New Message: ', msg);
          this.messageIDs.push(msg.id);
        });
      }
    });
  }
};

function findOrCreateChannel(msg, client) {
  console.log('Team channel not found');
  const existingChannel = client.channels.find(
    'name',
    process.env.TEAM_CHANNEL
  );

  if (existingChannel) {
    console.log(
      `Found channel: ${existingChannel.name}: ${existingChannel.id}`
    );

    return existingChannel;
  } else {
    return msg.guild.createChannel(process.env.TEAM_CHANNEL);
  }
}
