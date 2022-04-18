let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

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
    unique: true,
  },
  allTimeScore: Number,
  greatestScore: Number,
  statistic: [
     {
      accuracy: Number,
      WordsPerMin: Number,
      timeSpent: Number,
      totalWords: Number,
      created_at: Date
     }
  ]
});

module.exports = mongoose.model('User', userSchema);