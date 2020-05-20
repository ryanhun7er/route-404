
var db = require("../models");


// Routes
// =============================================================
module.exports = function (app, passport) {

  // GET route for getting all of the posts of single user, named what id like. connected db variable from destination.js
  // app.get("/api/notes/", function (req, res) {
  //   var query = {}
  //   if (req.query.user_id) {
  //     query.userid = req.query.user_id
  //   }
  //   db.Notes.findAll({
  //     where: query
  //   })
  //     .then(function (dbNotes) {
  //       res.json(dbNotes);
  //     });
  // });

  // Get route for returning a specifiic posts by id
  app.get("/api/notes/:id", function (req, res) {
    db.Notes.findAll({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbNotes) {
        res.json(dbNotes);
      });
  });
  // route to user table; calling the destinations get route to /users/:id, restrict to a parameter
  // Get route for retrieving a single post
  app.get("/api/notes/:id", function (req, res) {
    db.Notes.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbNotes) {
        res.json(dbNotes);
      });
  });

  // POST route for saving a new post
  app.post("/api/notes", function (req, res) {
    console.log(req.body);
    db.Notes.create({
      title: req.body.title,
      body: req.body.body,

    })
      .then(function (dbNote) {
        res.json(dbNote);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/notes/:id", function (req, res) {
    db.Note.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (dbNote) {
        res.json(dbNote);
      });
  });

  // PUT route for updating posts
  app.put("/api/notes", function (req, res) {
    db.Notes.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbNote) {
        res.json(dbNote);
      });
  });
  app.post("/api/signup", passport.authenticate("local-signup", {
    successRedirect: "/userdest",
    failureRedirect: "/"
  }));

  app.post('/login', passport.authenticate('local-login', { failureRedirect: "/" }),
    function (req, res) {
      console.log(res);
      res.redirect('/userdest')
    }
  )
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};