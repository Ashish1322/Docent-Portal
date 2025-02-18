import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Check: Authentication
const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    // inject user if from the token into request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid Token" });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user && user.role == "admin") {
    return next();
  }
  return res
    .status(401)
    .json({ success: false, message: "Only admins have access to this route" });
};

const isDoctor = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user && user.role == "doctor") {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Only Doctors have access to this route",
  });
};

const isPatient = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user && user.role == "patient") {
    return next();
  }
  return res.status(401).json({
    success: false,
    message: "Only Patients have access to this route",
  });
};

export { isLoggedIn, isAdmin, isDoctor, isPatient };
