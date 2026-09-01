import { useEffect, useMemo, useRef, useState } from "react";

function getGridSpan(grid = "1x1") {
  const [col = "1", row = "1"] = grid.split("x");

  return {
    gridColumn: `span ${Number(col) || 1}`,
    gridRow: `span ${Number(row) || 1}`
  };
}

export default function TechnologyMagazine({ items = [] }) {
  const gridRef = useRef(null);

  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(false);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [items]);

  const updateScrollState = () => {
    const el = gridRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const tolerance = 16;

    setHasLeft(el.scrollLeft > tolerance);
    setHasRight(el.scrollLeft < maxScroll - tolerance);
  };

  const scroll = (direction) => {
  const el = gridRef.current;
  if (!el) return;

  const cards = Array.from(
    el.querySelectorAll(".mag-card")
  );

  if (!cards.length) return;

  const containerRect = el.getBoundingClientRect();

  const containerCenter =
    containerRect.left + containerRect.width / 2;

  const tolerance = 30;

  const cardPositions = cards.map((card) => {
    const rect = card.getBoundingClientRect();

    return {
      card,
      rect,
      center: rect.left + rect.width / 2
    };
  });

  let target = null;

  if (direction > 0) {
    // Primera tarjeta cuyo centro se encuentre
    // claramente a la derecha del centro actual.
    target = cardPositions
      .filter(
        ({ center }) =>
          center > containerCenter + tolerance
      )
      .sort(
        (a, b) =>
          a.center - b.center
      )[0];
  } else {
    // Primera tarjeta hacia la izquierda.
    target = cardPositions
      .filter(
        ({ center }) =>
          center < containerCenter - tolerance
      )
      .sort(
        (a, b) =>
          b.center - a.center
      )[0];
  }

  if (!target) return;

  // Distancia exacta necesaria para colocar
  // el centro de la tarjeta en el centro del viewport.
  const delta =
    target.center - containerCenter;

  el.scrollBy({
    left: delta,
    behavior: "smooth"
  });
};

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [sortedItems.length]);

  if (!sortedItems.length) {
    return (
      <div className="technology-empty">
        No hay tecnologías registradas por el momento.
      </div>
    );
  }

  return (
    <div
      className={`magazine-wrapper ${hasLeft ? "has-left" : ""} ${hasRight ? "has-right" : ""}`}
    >
      <button
        type="button"
        className="mag-side mag-side--left"
        onClick={() => scroll(-1)}
        disabled={!hasLeft}
        aria-label="Ver tecnologías anteriores"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div
        className="magazine-grid"
        ref={gridRef}
        onScroll={updateScrollState}
      >
        {sortedItems.map((item, index) => (
          <article
            key={item.id || item.name || index}
            className="mag-card"
            style={getGridSpan(item.grid)}
          >
            <img
              src={item.img}
              alt={item.name}
              loading="lazy"
            />

            <div className="mag-overlay">
              <span className="mag-chip">Tecnología</span>

              <div className="mag-copy">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="mag-side mag-side--right"
        onClick={() => scroll(1)}
        disabled={!hasRight}
        aria-label="Ver más tecnologías"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}