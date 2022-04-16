let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let promptSchema = new Schema({
  promptId: mongoose.Schema.Types.ObjectId,
  codeBlock: String,
  language: String,
  difficulty: String,
  category: String
});

module.exports = mongoose.model('Prompt', promptSchema);