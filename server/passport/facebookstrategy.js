const configAuth       = require('../config/auth');
const mongoose         = require('mongoose');
const passport         = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const UserSchema       = require('../models/UserSchema');
const UserModel        = mongoose.model('UserModel', UserSchema);

passport.use(new FacebookStrategy({
    clientID     : configAuth.facebookAuth.clientID,
    clientSecret : configAuth.facebookAuth.clientSecret,
    callbackURL  : configAuth.facebookAuth.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        UserModel.findOne({'facebook.id': profile.id}, function(err, user) {
          if (err)
            return done(err);
          if (user)
            return done(null, user);
          else {
            var newUser = new UserModel();
            newUser.facebook.id    = profile.id;
            newUser.facebook.token = accessToken;
            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
            newUser.facebook.email = profile.email;

            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
          }
        });
      });
  }
));
