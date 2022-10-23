const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PreciousSchema = new Schema({
  titlesName: {
    type: String,
    required: true,
    trim: true,
  },
  titlesCategory:{
    type: String,
    required: true,
  },
  titlesDescription: {
    type: String,
    
  },titlesStatus: {
    type: String,
    default:"Active"
    
  },
  
});

const PreciousModel = mongoose.model("titles", PreciousSchema);

module.exports = PreciousModel;
