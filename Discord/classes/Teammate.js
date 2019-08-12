module.exports = class Teammate {
  constructor(member) {
    this.id = member.id;
    this.avatar = member.avatar;
    this.name = member.name;
    this.description = member.description;
    this.isTeammate = true;
  }
};
