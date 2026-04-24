import { useEffect, useState } from "react";
import { getCover, eventosOrdenados } from "./eventos";
import "./Blog.css";
import { Link } from "react-router-dom";

export default function Eventos() {
  const [covers, setCovers] = useState({});

  useEffect(() => {
    eventosOrdenados.forEach(async (e) => {
      const img = await getCover(e.folder);

      setCovers((prev) => ({
        ...prev,
        [e.slug]: img
      }));
    });
  }, []);

  return (
    <section className="event-section">
      <h2 className="section-title">
        <span className="title-inner" data-icon="📸">
          Eventos y experiencias
        </span>
      </h2>

      <div className="event-grid">
        {eventosOrdenados.map((e) => (
          <Link key={e.slug} to={`/eventos/${e.slug}`} className="event-card">
            <div className="event-image">
              {covers[e.slug] ? (
                <img
                  src={covers[e.slug]}
                  alt={e.title}
                  loading="lazy"
                />
              ) : (
                <div className="event-placeholder" />
              )}
            </div>

            <div className="event-overlay">
              <div className="event-meta">
                <span className="event-count">
                  {e.imageCount} fotos
                </span>
              </div>

              <div className="event-info">
                <h3>{e.title}</h3>
                <span className="event-arrow">↗</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}