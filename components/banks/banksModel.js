const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
 

const bankschema = new Schema({
  bankId: {
    type: String,
    required: true,
    trim: true,
  },
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  bankCode: {
    type: String,
  },

  accountName: {
    type: String,
  },
  accountNo: {
    type: String,
  },
  swiftCode: {
    type: String,
  },
  bankAddress: {
    type: String,
  },
  routingNo: {
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

const banksModel = mongoose.model("banks", bankschema);

module.exports = banksModel;
