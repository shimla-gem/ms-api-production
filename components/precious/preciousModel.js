const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreciousSchema = new Schema({
  preciousName: {
    type: String,
    required: true,
    trim: true,
  },
  preciousDescription: {
    type: String,
    
  },preciousStatus: {
    type: String,
    default:"Active"
    
  },
  
});

const PreciousModel = mongoose.model("precious", PreciousSchema);

module.exports = PreciousModel;
