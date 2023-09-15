const jwt = require("jsonwebtoken");
const { Doctor } = require("../models/DoctorSchema");
const { User } = require("../models/UserSchema");
module.exports.authenticate = async (req, res, next) => {
  //const Token = req.headers.Token;
  const Token = req.headers.authorization;
  console.log(Token); //
  if (!Token) {
    //console.log("III");
    return res.status(401).json({ success: false, message: "no token" });
  }
  try {
    console.log(Token);
    const decoded = jwt.verify(Token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    //console.log(error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "token is expired" });
    }
    return res.status(401).json({ success: false, message: "invalid token" });
  }
};
module.exports.restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  let user;
  const patient = await User.findById(userId);
  const doctor = await User.findById(userId);
  if (patient) {
    user = patient;
  }
  if (doctor) {
    user = doctor;
  }
  if (!roles.includes(user.role)) {
    return res
      .status(401)
      .json({ success: false, message: "you aren't authorized" });
  }
  next();
};
