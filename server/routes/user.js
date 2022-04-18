const express = require("express");
const router = express.Router();

const { topUsers, addUsers, getUsers, getUser } = require('../controllers/user');

router.get("/topUsers", topUsers); //Leaderboard
router.get("/users", getUsers); //List of all users
router.get("/user/:email", getUser); //Need a specific user (Maybe needs to be changed later)
router.post("/users/add", addUsers); //Add users

module.exports = router;
