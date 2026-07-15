import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 20% 10%, hsl(var(--accent)/0.14), transparent), radial-gradient(50% 50% at 90% 30%, hsl(212 90% 58% / 0.10), transparent)',
        }}
      />
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
