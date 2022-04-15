let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let statisticSchema = new Schema({
  statisticId: mongoose.Schema.Types.ObjectId,
  score: Number,
  accuracy: Number,
  WordsPerMin: Number,
  timeSpent: Number,
  totalWords: Number,
  userId: {
    ref: 'User'
  }
});

module.exports = mongoose.model('Statistic', statisticSchema);