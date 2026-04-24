// src/components/Hollidays/Carnival/CarnivalSerpentines.jsx

import "./carnivalSerpentines.css";
import Serpentina from "./Serpentina";
import useMousePosition from "./useMousePosition";

const VARIANTS = ["main", "soft", "fragment"];
const COLORS = ["#d8a0fe", "#fffd95", "#aafec9", "#fdbb94"];

function seededRandom(seed) {
  return Math.abs(Math.sin(seed)) % 1;
}

export default function CarnivalSerpentines({
  count = 11,
  seed = 35
}) {
  const mouse = useMousePosition();

  /* ===== Banda vertical superior ===== */
  const usableHeight = 20;
  const topOffset = -25;
  const rowHeight = usableHeight / count;

  /* ===== Distribución horizontal ===== */
  const columns = Math.ceil(Math.sqrt(count));
  const columnWidth = 90 / columns;
  const leftOffset = 5;

  return (
    <div className="carnival-layer" aria-hidden="true">

      {Array.from({ length: count }).map((_, i) => {

        const r1 = seededRandom(seed + i * 3);
        const r2 = seededRandom(seed + i * 7);
        const r3 = seededRandom(seed + i * 11);

        /* ===== Variante y color ===== */
        const variant =
          VARIANTS[Math.floor(r1 * VARIANTS.length)];

        const color =
          COLORS[Math.floor(r2 * COLORS.length)];

        /* ===== Escala ===== */
        const baseSize = 60 + r3 * 80;

        const sizeByVariant = {
          main: baseSize,
          soft: baseSize * 0.8,
          fragment: baseSize * 0.55
        };

        /* ===== Vertical ===== */
        const topBase = i * rowHeight;
        const topJitter =
          (r2 - 0.5) * rowHeight * 0.8;

        /* ===== Horizontal ===== */
        const col = i % columns;
        const colBase = col * columnWidth;
        const colJitter =
          (r1 - 0.5) * columnWidth * 0.7;

        const left =
          leftOffset + colBase + colJitter;

        /* ===== Mouse en px reales ===== */
        const mouseX =
          (mouse.x + 0.5) * window.innerWidth;

        const mouseY =
          (mouse.y + 0.5) * window.innerHeight;

        /* ===== Posición serpentina ===== */
        const rectX =
          (left / 100) * window.innerWidth;

        const rectY =
          ((topOffset + topBase + topJitter) / 100) *
          window.innerHeight;

        /* ===== Física de repulsión ===== */
        const dx = rectX - mouseX;
        const dy = rectY - mouseY;

        const dist =
          Math.sqrt(dx * dx + dy * dy) || 1;

        const radius = 4000;

        const force =
          Math.max(0, radius - dist) / radius;

        const repelStrength = {
          main: 35,
          soft: 22,
          fragment: 12
        }[variant];

        const repelX =
          (dx / dist) * force * repelStrength;

        const repelY =
          (dy / dist) * force * repelStrength;

        /* ===== Rotación base ===== */
        const rotation =
          (r3 - 0.5) * 12;

        return (
          <div
            key={i}
            className={`serpentine ${variant}`}
            style={{
              "--size":
                `${sizeByVariant[variant]}px`,

              "--top":
                `${topOffset + topBase + topJitter}%`,

              "--left": `${left}%`,

              transform: `
                rotate(${rotation}deg)
                translate(${repelX}px, ${repelY}px)
              `
            }}
          >
            <Serpentina
              variant={variant}
              color={color}
              id={`serp-${i}`}
            />
          </div>
        );
      })}

    </div>
  );
}
