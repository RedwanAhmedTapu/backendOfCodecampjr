const { User } = require("../models/register.model");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const randomstring = require("randomstring");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   auth: {
//     user: "redwantapu1234@gmail.com",
//     pass: "lecriteqlwcutrgq",
//   },
// });

const registration = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashpassword = await bcrypt.hash(password, 10);

    // Create and save a new user
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashpassword,
    });
    await newUser.save();
    res.status(400).json({ message: "user registered successfully" });

    // // Generate verification code
    // const verificationCode = randomstring.generate(6);

    // // Save the verification code
    // const newVerification = new Verification({
    //   email,
    //   code: verificationCode,
    // });
    // await newVerification.save();

    // // Send verification email
    // const mailOptions = {
    //   from: "redwantapu1234@gmail.com",
    //   to: email,
    //   subject: "Email Verification Code",
    //   text: `Verification code is: ${verificationCode}`,
    // };
    // await transporter.sendMail(mailOptions);

    // res.status(200).json({ message: "Successfully registered. Verification email sent." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registration;
