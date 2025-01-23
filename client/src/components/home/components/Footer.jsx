import React from "react";

export default function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>quick links</h3>
          <a href="#home">
            <i className="fas fa-chevron-right">home</i>
          </a>
          <a href="#services">
            <i className="fas fa-chevron-right">services</i>
          </a>
          <a href="#about">
            <i className="fas fa-chevron-right">about</i>
          </a>
          <a href="#doctors">
            <i className="fas fa-chevron-right">doctors</i>
          </a>
          <a href="#review">
            <i className="fas fa-chevron-right">review</i>
          </a>
        </div>

        <div className="box">
          <h3>contact info</h3>
          <a href="#">
            <i className="fas fa-phone"> +2-01288-95-4142</i>
          </a>
          <a href="#">
            <i className="fas fa-envelope"> support@ittlanethub.in</i>
          </a>
          <a href="#">
            <i className="fas fa-map-marker-alt"> UK, London</i>
          </a>
        </div>
      </div>
      <div className="credit">
        created © by <span>IT Talent Hub</span>| all right reserved
      </div>
    </section>
  );
}
