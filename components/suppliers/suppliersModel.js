const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const supplierschema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
   
  },

  homeAddress: {
    type: String,
  },
  businessAddress: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyContact: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },

  mobile: {
    type: String,
  },

  email: {
    type: String,
  },

  status: {
    type: String,
  },
  reg_date: {
    type: Date,
    default: Date.now(),
  },
});

const suppliersModel = mongoose.model("suppliers", supplierschema);

module.exports = suppliersModel;
