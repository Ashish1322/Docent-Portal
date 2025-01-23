import React, { useState, useEffect } from "react";
import LoginImage from "../../assets/login.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, stopLoading } from "../../redux/slices/authslice";

export default function Login() {
  const [email, setEmail] = useState("a.m2002nov@gmail.com");
  const [password, setPassword] = useState("12345678");

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  const { loading, api_result, user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (api_result != null && api_result.type == "login") {
      if (api_result.success == true) {
        toast.success("Login Success");
        navigate("/dashboard");
      } else {
        toast.error(api_result.error);
      }
      // Make sure to clear the api_result in the store after showing alerts
      dispatch(stopLoading(null));
    }
  }, [api_result]);

  console.log(user);

  return (
    <section className="d-flex align-items-center" style={{ height: "70vh" }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={LoginImage} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>
              <h3 className="mb-3  me-3" style={{ fontFamily: "sans-serif" }}>
                Login Now !
              </h3>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  value={email}
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter your email address"
                />
                <label className="form-label" htmlFor="form3Example3"></label>
              </div>

              <div className="form-outline mb-3">
                <input
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  value={password}
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
                <label className="form-label" htmlFor="form3Example4"></label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    disabled={loading == true}
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    {loading ? "Please Wait.." : "Login"}
                  </button>

                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>
                <a className="text-body">Forgot password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
