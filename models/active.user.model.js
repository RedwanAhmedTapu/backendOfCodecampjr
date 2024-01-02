const mongoose = require("mongoose");

const activeStudentSchema = new mongoose.Schema({
  image:{type:String},
  level: {
    type: String,
    required: true,
  },
  group: {
    type: String,
  },
  schedule: {
    days: [String],
    time: String,
  },
  email: {
    type: String,
     unique:true
  },
 
});


const ActiveStudentInfo=mongoose.model("ActiveStudentInfo",activeStudentSchema);

module.exports=ActiveStudentInfo;