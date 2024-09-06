const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  userName: { type: String, require: true },
  func: { type: Array, require: false },
  inUse: { type: String, require: true },
});


