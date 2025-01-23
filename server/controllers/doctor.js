import User from "../models/User.js";

const fetchAllPatients = async (req, res) => {
  try {
    const { name } = req.query;
    let patients = [];
    if (name && name.length > 0) {
      patients = await User.find({
        role: "patient",
        emailVerified: true,
        profileVerified: true,
        $text: { $search: name },
      }).select("name email profilePic about address");
    } else {
      patients = await User.find({
        role: "patient",
        emailVerified: true,
        profileVerified: true,
      }).select("name email profilePic about address");
    }
    return res.status(200).json({ success: true, patients });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
const openSlot = async (req, res) => {};

const getAllSlots = async (req, res) => {};

const deleteSlot = async (req, res) => {};

export { fetchAllPatients, openSlot, getAllSlots, deleteSlot };
