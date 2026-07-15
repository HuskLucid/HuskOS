import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export function EmptyState({
  icon: Icon,
  title,
  body,
  className,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'card-elevated flex flex-col items-center gap-3 p-12 text-center',
        className,
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Icon className="size-5" />
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
