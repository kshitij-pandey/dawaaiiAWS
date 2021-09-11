const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
  prescriptionID: {
    type: String,
  },
  path: {
    type: String,
  },
  doctor: {
    type: String,
  },
  hospital: {
    type: String,
  },
  department: {
    type: String,
  },
  uploader: {
    type: String,
  },
  uploadDate: {
    type: String,
  },
  description: {
    type: String,
  },
  prescriptionStatus: {
    type: String,
  },
  medicine: [
    {
      medicineID: {
        type: String,
      },
      productName: {
        type: String,
      },
      medicine: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
