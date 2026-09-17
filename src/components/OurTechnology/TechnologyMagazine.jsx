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

  const [openCard, setOpenCard] = useState(null);

  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) => (a.order ?? 999) - (b.order ?? 999)
    );
  }, [items]);

  const updateScrollState = () => {
    const el = gridRef.current;

    if (!el) return;

    const maxScroll =
      el.scrollWidth - el.clientWidth;

    const tolerance = 16;

    setHasLeft(
      el.scrollLeft > tolerance
    );

    setHasRight(
      el.scrollLeft < maxScroll - tolerance
    );
  };

  const scroll = (direction) => {
    const el = gridRef.current;

    if (!el) return;

    const cards = Array.from(
      el.querySelectorAll(".mag-card")
    );

    if (!cards.length) return;

    const containerRect =
      el.getBoundingClientRect();

    const containerCenter =
      containerRect.left +
      containerRect.width / 2;

    const tolerance = 30;

    const cardPositions = cards.map((card) => {
      const rect =
        card.getBoundingClientRect();

      return {
        card,
        rect,
        center:
          rect.left +
          rect.width / 2
      };
    });

    let target = null;

    if (direction > 0) {
      target = cardPositions
        .filter(
          ({ center }) =>
            center >
            containerCenter + tolerance
        )
        .sort(
          (a, b) =>
            a.center - b.center
        )[0];
    } else {
      target = cardPositions
        .filter(
          ({ center }) =>
            center <
            containerCenter - tolerance
        )
        .sort(
          (a, b) =>
            b.center - a.center
        )[0];
    }

    if (!target) return;

    const delta =
      target.center - containerCenter;

    el.scrollBy({
      left: delta,
      behavior: "smooth"
    });
  };

  const toggleCard = (cardKey) => {
    setOpenCard((current) =>
      current === cardKey
        ? null
        : cardKey
    );
  };

  const handleCardKeyDown = (
    event,
    cardKey
  ) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();

      toggleCard(cardKey);
    }
  };

  useEffect(() => {
    const el = gridRef.current;

    if (!el) return;

    updateScrollState();

    el.addEventListener(
      "scroll",
      updateScrollState,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateScrollState
    );

    return () => {
      el.removeEventListener(
        "scroll",
        updateScrollState
      );

      window.removeEventListener(
        "resize",
        updateScrollState
      );
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
      className={`magazine-wrapper ${
        hasLeft ? "has-left" : ""
      } ${
        hasRight ? "has-right" : ""
      }`}
    >
      <button
        type="button"
        className="mag-side mag-side--left"
        onClick={() => scroll(-1)}
        disabled={!hasLeft}
        aria-label="Ver tecnologías anteriores"
      >
        <span aria-hidden="true">
          ‹
        </span>
      </button>

      <div
        className="magazine-grid"
        ref={gridRef}
        onScroll={updateScrollState}
      >
        {sortedItems.map(
          (item, index) => {
            const cardKey =
              item.id ||
              item.name ||
              index;

            const isOpen =
              openCard === cardKey;

            return (
              <article
                key={cardKey}
                className={`mag-card ${
                  isOpen
                    ? "is-open"
                    : ""
                }`}
                style={getGridSpan(
                  item.grid
                )}
                onClick={() =>
                  toggleCard(cardKey)
                }
                onKeyDown={(event) =>
                  handleCardKeyDown(
                    event,
                    cardKey
                  )
                }
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={`${item.name}. ${
                  isOpen
                    ? "Ocultar descripción"
                    : "Ver descripción"
                }`}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  loading="lazy"
                />

                <div className="mag-overlay">
                  <span className="mag-chip">
                    Tecnología
                  </span>

                  <div className="mag-copy">
                    <div className="mag-title-row">
                      <h3>
                        {item.name}
                      </h3>

                      <span
                        className="mag-toggle"
                        aria-hidden="true"
                      >
                        {isOpen
                          ? "−"
                          : "+"}
                      </span>
                    </div>

                    {isOpen &&
                      item.desc && (
                        <p className="mag-description">
                          {
                            item.desc
                          }
                        </p>
                      )}
                  </div>
                </div>
              </article>
            );
          }
        )}
      </div>

      <button
        type="button"
        className="mag-side mag-side--right"
        onClick={() => scroll(1)}
        disabled={!hasRight}
        aria-label="Ver más tecnologías"
      >
        <span aria-hidden="true">
          ›
        </span>
      </button>
    </div>
  );
}