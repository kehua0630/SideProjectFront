const mongoose = require("mongoose");


const loginSchema = mongoose.Schema({
  userName: { type: String, require: true },
  pwd: { type: String, require: true },
});



module.exports =  mongoose.model('Login', loginSchema);