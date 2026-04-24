import { useEffect, useState, useRef } from "react";
import "./PromoBanner.css";

export default function PromoBanner() {

  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [load, setLoad] = useState(false);

  const sectionRef = useRef(null);

  const API_URL = "https://api.equilibria.sbs/api/promos.php";

  /* =========================
     Lazy load cuando aparece
     ========================= */

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

  }, []);

  /* =========================
     Fetch promos
     ========================= */

  useEffect(() => {

    if (!load) return;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const imgs = data.map((p) => p.image);
        setImages(imgs);
      })
      .catch((err) => console.error("Error al cargar promos:", err));

  }, [load]);

  /* =========================
     Rotación del banner
     ========================= */

  useEffect(() => {

    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);

  }, [images]);

  /* =========================
     Preload siguiente imagen
     ========================= */

  useEffect(() => {

    if (images.length < 2) return;

    const next = (current + 1) % images.length;
    const img = new Image();
    img.src = images[next];

  }, [current, images]);

  if (!load) {
    return <section ref={sectionRef} style={{height:"400px"}} />;
  }

  if (images.length === 0) return null;

  return (
    <section className="promo-single" ref={sectionRef}>

      <h2 className="section-title">
        <span className="title-inner" data-icon="🎁">
          Nuestras Promociones
        </span>
      </h2>

      <img
        key={current}
        src={images[current]}
        alt={`Promoción ${current + 1}`}
        className="fade-img"
        loading="lazy"
        decoding="async"
      />

    </section>
  );
}