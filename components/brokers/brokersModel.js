const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brokerschema = new Schema({
  brokerId: {
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

  mobile: {
    type: String,
  },

  email: {
    type: String,
  },

  status: {
    type: String,
    default:'Active'
  },
  reg_date: {
    type: Date,
    default: Date.now(),
  },
});

const brokersModel = mongoose.model("brokers", brokerschema);

module.exports = brokersModel;
