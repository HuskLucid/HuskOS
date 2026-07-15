import Link from 'next/link';
import { ArrowRight, Timer, CheckSquare, Flame, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 15% 0%, hsl(var(--accent)/0.14), transparent), radial-gradient(50% 50% at 95% 10%, hsl(212 90% 58% / 0.10), transparent)',
        }}
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-glow">
            <span className="text-sm font-semibold">H</span>
          </div>
          <span className="font-semibold tracking-tight">HuskOS</span>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/login">Sign in</Link>
        </Button>
      </header>

      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="size-3.5 text-accent" /> Your distraction-free study space
        </div>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Focus. Study. Flow.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance text-lg text-muted-foreground">
          HuskOS brings your tasks, notes, habits, goals, and focus timer into one calm,
          beautiful place — synced to the cloud, ready on every device.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/login">
              Get started <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-4xl gap-4 px-6 pb-24 sm:grid-cols-3">
        {[
          { icon: Timer, title: 'Deep Focus', body: 'A Pomodoro timer that logs every minute you study.' },
          { icon: CheckSquare, title: 'Clear Tasks', body: 'Capture what matters, then let the rest go.' },
          { icon: Flame, title: 'Real Streaks', body: 'Build habits with XP, levels, and momentum.' },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="card-elevated p-6 text-left">
            <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Icon className="size-5" />
            </div>
            <h3 className="font-semibold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        Built with focus · HuskOS
      </footer>
    </main>
  );
}
