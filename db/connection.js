const mongoose = require("mongoose");

const URL = process.env.MONGODBURL;
// console.log(URL)

mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });
