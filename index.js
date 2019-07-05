require("dotenv").config();

const server = require("./Express/server.js");
const client = require("./Discord/client.js");

client.login(process.env.token);

server.listen((port = process.env.PORT || 5000), () => {
  console.log(`\n Listening on port ${port}\n`);
});
