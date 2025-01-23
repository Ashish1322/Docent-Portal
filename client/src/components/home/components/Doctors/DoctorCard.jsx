import React from "react";
import DoctorImage from "../../../../assets/image/doc-2.jpg";
export default function DoctorCard() {
  return (
    <div className="box">
      <img src={DoctorImage} />
      <h3>Nour Ahmed</h3>
      <span> ( Neurologist )</span>
      <br />
      <button className="btn">View Avalability</button>
    </div>
  );
}
