const moment = require("moment");
const Teammate = require("./Teammate.js");
const AdSlot = require("./AdSlot.js");

module.exports = class Team {
  constructor(game) {
    const formatDate = game.date
      .replace(/[^0-9]/gi, "-")
      .split("-")
      .reverse()
      .join("-");
    const dayOrNight = game.time.toLowerCase().includes("am") ? "am" : "pm";
    const formatTime =
      game.time
        .toLowerCase()
        .split(dayOrNight)
        .join(" ") + ` ${dayOrNight}`;

    this.start = moment().format(`${formatDate}, ${formatTime}`);
    this.level = game.level;
    this.activity = game.activity;
    this.team = [new Teammate(game.owner), ...this.emptyTeam()];
    this.alignment = game.alignment;
    this.isComplete = false;
  }

  verifySlot(slot) {
    const index = slot - 1;
    return index > 1 && index < 8;
  }

  roleAd(slot, ad) {
    if (verifySlot(slot)) {
      this.team[slot - 1] = new AdSlot(ad);
    }
  }

  apply(slot, member) {
    if (verifySlot(slot) && this.team[slot - 1].isAd) {
      this.team[slot - 1].applicants.push(new Teammate(member));
    }
  }

  acceptApplicant(slot, appIndex) {
    if (verifySlot(slot) && this.team[slot - 1].isAd) {
      const member = this.team[slot - 1].applicants[appIndex];
      this.team[slot - 1] = member;
    }
  }

  complete() {
    this.isComplete = true;
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
    console.log("This Team:");
    console.log("Start: ", this.start);
    console.log("Level: ", this.level);
    console.log("Activity: ", this.activity);
    console.log("Team: ", this.team);
    console.log("Alignment: ", this.alignment);
  }

  embed() {
    const owner = this.team[0];
    let title = "";
    title += this.level ? `Level ${this.level}+` : "";
    title += this.activity ? this.activity : `${owner.name}'s Team`;
    return {
      embed: {
        color: 3447003,
        author: {
          name: owner.name,
          icon_url: `https://cdn.discordapp.com/avatars/${owner.id}/${
            owner.avatar
          }.jpg`
        },
        title,
        fields: this.team.map(member => {
          let value = "";
          value += member.level
            ? `Level ${member.level}`
            : this.level
            ? `Level ${this.level}`
            : "";
          value += member.powersets ? ` ${member.powersets}` : "";
          value += member.archetype ? ` ${member.archetype}` : "";

          if (member.isAd) {
            value = value.length
              ? `Requirements: ${value}`
              : "Requirements: None";
          }
          return {
            name: member.isAd ? "Open Slot" : member.name,
            value
          };
        }),
        timestamp: new Date(),
        footer: {
          text: `Starts: ${moment(this.start).format("MMMM Do YYYY, h:mm a")}`
        }
      }
    };
  }
};

// Example objects:

// Team:
/*
    {
        date: ,
        time: ,
        level: ,
        activity: ,
        alignment: ,
        owner: {TEAMMEMBER OBJECT},
    }
*/

// Teammember:
/*
{
    name: ,
    archetype: ,
    level: ,
    powersets: ,
}
*/

// AdSlot:
/*
{
    archetype: ,
    powersets: ,
    level: ,
    role: ,
}
*/
