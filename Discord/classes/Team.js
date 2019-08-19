const moment = require('moment');
const AdSlot = require('./AdSlot.js');

class Teammate {
  constructor(member) {
    this.id = member.id;
    this.avatar = member.avatar;
    this.name = member.name;
    this.description = member.description;
    this.isTeammate = true;
  }
}

module.exports = class Team {
  constructor(game) {
    this.start = this._parseStart(game);
    this.level = game.level;
    this.name = game.name ? game.name : ` ${game.owner.name}'s Team`;
    this.team = [new Teammate(game.owner), ...this.emptyTeam()];
    this.owner = game.owner;
    this.alignment = game.alignment;
    this.isComplete = false;
    this.messageID = null;
  }

  _verifySlotIndex(slot) {
    const index = slot - 1;
    return index >= 0 && index < this.team.length;
  }
  _parseStart(game) {
    if (!game.date || !game.time) {
      return moment().format();
    }
    const formatDate = game.date
      .replace(/[^0-9]/gi, '-')
      .split('-')
      .reverse()
      .join('-');
    const dayOrNight = game.time.toLowerCase().includes('am') ? 'am' : 'pm';
    let formatTime = game.time
      .toLowerCase()
      .split(dayOrNight)
      .join(' ');

    if (dayOrNight === 'pm') {
      const hours = Number(formatTime.split(':')[0]) + 12;
      formatTime = hours.toString() + formatTime.substring(2);
    }

    return moment().format(`${formatDate} ${formatTime}`);
  }

  join(user, description, slot) {
    // O(1) - O(n)
    const index = slot ? parseInt(slot, 10) - 1 : this._findFirstEmptyIndex();
    console.log('User joining index: ', index);
    if (index === -1) {
      return 'Sorry, that team is full';
    }
    if (slot && !this._verifySlotIndex(slot)) {
      return 'That slot does not exist.';
    }
    if (this.team[index].isTeammate) {
      return 'Someone is already in that slot!';
    }
    // if (this._findMemberByID(user.id) !== -1) {
    //   return 'You are already on that team!';
    // }

    this.team[index] = new Teammate({ ...user, description });
    // return 'Getting you added now!'; // This is the long term code
    return this.embed(); // This is short term code
  }

  leave(user) {
    const index = this._findMemberByID(user.id);
    if (index === -1) {
      return 'You are not on that team.';
    }
    this.team[index] = new AdSlot({});
    return 'I am removing you from that team now.';
  }

  roleAd(slot, ad) {
    if (this._verifySlotIndex(slot)) {
      this.team[slot - 1] = new AdSlot(ad);
    }
  }

  complete() {
    this.isComplete = true;
  }

  isExpired() {
    const now = moment().format();
    return moment(this.start, 'YY-DD-MM hh:mm').isBefore(now);
  }

  isBefore(team) {
    const date = team
      ? moment(team.start, 'YY-DD-MM hh:mm')
      : moment().format();
    return moment(this.start, 'YY-DD-MM hh:mm').isBefore(date);
  }

  isBeforeOrEqual(team) {
    const date = team
      ? moment(team.start, 'YY-DD-MM hh:mm')
      : moment().format();
    const start = moment(this.start, 'YY-DD-MM hh:mm');
    return start.isBefore(date) || start.isSame(date);
  }

  emptyTeam() {
    const blankAd = {
      archetype: null,
      powersets: null,
      level: null,
      role: null
    };
    return [
      new AdSlot(blankAd),
      new AdSlot(blankAd),
      new AdSlot(blankAd),
      new AdSlot(blankAd),
      new AdSlot(blankAd),
      new AdSlot(blankAd),
      new AdSlot(blankAd)
    ];
  }

  logTeam() {
    console.log('This Team:');
    console.log('Start: ', this.start);
    console.log('Level: ', this.level);
    console.log('Name: ', this.name);
    console.log('Team: ', this.team);
    console.log('Alignment: ', this.alignment);
  }

  embed() {
    let title = this.name;
    const fields = this.team.map((slot, i) => {
      let description = '';
      if (slot.isAd) {
        description += slot.level
          ? `Level ${slot.level}`
          : this.level
          ? `Level ${this.level}`
          : '';
        description += slot.powersets ? ` ${slot.powersets}` : '';
        description += slot.archetype ? ` ${slot.archetype}` : '';
      } else description += slot.description ? slot.description : '';

      if (slot.isAd) {
        description = description.length
          ? `   Requirements: ${description}`
          : '   Requirements: None';
      }
      return {
        name: slot.isAd ? `${i + 1}) Open Slot` : `${i + 1}) ${slot.name}`,
        value: description.length ? description : '   Joined'
      };
    });

    return {
      embed: {
        color: 3447003,
        author: {
          name: title,
          icon_url: `https://cdn.discordapp.com/avatars/${this.owner.id}/${
            this.owner.avatar
          }.jpg`
        },
        title: `Starts in: ${moment(this.start, 'YY-DD-MM hh:mm').fromNow()}`,
        fields,
        timestamp: new Date(),
        footer: {
          text: `Starts: ${moment(this.start, 'YY-DD-MM hh:mm').format(
            'MMMM Do YYYY, h:mm a'
          )}`
        }
      }
    };
  }

  _findFirstEmptyIndex() {
    // O(n)
    for (let i = 0; i < this.team.length; i++) {
      if (this.team[i].isAd) {
        return i;
      }
    }
    return -1;
  }

  _findMemberByID(id) {
    for (let i = 0; i < this.team.length; i++) {
      if (this.team[i].id === id) {
        return i;
      }
    }
    return -1;
  }
};
