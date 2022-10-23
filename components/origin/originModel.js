const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const originchema = new Schema({
  originName: {
    type: String,
    required: true,
    trim: true,
  },
  originDescription: {
    type: String,
    
  },
  
  originStatus: {
    type: String,
    default:"Active"
    
  },
  
});

const originModel = mongoose.model("origins", originchema);

module.exports = originModel;
