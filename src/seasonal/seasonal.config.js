export const seasonalConfig = {
  enabled: true,

  // Local development keeps the theme under construction visible while
  // production follows the calendar below.
  previewTheme: "todos-santos",

  fallbackTheme: "halloween",

  schedule: [
    {
      // Bolivia / America/La_Paz (UTC-04:00)
      at: "2026-11-01T08:00:00-04:00",
      theme: "todos-santos",
    },
  ],
};

export function resolveActiveTheme(now = new Date()) {
  if (!seasonalConfig.enabled) return null;

  let activeTheme = seasonalConfig.fallbackTheme ?? null;

  for (const entry of seasonalConfig.schedule) {
    const switchAt = new Date(entry.at);

    if (Number.isNaN(switchAt.getTime())) continue;
    if (now < switchAt) break;

    activeTheme = entry.theme;
  }

  return activeTheme;
}

export function getNextSeasonalSwitch(now = new Date()) {
  if (!seasonalConfig.enabled) return null;

  for (const entry of seasonalConfig.schedule) {
    const switchAt = new Date(entry.at);

    if (!Number.isNaN(switchAt.getTime()) && switchAt > now) {
      return switchAt;
    }
  }

  return null;
}
