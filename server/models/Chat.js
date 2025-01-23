import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "HMSUsers_Aug",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "HMSUsers_Aug",
    },
    combinedId: {
      type: String,
      required: true,
    },
    file: {
      type: Boolean,
      default: false,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("HMSChats_Aug", ChatSchema);
