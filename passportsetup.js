var passport = require('passport');
var secret = require('config/secret');
var User = require('models/user');

module.exports = function(app) {
  app.use(passport.initialize());
  
  var JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('auth_token');
  opts.secretOrKey = secret;
  //opts.issuer = "jwttest.com";
  //opts.audience = "jwttest.com";
  //opts.tokenQueryParameterName = "auth_token";
  //opts.algorithms = ["HS256", "HS384"];
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload._id);
    User.findOne({ _id: jwt_payload._id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        console.log("User not found");
        done(null, false);
        // or you could create a new account
      }
    });
  }));


  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}
