'use client';

import { useEffect } from 'react';
import { ACCENT_PRESETS, WALLPAPERS } from '@/lib/theme';
import { useUIStore } from '@/stores/ui-store';

/**
 * Applies the chosen accent + wallpaper to CSS variables on <html>.
 * Mount once near the root of the authenticated app.
 */
export function ThemeCustomizer() {
  const accent = useUIStore((s) => s.accent);
  const wallpaper = useUIStore((s) => s.wallpaper);

  useEffect(() => {
    const root = document.documentElement;
    const preset = ACCENT_PRESETS.find((a) => a.id === accent);
    if (preset) root.style.setProperty('--accent', preset.hsl);

    const wp = WALLPAPERS.find((w) => w.id === wallpaper);
    root.style.setProperty('--app-wallpaper', wp?.css ?? 'transparent');
  }, [accent, wallpaper]);

  return null;
}
