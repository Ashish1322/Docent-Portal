import mongoose from "mongoose";

const SlotsSchema = new mongoose.Schema({
  openedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "HMSUsers_Aug",
    required: true,
  },
  bookedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "HMSUsers_Aug",
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
    default: false,
  },
  roomId: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
});

export default mongoose.model("HMSSlots_Aug", SlotsSchema);
