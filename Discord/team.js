class Teammate {
  constructor(member) {
    this.name = member.name;
    this.archetype = member.archetype;
    this.level = member.level;
    this.powersets = member.powersets;
    this.isTeammate = true;
  }
}

class AdSlot {
  constructor(ad) {
    this.archetype = ad.archetype;
    this.powersets = ad.powersets;
    this.level = ad.level;
    this.role = ad.role;
    this.applicants = [];
    this.isAd = true;
  }
}

class Team {
  constructor(game) {
    this.date = game.date;
    this.time = game.time;
    this.level = game.level;
    this.title = game.title;
    this.team = [
      new Teammate(game.owner),
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ];
    this.alignment = game.alignment;
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
      this.team[slot - 1].applicants.push(member);
    }
  }
}
