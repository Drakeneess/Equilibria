import { useState } from "react";

export default function ServiceCard({ id, title, short_desc }) {
  const API_URL = `https://api.equilibria.sbs/api/services.php?image=${id}`;
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="service-card">
      <img
        src={API_URL}
        loading="lazy"
        alt={title}
        className={`service-img ${loaded ? "loaded" : "loading"}`}
        onLoad={() => setLoaded(true)}
      />

      <div className="service-overlay">
        <span className="service-card-tag">Servicio</span>

        <div>
          <h3>{title}</h3>
          <p>{short_desc}</p>
        </div>
      </div>
    </article>
  );
}