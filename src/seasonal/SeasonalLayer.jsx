import { Suspense, useEffect, useState } from "react";

import {
  getNextSeasonalSwitch,
  resolveActiveTheme,
  seasonalConfig,
} from "./seasonal.config";
import { seasonalRegistry } from "./registry";

const BODY_CLASS_PREFIX = "season-";
const MAX_TIMEOUT_MS = 2_147_000_000;

export default function SeasonalLayer() {
  const [now, setNow] = useState(() => new Date());

  const scheduledTheme = resolveActiveTheme(now);
  const activeTheme = import.meta.env.DEV && seasonalConfig.previewTheme
    ? seasonalConfig.previewTheme
    : scheduledTheme;

  const ActiveTheme = activeTheme
    ? seasonalRegistry[activeTheme]
    : null;

  useEffect(() => {
    if (import.meta.env.DEV && seasonalConfig.previewTheme) {
      return undefined;
    }

    const nextSwitch = getNextSeasonalSwitch(now);

    if (!nextSwitch) return undefined;

    const delay = Math.min(
      Math.max(nextSwitch.getTime() - Date.now() + 50, 0),
      MAX_TIMEOUT_MS
    );

    const timeoutId = window.setTimeout(() => {
      setNow(new Date());
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [now]);

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
