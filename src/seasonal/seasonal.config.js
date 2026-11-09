export const seasonalConfig = {
  enabled: false,
  previewTheme: null,
  fallbackTheme: null,
  schedule: [],
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
