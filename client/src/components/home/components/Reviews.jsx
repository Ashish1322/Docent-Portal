import React from "react";

export default function Reviews() {
  return (
    <section className="review" id="review">
      <h1 className="heading">
        Patient's<span>review</span>
      </h1>
      <div className="box-container">
        <div className="box">
          <img src="image/pic-1.png" />
          <h3>Ahmed Gaber</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            quod voluptates consequuntur aliquid exercitationem voluptate omnis
            maxime quia temporibus, dignissimos minima incidunt blanditiis
            deserunt eaque maiores. Dolorum deserunt nisi quis.
          </p>
        </div>
        <div className="box">
          <img src="image/pic-2.png" />
          <h3>Sara salama</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            quod voluptates consequuntur aliquid exercitationem voluptate omnis
            maxime quia temporibus, dignissimos minima incidunt blanditiis
            deserunt eaque maiores. Dolorum deserunt nisi quis.
          </p>
        </div>
        <div className="box">
          <img src="image/pic-3.png" />
          <h3>mohamed samer</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            quod voluptates consequuntur aliquid exercitationem voluptate omnis
            maxime quia temporibus, dignissimos minima incidunt blanditiis
            deserunt eaque maiores. Dolorum deserunt nisi quis.
          </p>
        </div>
      </div>
    </section>
  );
}
