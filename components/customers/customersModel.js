const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerschema = new Schema({
  customerId: {
    type: String,
    required: true,
    trim: true,
  },
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
  businessName: {
    type: String,
  },
  businessAddress: {
    type: String,
  },
  businessEmail: {
    type: String,
  },
  businessEmail2: {
    type: String,
  },
  businessContact: {
    type: String,
  },
  businessContact2: {
    type: String,
  },
  businessCountry: {
    type: String,
  },
  businessCity: {
    type: String,
  },
  faxNumber: {
    type: String,
 
  },
  businessVatNumber: {
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

const customersModel = mongoose.model("customers", customerschema);

module.exports = customersModel;
