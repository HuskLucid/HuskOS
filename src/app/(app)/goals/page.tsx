import { PageHeader } from '@/components/shell/page-header';
import { EmptyState } from '@/components/shell/empty-state';
import { Target } from 'lucide-react';

export default function GoalsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Goals" subtitle="Aim high, measure progress." />
      <EmptyState
        icon={Target}
        title="Set your first goal"
        body="Progress-tracked goals with deadlines. Backed by the goals table already defined in the schema."
      />
    </div>
  );
}
