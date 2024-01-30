/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Definition = require("./models/definition");
const Language = require("./models/language");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// router.get("/ensureLoggedIn", (req, res) => { ensureLoggedIn(req, res)})

router.post("/language", auth.ensureLoggedIn, (req, res) => {
  const newLanguage = new Language({
    name: req.body.content
  });

  newLanguage.save().then((language) => res.send(language));
  User.updateOne({ _id: req.user._id }, { $push: { languages: newLanguage.name } }).then(console.log("updated user"));
});

router.get("/languages", (req, res) => {
  Language.find({}).then((languages) => res.send(languages));
});

router.get("/definitions", (req, res) => {
  if (req.query.word === "") 
    {
    Definition.find({}).then((definitions) => res.send(definitions));
    console.log("no query");
    }
  else {
    console.log("query");
    Definition.find({ 
      word: req.query.word, 
      language: req.query.language, 
      definition_language: req.query.definition_language }).then((definitions) => res.send(definitions));
  }
});

router.post("/definition", auth.ensureLoggedIn, (req, res) => {
  verified = req.user.languages.includes(req.body.definition_language);
  const newDefinition = new Definition({
    creator_id: req.user._id,
    creator_name: req.user.name,
    word: req.body.word,
    definition: req.body.definition,
    is_verified: verified,
    ipa: req.body.ipa,
    language: req.body.language,
    definition_language: req.body.definition_language,
    date: Date.now(),
    word_type: req.body.word_type,
    example: req.body.example,
    ipa: req.body.ipa,
  });

  newDefinition.save().then((definition) => res.send(definition));
}
);

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
