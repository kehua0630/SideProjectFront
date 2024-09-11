const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const accountSchema = mongoose.Schema({
  userName: { type: String, require: true, unique:true },
  pwd: { type: String, require: true },
  func: { type: Array, require: false },
  inUse: { type: Boolean, require: true },
  createTime: { type: String, require: true },
});

accountSchema.plugin(uniqueValidator);

module.exports =  mongoose.model('Account', accountSchema);