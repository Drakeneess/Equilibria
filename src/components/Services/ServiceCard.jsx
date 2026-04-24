import { useState } from "react";

export default function ServiceCard({ id, title, short_desc }) {
  const API_URL = `https://equilibria.sbs/api/services.php?image=${id}`;

  const [loaded, setLoaded] = useState(false);

  return (
    <div className="service-card">
      {/* Imagen Lazy */}
      <img
        src={API_URL}
        loading="lazy"
        alt={title}
        className={`service-img ${loaded ? "loaded" : "loading"}`}
        onLoad={() => setLoaded(true)}
      />

      {/* Overlay */}
      <div className="overlay">
        <h3>{title}</h3>
        <p>{short_desc}</p>
      </div>
    </div>
  );
}
