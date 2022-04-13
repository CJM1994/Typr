const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json([
    { id: 1, name: "Connor" },
    { id: 2, name: "Amy" },
    { id: 3, name: "John" },
    { id: 4, name: "Laurie" },
  ]);
});

module.exports = router;
