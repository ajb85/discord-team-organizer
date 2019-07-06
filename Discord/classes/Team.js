const moment = require("moment");
const Teammate = require("./Teammate.js");
const AdSlot = require("./AdSlot.js");

module.exports = class Team {
  constructor(game) {
    const formatDate = game.date.replace(/[^0-9]/gi, " ");
    const dayOrNight = game.time.toLowerCase().includes("am") ? "am" : "pm";
    console.log("AM OR PM: ", dayOrNight);
    const formatTime = game.time
      .toLowerCase()
      .split(dayOrNight)
      .filter(m => m !== "" && m !== " ")
      .join(" ");

    console.log("Time: ", formatTime);

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
