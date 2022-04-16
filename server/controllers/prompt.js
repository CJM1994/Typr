const promptSchema = require('../models/prompt')
const addPrompt = async (req, res) => {
const { codeBlock, language, difficulty, category } = req.body;
  const newPrompt = new promptSchema({
    codeBlock,
    language,
    difficulty,
    category
  })
  await newPrompt.save();
  res.status(200).send('Added Successfully');
  console.log(newPrompt);
};


const getPrompt = async (req, res) => {
  const getPrompt = await promptSchema.find({ "language": req.params.language })
  res.status(200).send(getPrompt);
}

module.exports = { addPrompt, getPrompt };