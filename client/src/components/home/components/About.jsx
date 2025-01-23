import React from "react";
import AboutImage from "../../../assets/image/about-img.svg";

export default function About() {
  return (
    <section className="about" id="about">
      <h1 className="heading">
        <span>about</span>us
      </h1>
      <div className="row">
        <div className="image">
          <img src={AboutImage} alt="" />
        </div>
        <div className="content">
          <h3>we take care of your healthy life</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            praesentium, aperiam amet dicta sunt id. Itaque, nulla perspiciatis
            quis animi nam, qui libero totam numquam autem ipsa recusandae natus
            quaerat.
          </p>
          <a href="#" className="btn">
            learn more <span className="fas fa-chevron-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
