
const { User, Verification } = require("../models/register.model");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");



const googleAuthentication = async (req, res) => {
  console.log(req.body);
  try {
    const { fname, lname, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);
    const userData = await User.findOne({ email: email })
      .exec()
      .then((user) => {
        if (user) {
          res.send({message:"user already exist"});
        } else {
          const newUser = new User({
            fname,
            lname,
            email,
            password: hashpassword,
          });
          newUser.save();

          const verificationCode = randomstring.generate(6);
          console.log(verificationCode);
          const newVerification = new Verification({
            email,
            code: verificationCode,
          });
          newVerification.save();

        

          res.send({message:`${verificationCode}`});
        }
      })
      .catch((err) => {
        res.status(404).send("err");
      });
  } catch (error) {
    res.status(404).send("error");
  }
};
module.exports = googleAuthentication;
