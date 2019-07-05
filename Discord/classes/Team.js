const Teammate = require("./Teammate.js");
const AdSlot = require("./AdSlot.js");

module.exports = class Team {
  constructor(game) {
    this.date = game.date;
    this.time = game.time;
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
    console.log("Date: ", this.date);
    console.log("Time: ", this.time);
    console.log("Level: ", this.level);
    console.log("Activity: ", this.activity);
    console.log("Team: ", this.team);
    console.log("Alignment: ", this.alignment);

    this.date = game.date;
    this.time = game.time;
    this.level = game.level;
    this.activity = game.activity;
    this.team = [new Teammate(game.owner), ...this.emptyTeam()];
    this.alignment = game.alignment;
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
