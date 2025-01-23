import React from "react";

export default function Stats() {
  return (
    <section className="icons-container">
      <div className="icons">
        <i className="fas fa-user-md" />
        <h3>140+</h3>
        <p>doctors at work</p>
      </div>
      <div className="icons">
        <i className="fas fa-users" />
        <h3>1040+</h3>
        <p>satisfied patients</p>
      </div>
      <div className="icons">
        <i className="fas fa-procedures" />
        <h3>500+</h3>
        <p>Appointments Last Month</p>
      </div>
    </section>
  );
}
