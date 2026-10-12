import { halloweenConfig } from "./halloween.config";
import "./halloween.css";

export default function HalloweenTheme() {
  const { decorations } = halloweenConfig;

  if (!decorations.bats) return null;

  return (
    <div className="halloween-layer" aria-hidden="true">
      <span className="halloween-bat halloween-bat--1" />
      <span className="halloween-bat halloween-bat--2" />
    </div>
  );
}
