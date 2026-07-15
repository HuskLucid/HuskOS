'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AccentId, WallpaperId } from '@/lib/theme';

interface UIState {
  commandOpen: boolean;
  focusMode: boolean;
  accent: AccentId;
  wallpaper: WallpaperId;
  setCommandOpen: (open: boolean) => void;
  toggleFocusMode: () => void;
  setAccent: (accent: AccentId) => void;
  setWallpaper: (wallpaper: WallpaperId) => void;
}

/**
 * UI-only client state. Persisted to localStorage purely as a rendering cache;
 * the source of truth for preferences is Settings in Supabase.
 */
export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      commandOpen: false,
      focusMode: false,
      accent: 'violet',
      wallpaper: 'aurora',
      setCommandOpen: (commandOpen) => set({ commandOpen }),
      toggleFocusMode: () => set((s) => ({ focusMode: !s.focusMode })),
      setAccent: (accent) => set({ accent }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
    }),
    { name: 'huskos-ui' },
  ),
);
