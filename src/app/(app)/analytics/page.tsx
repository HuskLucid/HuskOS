import { PageHeader } from '@/components/shell/page-header';
import { EmptyState } from '@/components/shell/empty-state';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Your study patterns, visualized." />
      <EmptyState
        icon={BarChart3}
        title="No data yet"
        body="Focus-time charts and a study heatmap, computed from your study_sessions. Complete a few Pomodoro sessions to populate this view."
      />
    </div>
  );
}
