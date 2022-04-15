const express = require("express");
const router = express.Router();

const { addPrompt, getPrompt } = require('../controllers/prompt');

router.post("/add", addPrompt );
router.get("/index", getPrompt );


module.exports = router;