const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShapesSchema = new Schema({
  shapesName: {
    type: String,
    required: true,
    trim: true,
  },
  shapesDescription: {
    type: String,
    
  },
  shapesStatus: {
    type: String,
    default:"Active"
    
  },
  
});

const ShapesModel = mongoose.model("shapes", ShapesSchema);

module.exports = ShapesModel;
