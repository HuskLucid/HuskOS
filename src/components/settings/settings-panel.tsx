'use client';

import { ACCENT_PRESETS, WALLPAPERS } from '@/lib/theme';
import { useUIStore } from '@/stores/ui-store';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function SettingsPanel() {
  const { accent, wallpaper, setAccent, setWallpaper } = useUIStore();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Accent color</CardTitle>
        </CardHeader>
        <div className="flex flex-wrap gap-3">
          {ACCENT_PRESETS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAccent(a.id)}
              className={cn(
                'size-10 rounded-full ring-offset-2 ring-offset-surface-elevated transition-all',
                accent === a.id && 'ring-2 ring-foreground',
              )}
              style={{ backgroundColor: `hsl(${a.hsl})` }}
              aria-label={a.label}
            />
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Wallpaper</CardTitle>
        </CardHeader>
        <div className="flex flex-col gap-2">
          {WALLPAPERS.map((w) => (
            <button
              key={w.id}
              onClick={() => setWallpaper(w.id)}
              className={cn(
                'rounded-xl border px-4 py-2.5 text-left text-sm transition-colors',
                wallpaper === w.id
                  ? 'border-accent bg-accent-soft'
                  : 'border-border hover:bg-surface-muted',
              )}
            >
              {w.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
