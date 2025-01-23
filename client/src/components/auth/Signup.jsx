import { useState, useEffect } from "react";
import SignupImage from "../../assets/signup.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signup, stopLoading } from "../../redux/slices/authslice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("a.m2002nov@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [gender, setGender] = useState("male");
  const [name, setName] = useState("Ashish");

  const dispatch = useDispatch();
  function handleSignup(e) {
    e.preventDefault();
    dispatch(signup({ email, password, gender, name }));
  }

  const { loading, api_result } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (api_result != null && api_result.type == "signup") {
      if (api_result.success == true) {
        toast.success("Account Created");
        navigate("/login");
      } else {
        toast.error(api_result.error);
      }
      // Make sure to clear the api_result in the store after showing alerts
      dispatch(stopLoading(null));
    }
  }, [api_result]);

  return (
    <section className=" d-flex align-items-center" style={{ height: "70vh" }}>
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={SignupImage} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSignup}>
              <h3 className="mb-3  me-3" style={{ fontFamily: "sans-serif" }}>
                Register Yourself Now !
              </h3>

              {/* Email input */}
              <div className="form-outline mb-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  type="text"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter your Name"
                />
              </div>
              <div className="row">
                <div className="form-outline mb-3 col">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    type="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-outline mb-3 col">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                </div>

                <div className="form-outline mb-3 col">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.currentTarget.value)}
                    className="form-select"
                    style={{ height: "48px" }}
                    aria-label="Default select example"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="text-center text-lg-start mt-2 pt-2">
                  <button
                    disabled={loading == true}
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    {loading ? "Please wait.." : "Register"}
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/login" className="link-danger">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
