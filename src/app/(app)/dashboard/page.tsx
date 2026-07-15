import { PageHeader } from '@/components/shell/page-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { LevelCard } from '@/components/dashboard/level-card';
import { QuoteCard } from '@/components/dashboard/quote-card';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const name = user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? 'there';

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${name}`}
        subtitle="Here's your focus at a glance."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Focus today" value="0m" hint="Start a session" />
        <StatCard label="Tasks done" value="0" hint="of 0" />
        <StatCard label="Habit streak" value="0" hint="days" />
        <StatCard label="Open goals" value="0" hint="in progress" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <LevelCard className="lg:col-span-2" />
        <QuoteCard />
      </div>
    </div>
  );
}
