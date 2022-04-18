const express = require("express");
const router = express.Router();

const { topUsers, addUser } = require('../controllers/user');

router.get("/topUsers", topUsers);
router.post("/user/add", addUser);

module.exports = router;
