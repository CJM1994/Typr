/*
  USER POST/GET routes. (To be updated with AUTH0 integration)
  firstName: String,
  lastName: String,
  email: String
*/
const userSchema = require('../models/user');

const topUsers = async (req, res) => {
  await userSchema.find({}).sort({ allTimeScore: -1 }).limit(10)
    .then((prompt) => {
      res.status(200).json(prompt);
    })
    .catch((error) => {
      res.status(400).send(`Bad request. ${error}`);
    });
};

const addUser = async (req, res) => {
  await userSchema.insertMany(req.body)
    .then((prompts) => {
      res.status(200).json(prompts);
    })
    .catch((error) => {
      res.status(400).send(`Not Saved there was an error. ${error}`);
    });
};

module.exports = { topUsers, addUser };




