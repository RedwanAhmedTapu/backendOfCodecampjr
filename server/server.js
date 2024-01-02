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

require("dotenv").config();
require("../db/connection");

app.use(
  cors({
    origin: "https://codecampjr.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.post("/user/signup", signup);
app.post("/user/login", login);
app.post("/learner/trial-registration", learner);
app.post("/active-user/registration", activeUser);
app.post("/auth/registration", googleAuthentication);
app.get("/active-user/info/:emailId", activeuserData);
app.post("/active-user/order/:userMail", payment);
// app.post("/verify-email", verifyEmail);
// app.post("/auth/googleAuth-verfication", googleAuthverfication);

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  const imageUrl = `https://codecampjrbackend.onrender.com/uploads/${req.file.filename}`;
  res.json({ imageUrl });
  activeUser.image = imageUrl;
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
