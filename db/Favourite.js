const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
    name: String,
    email: String,
    price: String,
    category: String,
    userId : String,
    productUrl :String,
    comapany : String,
    favourite: Boolean,
    productId: String
})

const Favourite = mongoose.model("Favourite",FavouriteSchema);
module.exports = Favourite;

