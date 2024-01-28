const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema({
  name: String,
  definition_languages: [String],
});

// compile model from schema
module.exports = mongoose.model("language", LanguageSchema);
