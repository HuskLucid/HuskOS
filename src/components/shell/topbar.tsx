'use client';

import { Search, Moon, Sun, LogOut, Focus } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useUIStore } from '@/stores/ui-store';
import { Button } from '@/components/ui/button';

export function Topbar({ email }: { email: string }) {
  const { theme, setTheme } = useTheme();
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  const toggleFocus = useUIStore((s) => s.toggleFocusMode);
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-surface/60 px-6 backdrop-blur-xl md:px-10">
      <button
        onClick={() => setCommandOpen(true)}
        className="flex h-9 flex-1 items-center gap-2 rounded-xl border border-border bg-surface-muted px-3 text-sm text-muted-foreground transition-colors hover:bg-muted md:max-w-xs"
      >
        <Search className="size-4" />
        <span>Search or jump to…</span>
        <kbd className="ml-auto rounded bg-surface px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
      </button>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggleFocus} aria-label="Focus mode">
          <Focus className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          <Sun className="size-4 dark:hidden" />
          <Moon className="hidden size-4 dark:block" />
        </Button>
        <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out" title={email}>
          <LogOut className="size-4" />
        </Button>
      </div>
    </header>
  );
}
