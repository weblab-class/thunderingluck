const mongoose = require("mongoose");

const DefinitionSchema = new mongoose.Schema({
  name: String,
  googleid: String,
});

// compile model from schema
module.exports = mongoose.model("definition", DefinitionSchema);
