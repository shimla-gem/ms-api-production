const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true,
  },
  userName: {
    type: String,
    required: true,
    trim: true,
    unique:true,

  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "basic",
    enum: ["basic", "supervisor", "admin"],
  },
  accessToken: {
    type: String,
  },
  status: {
    type: String,
    default: "Active"
  },
  registerDate: {
    type: Date,
    default:Date.now()
  },
});

const UsersModel = mongoose.model("users", UserSchema);

module.exports = UsersModel;
