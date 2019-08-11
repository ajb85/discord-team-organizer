module.exports = class AdSlot {
  constructor(ad) {
    this.archetype = ad.archetype;
    this.powersets = ad.powersets;
    this.level = ad.level;
    this.role = ad.role;
    this.isAd = true;
  }
};
