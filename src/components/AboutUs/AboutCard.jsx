import { useState } from "react";
import "./aboutUs.css";

const AboutCard = ({ type, eyebrow, title, children }) => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive((current) => !current);
  };

  return (
    <article className={`about-card about-card--${type} ${active ? "active" : ""}`}>
      <button
        type="button"
        className="about-card-button"
        onClick={toggleActive}
        aria-expanded={active}
      >
        <span className="about-card-glow" aria-hidden="true" />

        <div className="about-card-content">
          <span className="about-card-eyebrow">{eyebrow}</span>

          <h3>{title}</h3>

          <div className="about-card-body">
            {children}
          </div>

          <span className="about-card-hint">
            {active ? "Toca para contraer" : "Toca para explorar"}
          </span>
        </div>
      </button>
    </article>
  );
};

export default AboutCard;