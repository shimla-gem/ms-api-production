const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExchangeRateLogSchema = new Schema({
  date: {
    type: String,
    required: true,
    trim: true,
  },
  prev: {
    type: String,
    
  },
  latest: {
    type: String,
    
  },
  effectedCounts: {
    type: String,
    
  },
   
  
});

const ExchangeRateLog = mongoose.model("exchangeRateLog", ExchangeRateLogSchema);

module.exports = ExchangeRateLog;
