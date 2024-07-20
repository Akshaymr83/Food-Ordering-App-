


const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  foodname: String,
  image: String,
  category: String,
  description: String,
  price: Number,
  availability: String // Ensure availability is a string
});

const foodModel = mongoose.model('Food', userSchema);

module.exports = foodModel;
