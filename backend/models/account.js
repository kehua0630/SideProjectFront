const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  userName: { type: String, require: true },
  pwd: { type: String, require: true },
  func: { type: Array, require: false },
  inUse: { type: Boolean, require: true },
  createTime: { type: String, require: true },
});


module.exports =  mongoose.model('Account', accountSchema);