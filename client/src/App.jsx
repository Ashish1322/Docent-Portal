import { useState } from "react";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";
import { ToastContainer } from "react-toastify";

// Import route protectors
import LoginWrapper from "./components/auth/protectors/LoginProtector";
function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <LoginWrapper>
              <Dashboard />
            </LoginWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
