const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderID: {
    type: String,
  },
  userID: {
    type: String,
  },
  productID: {
    type: String,
  },
  storeID: {
    type: String,
  },
  addressID: {
    type: String,
    default:"None"
  },
  status: {
    type: String,
    default:"None",
  },
  reciept: {
    type: String,
    default:"none"
  },
  orderDate: {
    type: Date, 
    default: Date.now
  },
  deliveryTime: {
    type: String,
    default:"None"
  },
});

module.exports = mongoose.model('Order', orderSchema);
