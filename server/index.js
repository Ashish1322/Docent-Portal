import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { sendMessage } from "./controllers/chat.js";

// Import routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";

import {
  isAdmin,
  isDoctor,
  isLoggedIn,
  isPatient,
} from "./middlewares/auth.js";

const PORT = 8000;
const app = express();

// configure env
dotenv.config();

// configure middlewared
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// configure routes
app.get("/", (req, res) =>
  res.json({ success: true, message: "Server is up and running" })
);
app.use("/auth", authRoutes);
app.use("/admin", isLoggedIn, isAdmin, adminRoutes);
app.use("/doctor", isLoggedIn, isDoctor, doctorRoutes);
app.use("/patient", isLoggedIn, isPatient, patientRoutes);

// connect to database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    // start app
    const serverInstance = app.listen(PORT, () =>
      console.log("Server started on PORT ", PORT)
    );

    // Create the socket server
    const io = new Server(serverInstance, {
      cors: {
        origin: ["http://localhost:5173"],
      },
    });

    io.on("connection", (socket) => {
      console.log("Client Connected to socket server", socket.id);

      socket.on("disconnect", () => {
        console.log("client disconnected ", socket.id);
      });

      socket.on("send-message", async (payload) => {
        // once the messae is stored in the db
        let chat = await sendMessage(
          payload.sender,
          payload.receiver,
          payload.message
        );
        console.log(
          "Messaeg Saved in db now emitting for all the clients",
          chat
        );
        // broadcast this message to all the users who are listening for combinedId
        io.emit(chat.combinedId, chat);
        io.emit("new-message-count", { combinedId: chat.combinedId });
      });
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect to databse");
    process.exit();
  });
