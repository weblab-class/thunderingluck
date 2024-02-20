const { IPv4 } = require("ipaddr.js");
const mongoose = require("mongoose");

const AccessSchema = new mongoose.Schema({
  date: Date,
  
});

// compile model from schema
module.exports = mongoose.model("access", AccessSchema);
