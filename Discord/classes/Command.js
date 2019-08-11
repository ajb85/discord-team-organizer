module.exports = class Command {
  constructor(validParams) {
    this.validParams = validParams;
  }

  execute(args, cb) {
    const params = {};
    args.forEach(arg => {
      // !statesman command params --> params
      // !statesman & command are chopped off before it gets here

      const index = arg.indexOf(' ');
      const param = arg.substring(0, index).toLowerCase();

      if (this.validParams[param]) {
        params[param] = arg.substring(index + 1);
      }
    });
    return cb(params);
  }
};
