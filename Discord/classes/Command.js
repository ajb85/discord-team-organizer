module.exports = class Command {
  constructor(validArgs) {
    this.validArgs = validArgs;
  }

  execute(args, cb) {
    const params = {};
    console.log("Executing new Command");
    args.forEach(arg => {
      console.log("ARG: ", arg);
      const index = arg.indexOf(" ");
      console.log("split index: ", index);
      const param = arg.substring(0, index).toLowerCase();

      console.log("Found parameter: ", param);
      if (this.validArgs[param]) {
        console.log("Valid parameter: ", arg.substring(index + 1));
        params[param] = arg.substring(index + 1);
      }
    });
    return cb(params);
  }
};
