import React, { useState } from "react";
import "./aboutUs.css";

import mask from "../Hollidays/Carnival/mask.png";
import mask1 from "../Hollidays/Carnival/mask1.png";
import mask2 from "../Hollidays/Carnival/mask2.png";

const masksByType = {
  mission: mask,
  vision: mask1,
  values: mask2
};

const AboutCard = ({ type, title, children }) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => setActive(!active);

  return (
    <div
      className={`about-section ${type} ${active ? "active" : ""}`}
      onClick={toggleActive}
    >

      {/* 🎭 Mascara flotante */}
      <img
        src={masksByType[type]}
        alt=""
        className="card-mask"
      />

      <div className="overlay">
        <h3>{title}</h3>

        <div className="card-content">
          {children}
        </div>
      </div>

    </div>
  );
};

export default AboutCard;
