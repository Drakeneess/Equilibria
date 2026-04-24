// useMousePosition.js
import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setPos({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () =>
      window.removeEventListener("mousemove", handleMove);
  }, []);

  return pos;
}
