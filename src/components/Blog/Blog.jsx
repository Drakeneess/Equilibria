import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCover, eventosOrdenados } from "./eventos";
import "./Blog.css";

export default function Eventos() {
  const [covers, setCovers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadCovers = async () => {
      try {
        const entries = await Promise.all(
          eventosOrdenados.map(async (event) => {
            const img = await getCover(event.folder);
            return [event.slug, img];
          })
        );

        if (mounted) {
          setCovers(Object.fromEntries(entries));
        }
      } catch (error) {
        console.error("Error cargando portadas de eventos:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCovers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="event-section" id="eventos">
      <div className="event-header">
        <span className="event-kicker">Galería viva</span>

        <h2 className="section-title">
          Eventos y experiencias
        </h2>

        <p className="event-intro">
          Momentos, actividades y experiencias que reflejan el enfoque humano de
          Equilibria: acompañamiento, bienestar y movimiento en comunidad.
        </p>
      </div>

      <div className="event-grid">
        {eventosOrdenados.map((event) => (
          <Link
            key={event.slug}
            to={`/eventos/${event.slug}`}
            className="event-card"
            aria-label={`Ver galería de ${event.title}`}
          >
            <div className="event-image">
              {covers[event.slug] ? (
                <img
                  src={covers[event.slug]}
                  alt={event.title}
                  loading="lazy"
                />
              ) : (
                <div className={`event-placeholder ${loading ? "loading" : ""}`}>
                  <span>{event.title}</span>
                </div>
              )}
            </div>

            <div className="event-overlay">
              <div className="event-meta">
                <span className="event-count">
                  {event.imageCount} fotos
                </span>
              </div>

              <div className="event-info">
                <div>
                  <span className="event-label">Experiencia</span>
                  <h3>{event.title}</h3>
                </div>

                <span className="event-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}