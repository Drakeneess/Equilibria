import React, { useState } from "react";
import "./aboutUs.css";

const AboutCard = ({ type, title, children }) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => setActive(!active);

  return (
    <div
      className={`about-section ${type} ${active ? "active" : ""}`}
      onClick={toggleActive}
    >
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
