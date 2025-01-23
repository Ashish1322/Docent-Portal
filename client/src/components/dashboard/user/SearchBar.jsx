import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPersons } from "../../../redux/slices/userslice";
const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    let query = {};
    if (user?.role == "patient") {
      query["name"] = searchText;
      query["department"] = selectedDepartment;
    } else if (user?.role == "doctor") {
      query["name"] = searchText;
    }
    dispatch(
      fetchAllPersons({ role: user?.role, token: user?.token, query: query })
    );
  };

  const departments = [
    {
      id: "1",
      name: "Neurologist",
    },
  ];

  const buttonStyle = {
    display: "inline-block",
    padding: "2px 5px",
    fontSize: "12px",
    textAlign: "center",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px",
    backgroundColor: "#007bff",
  };

  return (
    <div className="container my-3">
      <form onSubmit={handleSubmit}>
        <div className="row align-items-center">
          <div className="col-md-5 mb-3 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchText}
              onChange={(e) => setSearchText(e.currentTarget.value)}
            />
          </div>
          {user?.role == "patient" && (
            <div className="col-md-5">
              <select
                className="form-select"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.currentTarget.value)}
              >
                <option value="all">All departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-md-2">
            <input style={buttonStyle} type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
