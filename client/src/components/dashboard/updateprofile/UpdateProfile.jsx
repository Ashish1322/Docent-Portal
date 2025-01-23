import React, { useState, useRef, useEffect } from "react";
import "./updateProfile.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePassword,
  updateProfile,
  updateUser,
} from "../../../redux/slices/authslice";
import { stopLoading, startLoading } from "../../../redux/slices/authslice";
import { BASE_URL } from "../../../config";

export default function UpdateProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { user, api_result, loading } = useSelector((store) => store.auth);

  const [phone, setPhone] = useState(user?.phone || "");
  const [about, setAbout] = useState(user?.about || "");
  const [city, setCity] = useState(user?.city || "");
  const [state, setState] = useState(user?.state || "");
  const [zip, setZip] = useState(user?.zip || "");
  const [street, setStreet] = useState(user?.street || "");

  const handlePasswordUpdateSubmit = (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      toast.error("Password didn't match");
    } else {
      dispatch(
        updatePassword({ currentPassword, newPassword, token: user?.token })
      );
    }
  };
  const handleUpdateDetails = (e) => {
    e.preventDefault();
    // Dispatch updateProfile action
    dispatch(
      updateProfile({
        phone,
        about,
        city,
        state,
        zip,
        street,
        token: user.token,
      })
    );
  };

  const updateProfilePic = (file) => {
    const mydata = new FormData();
    mydata.append("profile-photo", file);
    dispatch(startLoading());
    fetch(`${BASE_URL}/auth/upload`, {
      method: "POST",
      body: mydata,
      headers: {
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(stopLoading(null));
        if (data.success == false) {
          toast.error(data.message);
        } else {
          const location = data.location;
          let newUserProfileValue = {
            profilePic: location,
          };
          dispatch(updateUser({ user: newUserProfileValue }));
        }
      })
      .catch((err) => {
        dispatch(stopLoading(null));
        toast.error(err.message);
      });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (
      api_result != null &&
      (api_result.type == "updateProfile" ||
        api_result.type == "updatePassword" ||
        api_result.type == "updateProfilePhoto")
    ) {
      if (api_result.success == true) {
        toast.success("Details Updated");
      } else {
        toast.error(api_result.error);
      }
      // Make sure to clear the api_result in the store after showing alerts
      dispatch(stopLoading(null));
    }
  }, [api_result]);

  console.log(user);

  return (
    <div className="container">
      {loading ? (
        <div class="alert alert-warning" role="alert">
          Please hold on while we are updating your details!
        </div>
      ) : null}

      <div className="row mt-5 gutters">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img
                      onClick={() => inputRef.current.click()}
                      src={user?.profilePic}
                      alt="Maxwell Admin"
                    />
                  </div>
                  <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    onChange={(e) => updateProfilePic(e.currentTarget.files[0])}
                    type="file"
                    accept="image/png, image/jpeg"
                  />
                  <h5 className="user-name">{user?.name}</h5>
                  <h6 className="user-email">{user?.email}</h6>
                </div>
                <div className="about">
                  <h5>About</h5>
                  <p>{user?.about}</p>
                </div>
                <div className="about">
                  <h5>Change Password</h5>
                  <form onSubmit={handlePasswordUpdateSubmit}>
                    <div className="form-group my-2">
                      <input
                        onChange={(e) =>
                          setCurrentPassword(e.currentTarget.value)
                        }
                        required
                        type="password"
                        className="form-control"
                        id="phone"
                        placeholder="Old Password"
                      />
                    </div>
                    <div className="form-group my-2">
                      <input
                        onChange={(e) => setNewPassword(e.currentTarget.value)}
                        required
                        type="password"
                        className="form-control"
                        id="phone"
                        placeholder="New Password"
                      />
                      <div className="form-group my-2">
                        <input
                          onChange={(e) =>
                            setConfirmPassword(e.currentTarget.value)
                          }
                          required
                          type="password"
                          className="form-control"
                          id="phone"
                          placeholder="Confirm New Password"
                        />
                      </div>
                      <button className="btn btn-primary btn-sm">
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <form onSubmit={handleUpdateDetails}>
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 my-3 mcol-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter full name"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 my-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="eMail"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 my-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        onChange={(e) => setPhone(e.currentTarget.value)}
                        required
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                        value={phone}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 my-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="website">About</label>
                      <input
                        onChange={(e) => setAbout(e.currentTarget.value)}
                        required
                        type="text"
                        className="form-control"
                        id="website"
                        placeholder="About You"
                        value={about}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Address</h6>
                  </div>
                  <div className="col-xl-6 my-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="Street">Street</label>
                      <input
                        onChange={(e) => setStreet(e.currentTarget.value)}
                        required
                        type="text"
                        className="form-control"
                        id="Street"
                        placeholder="Enter Street"
                        value={street}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 my-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="ciTy">City</label>
                      <input
                        onChange={(e) => setCity(e.currentTarget.value)}
                        required
                        type="name"
                        className="form-control"
                        id="ciTy"
                        placeholder="Enter City"
                        value={city}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 my-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="sTate">State</label>
                      <input
                        onChange={(e) => setState(e.currentTarget.value)}
                        required
                        type="text"
                        className="form-control"
                        id="sTate"
                        placeholder="Enter State"
                        value={state}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 my-3 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="zIp">Zip Code</label>
                      <input
                        onChange={(e) => setZip(e.currentTarget.value)}
                        required
                        type="text"
                        className="form-control"
                        id="zIp"
                        placeholder="Zip Code"
                        value={zip}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        id="submit"
                        name="submit"
                        disabled={loading}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
