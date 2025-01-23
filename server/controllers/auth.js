import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    // check if email already exist
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Aready in use" });
    }

    // hash password
    bcrypt.hash(password, 10, async function (err, hash) {
      // create account
      const newUser = new User({
        email,
        password: hash,
        gender,
        name,
      });
      // TODO : Add email verification during signup, make use of nodemailer to achieve this task
      await newUser.save();

      return res
        .status(200)
        .json({ success: true, message: "Account Created" });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email is correct
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }
    // TODO : Check for email verification if it's not done then resend the verification link and don't allow login

    // compare password
    bcrypt.compare(password, user.password, function (err, result) {
      if (!result || err)
        return res
          .status(400)
          .json({ success: false, message: "Invalid Passwowrd" });
      else {
        // Sign the Token and give it back to user
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const newUserResponse = {
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          phone: user?.phone || "",
          about: user?.about || "",
          street: user?.address?.street || "",
          city: user?.address?.city || "",
          state: user?.address?.state || "",
          zip: user?.address?.zip || "",
          token: token,
          role: user.role,
          _id: user._id,
        };
        return res.status(200).json({ success: true, user: newUserResponse });
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    // 1. I will find your acocunt
    const userId = req.user._id;
    const userAccount = await User.findById(userId);
    if (!userAccount)
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });
    // 2. validate the current Password
    bcrypt.compare(
      currentPassword,
      userAccount.password,
      function (err, result) {
        if (!result)
          return res
            .status(400)
            .json({ success: false, message: "Password is not correct" });
        else {
          // 3. Upate your password
          bcrypt.hash(newPassword, 10, async function (err, hash) {
            // create account
            userAccount.password = hash;
            await userAccount.save();
            return res
              .status(200)
              .json({ success: true, message: "Password Updated" });
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateDetails = async (req, res) => {
  try {
    const { phone, about, street, city, state, zip } = req.body;
    // 1. I will find your acocunt
    const userId = req.user._id;
    const userAccount = await User.findById(userId);
    if (!userAccount)
      return res
        .status(400)
        .json({ success: false, message: "invalid request" });

    // update details
    userAccount.phone = phone;
    userAccount.about = about;
    userAccount.address = {
      state: state,
      street: street,
      city: city,
      zip: zip,
    };
    await userAccount.save();

    const newUserResponse = {
      name: userAccount.name,
      email: userAccount.email,
      profilePic: userAccount.profilePic,
      phone: userAccount?.phone || "",
      about: userAccount?.about || "",
      street: userAccount?.address?.street || "",
      city: userAccount?.address?.city || "",
      state: userAccount?.address?.state || "",
      zip: userAccount?.address?.zip || "",
      role: userAccount?.role,
      _id: userAccount?._id,
    };

    return res.status(200).json({
      success: true,
      message: "Details Updated",
      user: newUserResponse,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const uploadImage = async (req, res) => {
  if (req.file) {
    const { location } = req.file;
    await User.findByIdAndUpdate(req.user._id, {
      profilePic: location,
    });
    res.status(200).json({
      success: true,
      message: "Profile photo updated",
      location: location,
    });
  } else
    res.status(400).json({ success: false, message: "Failed to upload file" });
};

export { signup, login, changePassword, updateDetails, uploadImage };
