const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    name: String,
    email: String,
    price: String,
    category: String,
    userId : String,
    productUrl :String,
    comapany : String
})

const Cart = mongoose.model('addToCart', cartSchema);

module.exports = Cart;