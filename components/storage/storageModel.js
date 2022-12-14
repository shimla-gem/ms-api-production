const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
 

const storageSchema = new Schema({
  
  storageBoxId: {
    type: String,
    required: true,
    trim: true,
  },
  storageBoxName: {
    type: String,
    required: true,
    trim: true,
  },
  storageBoxRowSize: {
    type: String,
  },

  storageBoxColumnSize: {
    type: String,
  },
   
    
  status: {
    type: String,
    default:"Active"
  },
  reg_date: {
    type: Date,
    default: Date.now(),
  },
});

const storagesModel = mongoose.model("storages", storageSchema);

module.exports = storagesModel;
