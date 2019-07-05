const express = require("express");
const cors = require("cors");

// import routes

const server = express();

server.use(express.json());
server.use(cors());

// setup routes
// server.use("/api/account", accountRouter);
// server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.status(200).json({ serverStatus: "OK" });
});

module.exports = server;
