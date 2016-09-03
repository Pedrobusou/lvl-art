/*const UserSchema    = require('../models/UserSchema');
const UserModel     = mongoose.model('UserModel', UserSchema);

const UserController = {

  app.get("/rest/user", auth, function(req, res)
  {
      UserModel.find(function(err, users)
      {
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
      UserModel.findById(req.params.id, function(err, user){
          user.update(req.body, function(err, count){
              UserModel.find(function(err, users){
                  res.json(users);
              });
          });
      });
  });

  app.post("/rest/user", auth, function(req, res) {
      UserModel.findOne({username: req.body.username}, function(err, user) {
          if(user == null)
          {
              user = new UserModel(req.body);
              user.save(function(err, user) {
                  UserModel.find(function(err, users) {
                      res.json(users);
                  });
              });
          }
          else
          {
              UserModel.find(function(err, users) {
                  res.json(users);
              });
          }
      });
  });
}

module.exports = UserController;*/
