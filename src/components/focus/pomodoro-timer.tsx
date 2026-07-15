'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { formatDuration } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';

const WORK = 25 * 60;
const BREAK = 5 * 60;

export function PomodoroTimer() {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [remaining, setRemaining] = useState(WORK);
  const [running, setRunning] = useState(false);
  const startedAtRef = useRef<Date | null>(null);
  const total = mode === 'work' ? WORK : BREAK;
  const pct = ((total - remaining) / total) * 100;

  const persist = useCallback(async (durationS: number, startedAt: Date) => {
    if (durationS < 30) return; // ignore trivially short sessions
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('study_sessions').insert({
      profile_id: user.id,
      kind: 'pomodoro',
      duration_s: durationS,
      started_at: startedAt.toISOString(),
      ended_at: new Date().toISOString(),
    });
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          setRunning(false);
          if (mode === 'work' && startedAtRef.current) {
            void persist(WORK, startedAtRef.current);
          }
          const nextMode = mode === 'work' ? 'break' : 'work';
          setMode(nextMode);
          return nextMode === 'work' ? WORK : BREAK;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode, persist]);

  function toggle() {
    if (!running && !startedAtRef.current) startedAtRef.current = new Date();
    setRunning((r) => !r);
  }

  function reset() {
    setRunning(false);
    startedAtRef.current = null;
    setRemaining(total);
  }

  const R = 130;
  const circumference = 2 * Math.PI * R;

  return (
    <div className="card-elevated flex flex-col items-center gap-8 p-10">
      <div className="flex gap-2">
        <Button
          variant={mode === 'work' ? 'default' : 'subtle'}
          size="sm"
          onClick={() => {
            setMode('work');
            setRemaining(WORK);
            setRunning(false);
            startedAtRef.current = null;
          }}
        >
          Focus
        </Button>
        <Button
          variant={mode === 'break' ? 'default' : 'subtle'}
          size="sm"
          onClick={() => {
            setMode('break');
            setRemaining(BREAK);
            setRunning(false);
          }}
        >
          <Coffee className="size-3.5" /> Break
        </Button>
      </div>

      <div className="relative flex h-[300px] w-[300px] items-center justify-center">
        <svg className="absolute -rotate-90" width={300} height={300}>
          <circle cx={150} cy={150} r={R} fill="none" stroke="hsl(var(--surface-muted))" strokeWidth={10} />
          <motion.circle
            cx={150}
            cy={150}
            r={R}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (pct / 100) * circumference}
            transition={{ ease: 'linear' }}
          />
        </svg>
        <div className="text-center">
          <p className="font-mono text-6xl font-semibold tabular-nums tracking-tight">
            {formatDuration(remaining)}
          </p>
          <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
            {mode === 'work' ? 'Focusing' : 'Break'}
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button size="lg" onClick={toggle}>
          {running ? <Pause /> : <Play />}
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button size="lg" variant="outline" onClick={reset}>
          <RotateCcw /> Reset
        </Button>
      </div>
    </div>
  );
}
