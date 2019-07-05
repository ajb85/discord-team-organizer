module.exports = class Teammate {
  constructor(member) {
    this.id = member.id;
    this.avatar = member.avatar;
    this.name = member.name;
    this.archetype = member.archetype;
    this.level = member.level;
    this.powersets = member.powersets;
    this.isTeammate = true;
  }
};
