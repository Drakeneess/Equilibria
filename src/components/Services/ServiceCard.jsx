import { useState } from "react";

export default function ServiceCard({ id, title, short_desc }) {
  const API_URL = `https://api.equilibria.sbs/api/services.php?image=${id}`;

  const [loaded, setLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded((prev) => !prev);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDescription();
    }
  };

  return (
    <article
      className={`service-card ${expanded ? "is-open" : ""}`}
      onClick={toggleDescription}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      aria-label={`${title}. ${
        expanded ? "Ocultar descripción" : "Ver descripción"
      }`}
    >
      <img
        src={API_URL}
        loading="lazy"
        alt={title}
        className={`service-img ${loaded ? "loaded" : "loading"}`}
        onLoad={() => setLoaded(true)}
      />

      <div className="service-overlay">
        <span className="service-card-tag">
          Servicio
        </span>

        <div className="service-card-copy">
          <div className="service-card-title-row">
            <h3>{title}</h3>

            <span
              className="service-card-toggle"
              aria-hidden="true"
            >
              {expanded ? "−" : "+"}
            </span>
          </div>

          {expanded && short_desc && (
            <p className="service-card-description">
              {short_desc}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}