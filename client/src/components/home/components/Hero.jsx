import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../../../assets/image/home-img.svg";
export default function Hero() {
  return (
    <section className="home" id="home">
      <div className="image">
        <img src={HomeImage} />
      </div>
      <div className="content">
        <h3>stay safe, stay healthy</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
          voluptatibus maiores quo nesciunt quod minus!
        </p>
        <Link to="/signup" className="btn">
          Get Started <span className="fas fa-chevron-right" />
        </Link>
      </div>
    </section>
  );
}
