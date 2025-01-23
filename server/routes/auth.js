import express from "express";
const router = express.Router();

// controllers
import {
  signup,
  login,
  changePassword,
  updateDetails,
  uploadImage,
} from "../controllers/auth.js";
import {
  fetchAllMessages,
  fetchUnreadMessagesCount,
} from "../controllers/chat.js";
// middlewares
import upload from "../middlewares/multer_config.js";
import { isLoggedIn } from "../middlewares/auth.js";

// TODO : Try to implement express validator, add validation chains on the routes and create one middleware to validate the chain, take ref from Todo app

router.post("/signup", signup);

router.post("/login", login);

router.put("/change-password", isLoggedIn, changePassword);

// TODO : Create route to upload profile image, add multer to upload image to S3 then call your controller to update the s3 img url in db

router.put("/update-profile", isLoggedIn, updateDetails);

router.get("/messages", isLoggedIn, fetchAllMessages);
router.get("/unread-counts", isLoggedIn, fetchUnreadMessagesCount);

// Route to upload Image for profie photo
router.post("/upload", isLoggedIn, upload.single("profile-photo"), uploadImage);

export default router;
