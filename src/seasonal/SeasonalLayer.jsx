import { Suspense, useEffect } from "react";

import { seasonalConfig } from "./seasonal.config";
import { seasonalRegistry } from "./registry";

const BODY_CLASS_PREFIX = "season-";

export default function SeasonalLayer() {
  const activeTheme = seasonalConfig.enabled
    ? seasonalConfig.activeTheme
    : null;

  const ActiveTheme = activeTheme
    ? seasonalRegistry[activeTheme]
    : null;

  useEffect(() => {
    if (!activeTheme) return undefined;

    const className = `${BODY_CLASS_PREFIX}${activeTheme}`;
    document.body.classList.add(className);
    document.body.dataset.season = activeTheme;

    return () => {
      document.body.classList.remove(className);
      delete document.body.dataset.season;
    };
  }, [activeTheme]);

  if (!activeTheme) return null;

  if (!ActiveTheme) {
    console.warn(`[seasonal] Unknown theme: ${activeTheme}`);
    return null;
  }

  return (
    <Suspense fallback={null}>
      <ActiveTheme />
    </Suspense>
  );
}
