const moment = require('moment');
const Teammate = require('./Teammate.js');
const AdSlot = require('./AdSlot.js');

module.exports = class Team {
  constructor(game) {
    this.start = this._parseStart(game);
    this.level = game.level;
    this.name = game.name ? game.name : ` ${game.owner.name}'s Team`;
    this.team = [new Teammate(game.owner), ...this.emptyTeam()];
    this.alignment = game.alignment;
    this.isComplete = false;
  }

  _verifySlot(slot) {
    const index = slot - 1;
    return index > 1 && index < 8;
  }
  _parseStart(game) {
    if (!game.start) {
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

  roleAd(slot, ad) {
    if (_verifySlot(slot)) {
      this.team[slot - 1] = new AdSlot(ad);
    }
  }

  apply(slot, member) {
    if (_verifySlot(slot) && this.team[slot - 1].isAd) {
      this.team[slot - 1].applicants.push(new Teammate(member));
    }
  }

  acceptApplicant(slot, appIndex) {
    if (_verifySlot(slot) && this.team[slot - 1].isAd) {
      const member = this.team[slot - 1].applicants[appIndex];
      this.team[slot - 1] = member;
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

    const fields = this.team.map(slot => {
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
          ? `Requirements: ${description}`
          : 'Requirements: None';
      }
      return {
        name: slot.isAd ? 'Open Slot' : slot.name,
        description: description ? description : 'Joined'
      };
    });

    return {
      embed: {
        color: 3447003,
        author: {
          name: title,
          icon_url: `https://cdn.discordapp.com/avatars/${owner.id}/${
            owner.avatar
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
};
