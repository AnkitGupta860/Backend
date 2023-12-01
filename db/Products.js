const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: String,
    email: String,
    price: String,
    category: String,
    userId : String,
    productUrl :String,
    comapany : String,
    favourite : Boolean
});
const Product = mongoose.model("Products",ProductSchema);
module.exports = Product;