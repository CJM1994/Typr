let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let promptSchema = new Schema({
  promptId: mongoose.Schema.Types.ObjectId,
  codeBlock: {
    type: String,
    required: true
  },
  language:  {
    type: String,
    required: true
  },
  category:  {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Prompt', promptSchema);