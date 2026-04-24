// src/components/Hollidays/Carnival/Garland.jsx

import "./garland.css";

const COLORS = [
  "#fa6262d9",
  "#e6fa67d9",
  "#77d35ed9",
  "#67b7fad9",
  "#d36af5d9",
  "#ffa94dd9"
];

function seededRandom(seed) {
  return Math.abs(Math.sin(seed)) % 1;
}

export default function Garland({
  count = 18,
  seed = 222
}) {
  return (
    <div className="garland-layer" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const r = seededRandom(seed + i * 7);
        const color = COLORS[Math.floor(r * COLORS.length)];

        return (
          <div
            key={i}
            className="garland-flag"
            style={{
              "--color": color,
              "--i": i
            }}
          />
        );
      })}
    </div>
  );
}
