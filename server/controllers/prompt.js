/*
  Code snippet POST/GET routes.
  codeBlock: String
  Language: String
  Category: String
*/
const promptSchema = require('../models/prompt');

exports.addPrompt = async (req, res) => {
  await promptSchema.insertMany(req.body)
    .then((prompts) => {
      res.status(200).json(prompts);
    })
    .catch((error) => {
      res.status(400).send(`Not Saved there was an error. ${error}`);
    });
};

exports.getPrompt = async (req, res) => {
  await promptSchema.find({ "language": req.params.language })
  .then((prompt) => {
    res.status(200).json(prompt)})
  .catch((error) => {
    res.status(400).send(`Bad request. ${error}`)
  });
};