import { useEffect, useState } from "react";
import { getMediaByFolder } from "../Blog/eventos";
import "./eventDetail.css";

export default function EventoDetalle({ evento }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState(null);

  useEffect(() => {
    if (!evento) return;

    const loadMedia = async () => {
      setLoading(true);

      try {
        const data = await getMediaByFolder(evento.folder);
        setMedia(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error cargando media del evento:", error);
        setMedia([]);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [evento]);

  useEffect(() => {
    document.body.style.overflow = activeMedia ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeMedia]);

  if (!evento) return null;

  const descriptionParagraphs = evento.description
    ? evento.description.split("\n\n").filter(Boolean)
    : [];

  return (
    <section className="event-detail">
      <div className="event-header">
        <span className="event-kicker">Evento Equilibria</span>

        <h1 className="section-title">
          {evento.title}
        </h1>

        <div className="event-description">
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="gallery-loading">
          <span className="gallery-loader" />
          <p>Cargando galería...</p>
        </div>
      ) : media.length > 0 ? (
        <div className="gallery">
          {media.map((item, index) => {
            const featured = index === 0;

            if (item.type === "image") {
              return (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  className={`gallery-item ${featured ? "featured" : ""}`}
                  onClick={() => setActiveMedia(item)}
                  aria-label={`Abrir imagen del evento ${evento.title}`}
                >
                  <img
                    src={item.src}
                    alt={`${evento.title} - imagen ${index + 1}`}
                    loading={featured ? "eager" : "lazy"}
                  />

                  <span className="gallery-item-label">
                    Ver imagen
                  </span>
                </button>
              );
            }

            if (item.type === "video") {
              return (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  className={`gallery-item gallery-item-video ${featured ? "featured" : ""}`}
                  onClick={() => setActiveMedia(item)}
                  aria-label={`Abrir video del evento ${evento.title}`}
                >
                  <video
                    src={item.src}
                    preload="metadata"
                    muted
                    playsInline
                  />

                  <span className="video-play">
                    ▶
                  </span>

                  <span className="gallery-item-label">
                    Ver video
                  </span>
                </button>
              );
            }

            return null;
          })}
        </div>
      ) : (
        <div className="gallery-empty">
          No hay media disponible para este evento.
        </div>
      )}

      {activeMedia && (
        <div
          className="event-lightbox"
          onClick={() => setActiveMedia(null)}
          role="presentation"
        >
          <button
            type="button"
            className="event-lightbox-close"
            onClick={() => setActiveMedia(null)}
            aria-label="Cerrar vista ampliada"
          >
            ✕
          </button>

          <div
            className="event-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            {activeMedia.type === "image" ? (
              <img
                src={activeMedia.src}
                alt={`Vista ampliada de ${evento.title}`}
              />
            ) : (
              <video
                src={activeMedia.src}
                controls
                autoPlay
                playsInline
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}