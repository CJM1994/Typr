let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let statisticSchema = new Schema({
  accuracy: Number,
  wordsPerMin: Number,
  timeSpent: Number,
  totalWords: Number,
  createdAt: { type: Date, default: Date.now }
});

let userSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  allTimeScore: Number,
  greatestScore: Number,
  statistics: [statisticSchema]
});

module.exports = mongoose.model('User', userSchema);