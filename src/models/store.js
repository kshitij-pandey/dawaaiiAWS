const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
  storeID: {
    type: String,
  },
  storeName: {
    type: String,
  },
  cluster: {
    type: String,
  },
  city: {
    type: String,
  },
  lat:{
    type: String,
  },
  long:{
    type: String,
  }
});

module.exports = mongoose.model('Store', storeSchema);
