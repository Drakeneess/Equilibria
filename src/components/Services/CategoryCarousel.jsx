import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import ServiceCard from "./ServiceCard";
import "./carousel.css";

export default function CategoryCarousel({ services }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: services.length > 3,
    align: "start",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps"
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

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="services-carousel-wrapper">
      <button
        type="button"
        className={`carousel-side-control carousel-side-control--prev ${!canPrev ? "disabled" : ""}`}
        onClick={scrollPrev}
        disabled={!canPrev}
        aria-label="Ver servicios anteriores"
      >
        <FaChevronLeft />
      </button>

      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {services.map((service) => (
            <div className="embla__slide" key={service.id}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={`carousel-side-control carousel-side-control--next ${!canNext ? "disabled" : ""}`}
        onClick={scrollNext}
        disabled={!canNext}
        aria-label="Ver más servicios"
      >
        <FaChevronRight />
      </button>

      {canPrev && <div className="carousel-edge-fade carousel-edge-fade--left" />}
      {canNext && <div className="carousel-edge-fade carousel-edge-fade--right" />}
    </div>
  );
}