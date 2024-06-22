// // cart.js
// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add user ID field
//     foodname: String,
//     image: String,
//     category: String,
//     description: String,
//     price: Number,  
//     orderId: String,
//   status: { type: String, default: "Pending" },
//   // foodId:{
//   //   type: mongoose.Schema.Types.ObjectId, ref: 'food'
//   // }
// });

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;
// cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Add user ID field
    foodname: String,
    image: String,
    category: String,
    description: String,
    price: Number,  
    availability:String,
    orderId: String,
  status: { type: String, default: "Pending" },
  foodId:{
    type: mongoose.Schema.Types.ObjectId, ref: 'food'
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;


