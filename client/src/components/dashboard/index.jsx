import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "./chats/Chat";
import User from "./user";
import Appointment from "./appointments";
import UpdateProfile from "./updateprofile/UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authslice";

import { fetchAllPersons } from "../../redux/slices/userslice";
export default function Dashboard() {
  const [option, setOption] = useState("users");

  // read the user from store for conditional rendering
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    // Dispatch logout action
    dispatch(logout());
    navigate("/login");
  };

  // Load the initial data after login
  useEffect(() => {
    dispatch(
      fetchAllPersons({ role: user?.role, token: user?.token, query: {} })
    );
  }, []);

  return (
    <div>
      <div className="row">
        <div
          className="col-4 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: 280, height: "92vh", margin: 0, padding: 0 }}
        >
          <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">{user?.role.toUpperCase()} Dashboard</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li onClick={() => setOption("appointments")}>
              <a className="nav-link text-white" aria-current="page" href="#">
                Appointments
              </a>
            </li>
            <li onClick={() => setOption("users")}>
              <a className="nav-link text-white" href="#">
                {user?.role == "patient" ? "Doctors" : "Patients"}
              </a>
            </li>
            <li>
              <a
                onClick={() => setOption("chats")}
                className="nav-link text-white"
                href="#"
              >
                Chats
              </a>
            </li>
            <li onClick={() => setOption("updateprofile")}>
              <a className="nav-link text-white" href="#">
                Profile
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={user?.profilePic}
                alt=""
                width={32}
                height={32}
                className="rounded-circle me-2"
              />
              <strong>{user && user.name}</strong>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <li>
                <a onClick={handleSignout} className="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col" style={{ margin: 0, padding: 0 }}>
          {option == "updateprofile" && <UpdateProfile />}
          {option == "users" && <User />}
          {option == "appointments" && <Appointment />}
          {option == "chats" && <Chat />}
        </div>
      </div>
    </div>
  );
}
