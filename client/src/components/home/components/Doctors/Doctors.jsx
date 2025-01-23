import React from "react";
import DoctorCard from "./DoctorCard";

export default function Doctors() {
  return (
    <section className="doctors" id="doctors">
      <h1 className="heading">
        our <span>doctors</span>
      </h1>
      <div className="box-container">
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </div>
    </section>
  );
}
