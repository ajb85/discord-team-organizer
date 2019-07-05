const router = require("express").Router();

router.get("/", (_, res) => {
  res.send("ok");
});

module.exports = router;
