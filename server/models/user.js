let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let statisticSchema = new Schema({
  accuracy: Number,
  wordsPerMin: Number,
  timeSpent: Number,
  totalChars: Number,
  createdAt: { type: Date, default: Date.now }
});

let userSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  allTimeScore: {
    type: Number,
    default: 0,
    require: true
  },
  greatestScore: Number,
  statistics: [statisticSchema]
});

module.exports = mongoose.model('User', userSchema);