const express = require("express");
const router = express.Router();

const { getUser } = require('../controllers/userRoutes');

router.get("/user", getUser );

module.exports = router;
