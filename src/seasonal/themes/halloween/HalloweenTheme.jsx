import { halloweenConfig } from "./halloween.config";
import "./halloween.css";

export default function HalloweenTheme() {
  const { decorations } = halloweenConfig;

  return (
    <div className="halloween-layer" aria-hidden="true">
      {decorations.atmosphere && <div className="halloween-atmosphere" />}

      {decorations.cobwebs && (
        <>
          <div className="halloween-web halloween-web--left" />
          <div className="halloween-web halloween-web--right" />
        </>
      )}

      {decorations.bats && (
        <>
          <span className="halloween-bat halloween-bat--1" />
          <span className="halloween-bat halloween-bat--2" />
          <span className="halloween-bat halloween-bat--3" />
        </>
      )}

      {decorations.pumpkins && (
        <>
          <div className="halloween-pumpkin halloween-pumpkin--left" />
          <div className="halloween-pumpkin halloween-pumpkin--right" />
        </>
      )}
    </div>
  );
}
