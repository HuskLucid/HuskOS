'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Provider = 'google' | 'github';

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get('next') ?? '/dashboard';
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(params.get('error') ? 'Sign-in failed. Try again.' : null);

  const redirectTo =
    typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`
      : undefined;

  async function withProvider(provider: Provider) {
    setLoading(provider);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } });
    if (error) {
      setError(error.message);
      setLoading(null);
    }
  }

  async function withEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading('email');
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="card-elevated relative z-10 w-full max-w-sm p-8"
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-glow">
          <span className="text-lg font-semibold">H</span>
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Welcome to HuskOS</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to enter your focus space.</p>
      </div>

      {sent ? (
        <p className="rounded-xl bg-surface-muted p-4 text-center text-sm text-muted-foreground">
          Check <span className="font-medium text-foreground">{email}</span> for a magic link.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <Button variant="outline" onClick={() => withProvider('google')} disabled={!!loading}>
              Continue with Google
            </Button>
            <Button variant="outline" onClick={() => withProvider('github')} disabled={!!loading}>
              Continue with GitHub
            </Button>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={withEmail} className="flex flex-col gap-3">
            <Input
              type="email"
              required
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" disabled={loading === 'email'}>
              {loading === 'email' ? 'Sending…' : 'Send magic link'}
            </Button>
          </form>
        </>
      )}

      {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}
    </motion.div>
  );
}
