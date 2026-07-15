import { cn } from '@/lib/utils';
import { levelFromXp } from '@/lib/utils';

export function LevelCard({ xp = 0, className }: { xp?: number; className?: string }) {
  const { level, into, needed } = levelFromXp(xp);
  const pct = Math.round((into / needed) * 100);
  return (
    <div className={cn('card-elevated p-6', className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Your level</p>
          <p className="mt-1 text-4xl font-semibold tracking-tight">Lv {level}</p>
        </div>
        <div className="text-right text-xs text-muted-foreground">
          <p>{into} XP</p>
          <p>/ {needed} to next</p>
        </div>
      </div>
      <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Earn XP by completing focus sessions, tasks, and habits.
      </p>
    </div>
  );
}
