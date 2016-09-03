const mongoose      = require('mongoose');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserSchema    = require('../models/UserSchema');
const UserModel     = mongoose.model('UserModel', UserSchema);

// array de admins.
const users =
[
    {username: 'admin', password: '650608635', firstName: 'jonatan', lastName: 'arrocha kang', email: 'erickangweisz@gmail.com', date_of_birthday: '17/07/1987', role: ['admin'], experience: 0, categories: 'ilustrador'}
];

const localStrategy = passport.use(new LocalStrategy(
  function(username, password, done) {
      for(var u in users) {
          if(username == users[u].username && password == users[u].password)
              return done(null, users[u]);
      }
      UserModel.findOne({username: username, password: password}, function(err, user) {
          if (err) return done(err);
          if (!user) return done(null, false);
          return done(null, user);
      })
  }));

  passport.serializeUser(function(user, done) {
      done(null, user);
  });

  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

  module.exports = localStrategy;
