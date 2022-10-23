const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripschema = new Schema({
  tripId: {
    type: String,
    required: true,
    trim: true,
  },
  tripName: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: String,
   
  },

  endDate: {
    type: String,
  },
  fromCountry: {
    type: String,
  },
  

  toCountry: {
    type: String,
  },
  expense: {
    type: String,
  },

  cities: {
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

const tripModel = mongoose.model("trip", tripschema);

module.exports = tripModel;
