import express from "express";
const router = express.Router();

// controllers
import {
  fetchAllDoctors,
  fetchAllDepartments,
  getSlotsOfaDoctor,
  bookSlot,
  getAllAppointments,
} from "../controllers/patient.js";

router.get("/all-doctors", fetchAllDoctors);
router.get("/all-departments", fetchAllDepartments);
router.get("/doctor-slots/:doctorId", getSlotsOfaDoctor);
router.put("/book-slot/:slotId", bookSlot);
router.get("/all-slots", getAllAppointments);
export default router;
