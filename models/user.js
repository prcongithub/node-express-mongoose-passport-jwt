var mongoose = require('db/mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose,{
  usernameField: 'email',
  passwordField: 'password'
});

var User = mongoose.model('User', userSchema);

module.exports = User;
