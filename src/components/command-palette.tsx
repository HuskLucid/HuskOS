'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
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
import { useUIStore } from '@/stores/ui-store';

const ITEMS = [
  { href: '/dashboard', label: 'Go to Home', icon: LayoutDashboard },
  { href: '/focus', label: 'Start a Focus session', icon: Timer },
  { href: '/tasks', label: 'View Tasks', icon: CheckSquare },
  { href: '/notes', label: 'Open Notes', icon: NotebookPen },
  { href: '/habits', label: 'Track Habits', icon: Flame },
  { href: '/goals', label: 'Review Goals', icon: Target },
  { href: '/calendar', label: 'Open Calendar', icon: CalendarDays },
  { href: '/analytics', label: 'See Analytics', icon: BarChart3 },
  { href: '/library', label: 'Resource Library', icon: Library },
  { href: '/settings', label: 'Settings', icon: Settings },
] as const;

export function CommandPalette() {
  const open = useUIStore((s) => s.commandOpen);
  const setOpen = useUIStore((s) => s.setCommandOpen);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/60 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="card-elevated w-full max-w-lg overflow-hidden p-2 shadow-elevated"
          >
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground">Navigate</div>
            <div className="max-h-80 overflow-y-auto">
              {ITEMS.map(({ href, label, icon: Icon }) => (
                <button
                  key={href}
                  onClick={() => go(href)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-surface-muted"
                >
                  <Icon className="size-4 text-muted-foreground" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
