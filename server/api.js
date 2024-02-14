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

router.get("/existsLanguage", (req, res) => {
  Language.exists({ name: req.query.content }).then((exists) => {
    if (exists) {
      resolve(true);
    }
    else{
      resolve(false);
    }
    res.send(exists);
  });
});

router.get("/defnLanguages", (req, res) => {
  console.log("got it")
  Language.find({name: req.query.content}).then((language) => res.send(language));
});

router.get("/userlanguages"), (req, res) => {
  User.find({ _id: req.query.userid }).then((user) => res.send(user.languages));
};

router.get("/definitions", (req, res) => {
  word = req.query.word;
  language = req.query.language;
  definition_language = req.query.definition_language;
  console.log(definition_language)
  if (req.query.word === "") {word = { $exists: true };}
  if (req.query.language === "") {language = { $exists: true };}
  if (req.query.definition_language === "" || req.query.definition_language === "null" ) {definition_language = { $exists: true };}
   {
    console.log(word, language, definition_language,);
    Definition.find({ 
      word: word, 
      language: language, 
      definition_language: definition_language }).then((definitions) => res.send(definitions));
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
  Language.findOne({ name: req.body.language }).then((language) => {
    if (!language.definition_languages.includes(req.body.definition_language)) {
      Language.updateOne({ name: req.body.language }, { $push: { definition_languages: req.body.definition_language } }).then(console.log("updated language"));
    }
  // Language.updateOne({ name: req.body.language }, { $push: { definition_languages: req.body.definition_language } }).then(console.log("updated language"));
  newDefinition.save().then((definition) => res.send(definition));
});
}
);

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
