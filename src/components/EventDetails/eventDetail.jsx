import { useEffect, useState } from "react";
import { getImagesByFolder } from "../Blog/eventos";
import "./eventDetail.css";

export default function EventoDetalle({ evento }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!evento) return;

    const loadImages = async () => {
      setLoading(true);

      const imgs = await getImagesByFolder(evento.folder);

      setImages(imgs);
      setLoading(false);
    };

    loadImages();
  }, [evento]);

  if (!evento) return null;

  return (
    <section className="event-detail">
      <h1 className="section-title">{evento.title}</h1>
      <div className="event-description">
        {evento.description.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {loading ? (
        <div className="gallery-loading">Cargando imágenes...</div>
      ) : (
        <div className="gallery">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${evento.slug}-${i}`}
              loading="lazy"
            />
          ))}
        </div>
      )}
    </section>
  );
}