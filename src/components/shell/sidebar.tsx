'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Timer,
  CheckSquare,
  NotebookPen,
  Flame,
  Target,
  CalendarDays,
  BarChart3,
  Library,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/focus', label: 'Focus', icon: Timer },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/notes', label: 'Notes', icon: NotebookPen },
  { href: '/habits', label: 'Habits', icon: Flame },
  { href: '/goals', label: 'Goals', icon: Target },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-border bg-surface/50 px-3 py-5 backdrop-blur-xl md:flex">
      <Link href="/dashboard" className="mb-6 flex items-center gap-2.5 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-glow">
          <span className="text-sm font-semibold">H</span>
        </div>
        <span className="text-sm font-semibold tracking-tight">HuskOS</span>
      </Link>
      <nav className="flex flex-1 flex-col gap-0.5">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-accent-soft font-medium text-foreground'
                  : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <p className="px-3 text-xs text-muted-foreground">
        Press <kbd className="rounded bg-surface-muted px-1.5 py-0.5 font-mono">⌘K</kbd>
      </p>
    </aside>
  );
}
