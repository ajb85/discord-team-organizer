// Allow absolute paths
require('app-module-path').addPath(__dirname);
// Enable Automated error handling middleware
require('express-async-errors');
require('dotenv').config();

const server = require('./Express/server.js');
const client = require('./Discord/client.js');

client.login(process.env.TOKEN);

server.listen((port = process.env.PORT || 5000), () => {
  console.log(`\n Listening on port ${port}\n`);
});
