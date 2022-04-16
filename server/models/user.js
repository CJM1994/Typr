let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String
});

module.exports = mongoose.model('User', userSchema);