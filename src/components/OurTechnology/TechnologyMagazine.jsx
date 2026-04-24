import { useRef, useState, useEffect } from "react";

function getGridSpan(grid = "1x1") {
  const [col, row] = grid.split("x");

  return {
    gridColumn: `span ${col || 1}`,
    gridRow: `span ${row || 1}`
  };
}

export default function TechnologyMagazine({ items }) {

  const gridRef = useRef(null);

  const [hasLeft, setHasLeft] = useState(false);
  const [hasRight, setHasRight] = useState(true);

  const updateScrollState = () => {

    const el = gridRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;

    const tolerance = 20;

    setHasLeft(scrollLeft > tolerance);
    setHasRight(scrollLeft < maxScroll - tolerance);

  };

  const scroll = (dir) => {

    const container = gridRef.current;

    const amount = container.clientWidth * 0.8;

    container.scrollBy({
      left: dir * amount,
      behavior: "smooth"
    });

  };

  useEffect(() => {

    const el = document.querySelector(".magazine-grid")

    const init = () => updateScrollState();

    requestAnimationFrame(init);

    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };

  }, []);

  const sortedItems = [...items].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );

  return (

    <div className={`magazine-wrapper ${hasLeft ? "has-left" : ""} ${hasRight ? "has-right" : ""}`}>
      <div
        className="mag-side left"
        onClick={() => scroll(-1)}
      >
        <span>‹</span>
      </div>

      <div className="magazine-grid" ref={gridRef}>
        {sortedItems.map((item, i) => (
          <article
            key={i}
            className="mag-card"
            style={getGridSpan(item.grid)}
          >
            <img src={item.img} alt={item.name} />

            <div className="mag-overlay">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>

          </article>
        ))}
      </div>

      <div
        className="mag-side right"
        onClick={() => scroll(1)}
      >
        <span>›</span>
      </div>
    </div>
  );
}