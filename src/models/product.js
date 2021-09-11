const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productID: {
    type: String,
  },
  productName: {
    type: String,
  },
  productCategory: {
    type: String,
  },
  quantity:{
   type:Number,
   default:1
  },
 stores:[{ productPrice: {
    type: Number,
  },
  productDiscount: {
    type: Number,
  },
  storeID: {
    type: String,
  }}],
});

module.exports = mongoose.model('Product', productSchema);