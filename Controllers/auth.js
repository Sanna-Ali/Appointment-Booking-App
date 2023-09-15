const mongoose = require("mongoose");
const { User } = require("../models/UserSchema");
const { Doctor } = require("../models/DoctorSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY
  );
};
module.exports.register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;
    if (role === "patient") user = await User.findOne({ email });
    else if (role === "doctor");
    user = await Doctor.findOne({ email });
    user = await User.findOne({ email: req.body.email });
    // check if user exit
    if (user) {
      console.log(user);
      return res.status(400).json({ message: "user already exist" });
    }
    // hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    if (role === "patient") {
      user = new User({
        email,
        password: hashpassword,
        name,
        role,
        photo,
        gender,
      });
    }
    console.log("jhg");
    if (role === "doctor") {
      user = new Doctor({
        email,
        password: hashpassword,
        name,
        role,
        photo,
        gender,
      });
    }
    console.log("kkkkkkkkkkkkkk");
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "user successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error,Try again" });
    console.log(error);
  }
};
module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });
    if (patient) {
      user = patient;
    }
    if (doctor) {
      user = doctor;
    }
    //
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    //compare password
    const isPasswordmatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordmatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    // get token
    const token = generateToken(user);
    const { password, role, appointments, ...rest } = user._doc;
    res
      .status(200)
      .json({ message: "successfully login", token, data: { ...rest }, role });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "failed to login" });
  }
};

// const mongoose = require("mongoose");
// const { User } = require("../models/UserSchema");
// const { Doctor } = require("../models/DoctorSchema");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// module.exports.register = async (req, res) => {
//   const { email, password, name, role, photo, gender } = req.body;

//   try {
//     let user;

//     if (role === "patient") {
//       user = await User.findOne({ email });
//     } else if (role === "doctor") {
//       user = await Doctor.findOne({ email });
//     }

//     if (user) {
//       console.log(user);
//       return res.status(400).json({ message: "user already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashpassword = await bcrypt.hash(password, salt);

//     if (role === "patient") {
//       user = new User({
//         email: email,
//         hashpassword: hashpassword,
//         name: name,
//         role: role,
//         photo: photo,
//         gender: gender,
//       });
//     } else if (role === "doctor") {
//       user = new Doctor({
//         email: email,
//         hashpassword: hashpassword,
//         name: name,
//         role: role,
//         photo: photo,
//         gender: gender,
//       });
//     }

//     await user.save();

//     res
//       .status(200)
//       .json({ success: true, message: "user successfully created" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, message: "Internal server error, Try again" });
//   }
// };

// module.exports.login = async (req, res) => {
//   try {
//     // Place your login code here
//   } catch (error) {
//     // Handle error
//   }
// };
