/*
  USER POST/GET routes. (To be updated with AUTH0 integration)
  firstName: String,
  lastName: String,
  email: String
*/
const userSchema = require('../models/user');

const topUsers = async (req, res) => {
  await userSchema.find({}).sort({ allTimeScore: -1 }).limit(10)
    .then((topUsers) => {
      res.status(200).json(topUsers);
    })
    .catch((error) => {
      res.status(400).send(`Bad request. ${error}`);
    });
};

const getUsers = async (req, res) => {
  await userSchema.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).send(`Bad request. ${error}`);
    });
};

const getUser = async (req, res) => {
  await userSchema.find({ "email": req.params.email })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(400).send(`Bad request. ${error}`);
    });
};

const addUsers = async (req, res) => {
  await userSchema.insertMany(req.body)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(400).send(`Not Saved there was an error. ${error}`);
    });
};

module.exports = { topUsers, addUsers, getUsers, getUser };




