// CarnivalConfetti.jsx

import ConfettiPiece from "./ConfettiPiece";

const VARIANTS = [
  "rect",
  "circle",
  "triangle",
  "curve"
];

function random(seed) {
  return Math.abs(Math.sin(seed)) % 1;
}

export default function CarnivalConfetti({
  count = 80,
  seed = 12
}) {

  return (
    <div className="confetti-layer">

      {Array.from({ length: count }).map((_, i) => {

        const r1 = random(seed + i * 2);
        const r2 = random(seed + i * 5);
        const r3 = random(seed + i * 7);

        const left = r1 * 100;
        const delay = r2 * 6;
        const duration = 6 + r3 * 6;
        const size = 6 + r3 * 12;

        const variant =
          VARIANTS[Math.floor(r1 * VARIANTS.length)];

        return (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`
            }}
          >
            <ConfettiPiece
              variant={variant}
              color={`hsl(${r2 * 360},90%,65%)`}
            />
          </div>
        );
      })}

    </div>
  );
}
