module.exports = class Command {
  constructor(validArgs) {
    this.validArgs = validArgs;
  }

  execute(args, cb) {
    const params = {};

    args.forEach(arg => {
      const index = arg.indexOf(" ");
      const param = arg.substring(0, index);

      if (this.validArgs[param]) {
        params[param] = arg.substring(index + 1);
      }
    });
    return cb(params);
  }
};
