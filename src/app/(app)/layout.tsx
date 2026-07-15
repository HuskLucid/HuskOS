import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Sidebar } from '@/components/shell/sidebar';
import { Topbar } from '@/components/shell/topbar';
import { ThemeCustomizer } from '@/components/theme-customizer';
import { CommandPalette } from '@/components/command-palette';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div className="flex min-h-dvh">
      <ThemeCustomizer />
      <CommandPalette />
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar email={user.email ?? ''} />
        <main
          className="flex-1 px-6 py-6 md:px-10"
          style={{ backgroundImage: 'var(--app-wallpaper)' }}
        >
          <div className="mx-auto w-full max-w-6xl animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
