// src/components/Hollidays/Christmas/ChristmasSnow.jsx
import { useEffect } from "react";
import "./christmas-snow.css";

export default function ChristmasSnow() {

  useEffect(() => {

    const container = document.querySelector(".snow-container");
    if (container) {
      const rect = container.getBoundingClientRect();
    }

    const sample = document.querySelector(".snow");
    if (sample) {
      const cs = getComputedStyle(sample);
    }
  }, []);

  return (
    <div className="snow-container">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className="snow"
          style={{
            "--x": Math.random(),           // posición horizontal (0 a 1)
            "--d": Math.random() * 1.5,      // duración extra (0 a 1.5)
            "--sz": 0.6 + Math.random() * 1  // tamaño aleatorio (0.6 a 1.6)
          }}
        ></div>
      ))}
    </div>
  );
}
