const UserCard = ({ name, email, _id, profilePic, address, about, role }) => {
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
  };

  const chatButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff",
  };

  const bookSlotButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745",
  };
  return (
    <div className="col">
      <div
        className="card h-100 shadow-lg"
        style={{ border: "1px solid #007bff", borderRadius: "10px" }}
      >
        <div className="text-center mt-3">
          <img
            src={profilePic}
            className="rounded-circle"
            alt={`${name}'s profile`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              border: "2px solid #007bff",
            }}
          />
        </div>
        <div
          className="card-body text-center"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <h5 className="card-title text-primary">{name}</h5>
          <p className="card-text mb-1">
            <strong>Email:</strong> {email}
          </p>
          <p className="card-text mb-1">
            <strong>Address:</strong> {address || "N/A"}
          </p>
          <p className="card-text">
            <strong>About:</strong> {about || "No details provided."}
          </p>
          <div className="mt-2">
            <div style={chatButtonStyle}>Chat</div>
            <div style={bookSlotButtonStyle}>Book Slot</div>
          </div>
        </div>

        <div
          className="card-footer text-center"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          {role === "doctor" ? "Doctor Profile" : "User Profile"}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
