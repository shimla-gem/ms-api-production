const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SemiPreciousSchema = new Schema({
  semiPreciousName: {
    type: String,
    required: true,
    trim: true,
  },
  semiPreciousDescription: {
    type: String,
    
  },
  semiPreciousStatus: {
    type: String,
    
  },
  precious: {
    type: String,
    
  }
  
});

const SemiPreciousModel = mongoose.model("semiPrecious", SemiPreciousSchema);

module.exports = SemiPreciousModel;
