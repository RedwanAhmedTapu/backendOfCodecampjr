const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const signup = require("../route/user");
const login = require("../route/userlogin");
const learner = require("../route/trial.learner");
const activeUser = require("../route/active.user");
const activeuserData = require("../route/active.user.data");
const googleAuthentication = require("../route/googleAuth");
const payment = require("../route/payement-integration");
const verifyEmail = require("../route/email.verification");
const googleAuthverfication = require("../route/googleAuth.verfication");
const triallearnerData=require("../route/trial.learner.data");
const trialLearnerUpdatedData=require("../route/update.trial.learner.data");
const deletetrialLearnerData=require("../route/delete.trial.learner");
const updateTrialLearnerCompletion=require("../route/update-trial-completed");
const updateTrialToActive=require("../route/update-.trial.to.activelearner");
const veryfytoken=require("../middleWear/veryfy.token");

require("dotenv").config();
require("../db/connection");

const origin=process.env.ORIGIN;
const server=process.env.SERVER_URL;
console.log(origin)
console.log(server)
app.use(
  cors({
    origin:origin ,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// app.get("/",(req,res)=>{res.send("tapu")});

app.post("/user/signup", signup);
app.post("/user/login", login);
app.post("/learner/trial-registration", learner);
app.post("/active-user/registration", activeUser);
app.post("/auth/registration", googleAuthentication);
app.get("/active-user/info/:emailId",veryfytoken, activeuserData);
app.post("/active-user/order/:userMail", payment);
app.get("/learner-data",veryfytoken,triallearnerData);
app.put("/update-trial-learner-data",veryfytoken,trialLearnerUpdatedData);
app.put("/update-trial-to-active-learner-data",veryfytoken,updateTrialToActive);
app.delete("/learner-delete/:email",veryfytoken,deletetrialLearnerData);
app.put("/learner-update/:email",veryfytoken,updateTrialLearnerCompletion);

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  const imageUrl = `${server}/uploads/${req.file.filename}`;
  res.json({ imageUrl });
  activeUser.image = imageUrl;
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
