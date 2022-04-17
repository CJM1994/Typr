const promptSchema = require('../models/prompt')
const addPrompt = (req, res) => {
  promptSchema.insertMany(req.body)
  .then((prompts)=> {
    res.status(200).json(prompts);
  })
  .catch((error) => {
    res.status(400).send(`Not Saved there was an error. ${error}`);
  })
};


const getPrompt = async (req, res) => {
  const getPrompt = await promptSchema.find({ "language": req.params.language })
  res.status(200).send(getPrompt);
}

module.exports = { addPrompt, getPrompt };