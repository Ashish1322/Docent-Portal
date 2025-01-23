import express from "express";
const router = express.Router();

// controllers
import {
  fetchAllPatients,
  openSlot,
  getAllSlots,
  deleteSlot,
} from "../controllers/doctor.js";

router.get("/all-patients", fetchAllPatients);

router.post("/open-slot", openSlot);
router.get("/all-slots", getAllSlots);
router.delete("/delete-slot/:id", deleteSlot);

export default router;
