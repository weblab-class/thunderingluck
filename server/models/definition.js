const mongoose = require("mongoose");

const DefinitionSchema = new mongoose.Schema({
  id: String, 
  creator_id: String,
  creator_name: String, 
  word: String,
  definition: String,
  is_verified: Boolean,
  language: String,
  definition_language: String,
  date: Date,
  word_type: String,
  example: String,
  ipa: String,
  
});

// compile model from schema
module.exports = mongoose.model("definition", DefinitionSchema);
