import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ServiceCard from "./ServiceCard";
import "./carousel.css";

export default function CategoryCarousel({ services }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: services.length > 3,   // loop solo si hay suficiente contenido
    align: "start",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="services-carousel-wrapper">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {services.map((s) => (
            <div className="embla__slide" key={s.id}>
              <ServiceCard {...s} />
            </div>
          ))}
        </div>
      </div>

      {/* ← Indicador animado de que hay más contenido */}
      {canPrev && (
        <div className="carousel-edge-hint left"></div>
      )}

      {canNext && (
        <div className="carousel-edge-hint right"></div>
      )}

      {/* Flechas reales de navegación */}
      {services.length > 3 && (
        <>
          <button
            className={`nav-btn nav-btn--prev ${!canPrev ? "disabled" : ""}`}
            onClick={scrollPrev}
            disabled={!canPrev}
          >
            <FaChevronLeft />
          </button>
          <button
            className={`nav-btn nav-btn--next ${!canNext ? "disabled" : ""}`}
            onClick={scrollNext}
            disabled={!canNext}
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
}
