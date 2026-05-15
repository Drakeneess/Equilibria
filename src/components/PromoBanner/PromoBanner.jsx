import { useEffect, useRef, useState } from "react";
import "./PromoBanner.css";

const API_URL = "https://api.equilibria.sbs/api/promos.php";

export default function PromoBanner() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px"
      }
    );

    const section = sectionRef.current;

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }

      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!load) return;

    setLoading(true);

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudieron cargar las promociones");
        }

        return res.json();
      })
      .then((data) => {
        const imgs = data
          .map((promo) => promo.image)
          .filter(Boolean);

        setImages(imgs);
      })
      .catch((err) => {
        console.error("Error al cargar promos:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [load]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((index) => (index + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (images.length < 2) return;

    const next = (current + 1) % images.length;
    const img = new Image();

    img.src = images[next];
  }, [current, images]);

  const goTo = (index) => {
    setCurrent(index);
  };

  const goPrev = () => {
    setCurrent((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  };

  const goNext = () => {
    setCurrent((index) => (index + 1) % images.length);
  };

  if (!load) {
    return <section ref={sectionRef} className="promo-placeholder" />;
  }

  if (loading) {
    return (
      <section ref={sectionRef} className="promo-single promo-loading">
        <div className="promo-header">
          <span className="promo-kicker">Beneficios activos</span>

          <h2 className="section-title">
            Nuestras Promociones
          </h2>
        </div>

        <div className="promo-skeleton" />
      </section>
    );
  }

  if (images.length === 0) return null;

  return (
    <section className="promo-single" ref={sectionRef}>
      <div className="promo-header">
        <span className="promo-kicker">Beneficios activos</span>

        <h2 className="section-title">
          Nuestras Promociones
        </h2>

        <p className="promo-intro">
          Revisa nuestras promociones disponibles y encuentra una opción ideal
          para iniciar o continuar tu proceso de bienestar.
        </p>
      </div>

      <div className="promo-frame">
        {images.length > 1 && (
          <button
            type="button"
            className="promo-control promo-control--prev"
            onClick={goPrev}
            aria-label="Ver promoción anterior"
          >
            ‹
          </button>
        )}

        <img
          key={images[current]}
          src={images[current]}
          alt={`Promoción ${current + 1}`}
          className="fade-img"
          loading="lazy"
          decoding="async"
        />

        {images.length > 1 && (
          <button
            type="button"
            className="promo-control promo-control--next"
            onClick={goNext}
            aria-label="Ver siguiente promoción"
          >
            ›
          </button>
        )}

        {images.length > 1 && (
          <div className="promo-dots" aria-label="Selector de promociones">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`promo-dot ${index === current ? "active" : ""}`}
                onClick={() => goTo(index)}
                aria-label={`Ver promoción ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}