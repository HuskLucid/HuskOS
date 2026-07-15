/** Accent presets — users pick one; the value is written to --accent at runtime. */
export const ACCENT_PRESETS = [
  { id: 'violet', label: 'Violet', hsl: '262 80% 60%' },
  { id: 'blue', label: 'Ocean', hsl: '212 90% 58%' },
  { id: 'emerald', label: 'Emerald', hsl: '152 60% 45%' },
  { id: 'amber', label: 'Amber', hsl: '38 92% 55%' },
  { id: 'rose', label: 'Rose', hsl: '346 80% 60%' },
  { id: 'slate', label: 'Graphite', hsl: '240 5% 45%' },
] as const;

export type AccentId = (typeof ACCENT_PRESETS)[number]['id'];

export const WALLPAPERS = [
  { id: 'none', label: 'None', css: 'transparent' },
  {
    id: 'aurora',
    label: 'Aurora',
    css: 'radial-gradient(60% 60% at 20% 10%, hsl(var(--accent)/0.12), transparent), radial-gradient(50% 50% at 90% 20%, hsl(212 90% 58% / 0.10), transparent)',
  },
  {
    id: 'dusk',
    label: 'Dusk',
    css: 'radial-gradient(70% 50% at 50% 0%, hsl(346 80% 60% / 0.08), transparent)',
  },
] as const;

export type WallpaperId = (typeof WALLPAPERS)[number]['id'];
