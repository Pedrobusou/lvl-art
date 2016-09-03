const express          = require('express');
const app              = express();
const bodyParser       = require('body-parser');
const multer           = require('multer');
const passport         = require('passport');
const LocalStrategy    = require('passport-local').Strategy;
const cookieParser     = require('cookie-parser');
const session          = require('express-session');
const mongoose         = require('mongoose');
const db               = mongoose.connect('mongodb://localhost/lvlart-db');
const port             = 3000;

const UserSchema       = require('./server/models/UserSchema');
const UserModel        = mongoose.model('UserModel', UserSchema);
const localStrategy    = require('./server/passport/localStrategy');
const facebookStrategy = require('./server/passport/facebookStrategy');

/* ---------------------------------------------------------------------------*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(session({ secret: 'this is the secret', resave: true, saveUninitialized: true }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

/* ------------------------ PETICIONES HTTP / RUTAS ------------------------- */

app.post("/login", passport.authenticate('local'), function(req, res) {
    var user = req.user;
    console.log(user);
    res.json(user);
});

app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.post('/logout', function(req, res) {
    req.logOut();
    res.send(200);
});

app.post('/register', function(req, res)
{
    var newUser = req.body;
    newUser.roles = ['user','admin'];
    UserModel.findOne({username: newUser.username}, function(err, user)
    {
        if(err) return next(err);
        if(user) {
            res.json(null);
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function(err, user) {
            req.login(user, function(err) {
                if(err) return next(err);
                res.json(user);
            });
        });
    });
});

/* ------------------------- AUTENTICACIÓN LOCAL ---------------------------- */

var auth = function(req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

/* ------------------------- AUTENTICACIÓN FACEBOOK ------------------------- */

// Redirect the user to Facebook for authentication. When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval. Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in. Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/#/profile',
                                      failureRedirect: '/#/login' }));

/* ----------------------------- API REST USER ------------------------------ */

app.get("/rest/user", auth, function(req, res) {
    UserModel.find(function(err, users) {
        res.json(users);
    });
});

app.delete("/rest/user/:id", auth, function(req, res) {
    UserModel.findById(req.params.id, function(err, user) {
        user.remove(function(err, count) {
            UserModel.find(function(err, users) {
                res.json(users);
            });
        });
    });
});

app.put("/rest/user/:id", auth, function(req, res) {
    UserModel.findById(req.params.id, function(err, user) {
        user.update(req.body, function(err, count) {
            UserModel.find(function(err, users) {
                res.json(users);
            });
        });
    });
});

app.post("/rest/user", auth, function(req, res) {
    UserModel.findOne({username: req.body.username}, function(err, user) {
        if(user == null) {
            user = new UserModel(req.body);
            user.save(function(err, user) {
                UserModel.find(function(err, users) {
                    res.json(users);
                });
            });
        } else {
            UserModel.find(function(err, users) {
                res.json(users);
            });
        }
    });
});

/* ------------------------------ LISTEN PORT ------------------------------- */

app.listen(port, function() {
  console.log('LVL conectado al puerto ' + port);
});
