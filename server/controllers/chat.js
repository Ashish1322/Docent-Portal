import Chat from "../models/Chat.js";
import mongoose from "mongoose";
// It is not a controler this funciton will be called by socket
const sendMessage = async (senderId, receiverId, message, isFile = false) => {
  let combinedId = "";
  if (senderId > receiverId) {
    combinedId = senderId + receiverId;
  } else {
    combinedId = receiverId + senderId;
  }

  let newChat = new Chat({
    sender: senderId,
    receiver: receiverId,
    message: message,
    combinedId: combinedId,
    file: isFile,
  });

  await (await newChat.save()).populate("sender receiver");

  return newChat;
};

// controller to fetch All messages
const fetchAllMessages = async (req, res) => {
  const { receiverId } = req.query;
  const senderId = req.user._id;
  let combinedId = "";
  if (senderId > receiverId) {
    combinedId = senderId + receiverId;
  } else {
    combinedId = receiverId + senderId;
  }

  let messages = await Chat.find({ combinedId: combinedId }).populate(
    "sender receiver"
  );
  // Make all these messages read true
  await Chat.updateMany(
    { combinedId: combinedId, read: false },
    { read: true }
  );
  return res.status(200).json({ success: true, messages });
};

// controller to fetfch unread counts
const fetchUnreadMessagesCount = async (req, res) => {
  const userId = req.user._id;
  try {
    const unreadCounts = await Chat.aggregate([
      {
        $match: { receiver: new mongoose.Types.ObjectId(userId), read: false },
      },
      { $group: { _id: "$combinedId", count: { $sum: 1 } } },
    ]);
    res.status(200).json({ success: true, unreadCounts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { sendMessage, fetchAllMessages, fetchUnreadMessagesCount };
