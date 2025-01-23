import React from "react";

export default function Services() {
  return (
    <section className="services" id="services">
      <h1 className="heading">
        our <span>services</span>
      </h1>
      <div className="box-container">
        <div className="box">
          <i className="fas fa-notes-medical" />
          <h3>free checkups</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, labore?
          </p>
          <a href="#" className="btn">
            learn more <span className="fas fa-chevron-right" />
          </a>
        </div>

        <div className="box">
          <i className="fas fa-user-md" />
          <h3>expert doctors</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, labore?
          </p>
          <a href="#" className="btn">
            learn more <span className="fas fa-chevron-right" />
          </a>
        </div>

        <div className="box">
          <i className="fas fa-procedures" />
          <h3>bed facility</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, labore?
          </p>
          <a href="#" className="btn">
            learn more <span className="fas fa-chevron-right" />
          </a>
        </div>
        <div className="box">
          <i className="fas fa-heartbeat" />
          <h3>total care</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, labore?
          </p>
          <a href="#" className="btn">
            learn more <span className="fas fa-chevron-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
