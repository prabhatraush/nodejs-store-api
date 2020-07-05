const mongoose = require("mongoose");

const orderSchema =  new mongoose.Schema({
    orderId: Number,
    userId: Number,
    subtotal: Number,
    date: String
})
const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders