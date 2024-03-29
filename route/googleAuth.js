const { User, Verification } = require("../models/register.model");
const bcrypt = require("bcrypt");
// const randomstring = require("randomstring");

const googleAuthentication = async (req, res) => {
  console.log(req.body);
  try {
    const { fname, lname, email } = req.body;

    const userData = await User.findOne({ email: email })
      .exec()
      .then(async (user) => {
        if (user) {
          res.send({ message: "user already exist" });
          await User.findOneAndUpdate(
            { email },
            { $set: { isLoggedin: true } }
          );
        } else {
          const newUser = new User({
            fname,
            lname,
            email,
          });
         await newUser.save();
          res.send({ message: "user registered successfully" });


          // const verificationCode = randomstring.generate(6);
          // const newVerification = new Verification({
          //   email,
          //   code: verificationCode,
          // });
          // newVerification.save();
          // await User.findOneAndUpdate(
          //   { email },
          //   { $set: { isLoggedin: true } }
          // );

          // res.status(200).json({ message: `${verificationCode}` });
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
