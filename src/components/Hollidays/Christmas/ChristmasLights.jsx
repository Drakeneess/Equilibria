import { useRef, useEffect } from "react";
import "./christmas-lights.css";

export default function ChristmasLights() {
  const wrapRef = useRef(null);
  const COLORS = ["red", "green", "yellow", "blue", "warm"];

  useEffect(() => {
    if (wrapRef.current) {
      console.log("🎄 wrapper width:", wrapRef.current.offsetWidth);
    }
  }, []);

  return (
    <div className="lights-wrapper" ref={wrapRef}>
      
      <svg className="lights-cable" viewBox="0 0 100 40" preserveAspectRatio="none">
        <path d="M0 10 C 25 40, 75 40, 100 10" className="cable-path" />
      </svg>

      <div className="lights-container">
        {Array.from({ length: 20 }).map((_, i) => {
          const progress = i / 19;
          const x = progress * 100;
          const y = (28 + 25 * Math.sin(progress * Math.PI)) - 10;
          const colorClass = COLORS[i % COLORS.length];

          return (
            <div
              key={i}
              className="light-wrapper"
              style={{ left: `${x}%`, top: `${y}px` }}
            >
              <div className="socket" />

              <div
                className={`light-bulb ${colorClass} on`}
                style={{
                  "--delay": `${(Math.random() * 3).toFixed(2)}s`,
                  "--wiggle": `${(Math.random() * 3 - 1.5).toFixed(2)}deg`
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
