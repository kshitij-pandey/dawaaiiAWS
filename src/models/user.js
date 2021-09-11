const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userID: {
    type: String,
  },
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  userAddress: [
    {
      addressId: {
        type: String,
      },
      userCity: {
        type: String,
      },
      userPlace: {
        type: String,
      },
    },
  ],
  subscription: [
    {
      subscriptionId: {
        type: String,
      },
      productID: {
        type: String,
      },
      dosesData: {
        type: String,
      },
    },
  ],
  orders: [
    {
      orderId: {
        type: String,
      },
    },
  ],
  userPassword: {
    type: String,
  },
  code: {
    type: String,
  },
  codeGenTime: {
    type: String,
  },
  orderID: {
    type: String,
  },
  prescriptionID: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
