const mongoose = require("mongoose");

const learnerSchema=new mongoose.Schema({
  learnerName:{
    type:String,
    required:true
  },
  age:{
    type:String,
    required:true
  },
  school:{
    type:String,
    required:true
  },
  parentName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  learnerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  profession: {
    type: String,
    required: true,
  },
  // country: {
  //   type: String,
  //   required: true,
  // }

})


const LearnerData= mongoose.model("LearnerInfo",learnerSchema);
module.exports=LearnerData;