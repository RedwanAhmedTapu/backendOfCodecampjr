const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
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
    // You might want to add additional validation for email format
  },
  password: {
    type: String,
   
    
  },
  isLoggedin:{
    type:Boolean,
    default:false
  }
});

// Define the Verification schema
const verificationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
   
  },
  code: {
    type: String,
    required: true,
  },
});

// Create models for User and Verification
const User = mongoose.model("User", userSchema);
const Verification = mongoose.model("Verification", verificationSchema);

module.exports = {
  User,
  Verification,
};
