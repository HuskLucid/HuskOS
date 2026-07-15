import { PageHeader } from '@/components/shell/page-header';
import { EmptyState } from '@/components/shell/empty-state';
import { Flame } from 'lucide-react';

export default function HabitsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Habits" subtitle="Build momentum, one day at a time." />
      <EmptyState
        icon={Flame}
        title="Track your first habit"
        body="Daily habit logging with a streak heatmap. Backed by the habits + habit_logs tables already defined in the schema."
      />
    </div>
  );
}
