const mongoose = require("mongoose");


const studentInfoSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    unique:true
  },
  isVerified: { type: Boolean, default: false },

});

const verificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, expires: 900, default: Date.now }, // Code expires in 15 minutes
});

const Verification = mongoose.model("Verification", verificationSchema);
const User = mongoose.model("User", studentInfoSchema);

module.exports = {User,Verification};
