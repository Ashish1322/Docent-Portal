import User from "../models/User.js";

const fetchAllDoctors = async (req, res) => {
  const { name, department } = req.query;
  let filter = {
    role: "doctor",
    emailVerified: true,
    profileVerified: true,
  };
  if (department && department.length > 0 && department != "all") {
    filter["deparmentId"] = department;
  }
  let doctors = [];
  if (name && name.length > 0) {
    doctors = await User.find({
      ...filter,
      $text: { $search: name },
    });
  } else {
    doctors = await User.find(filter)
      .select("name email profilePic about address deparmentId")
      .populate("deparmentId");
  }
  return res.status(200).json({ success: true, doctors });
};

const fetchAllDepartments = async (req, res) => {};

const getSlotsOfaDoctor = async (req, res) => {};

const bookSlot = async (req, res) => {};

const getAllAppointments = async (req, res) => {};

export {
  fetchAllDoctors,
  fetchAllDepartments,
  getSlotsOfaDoctor,
  bookSlot,
  getAllAppointments,
};
