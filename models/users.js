const mongoose = require("mongoose");

const userSchema =  new mongoose.Schema({
  userId: Number,
  name: String,
  noOfOrders: Number
})

const Users = mongoose.model('Users', userSchema);
module.exports = Users