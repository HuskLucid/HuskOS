import { PageHeader } from '@/components/shell/page-header';
import { EmptyState } from '@/components/shell/empty-state';
import { CalendarDays } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" subtitle="Events and exam countdowns." />
      <EmptyState
        icon={CalendarDays}
        title="Nothing scheduled yet"
        body="A month view with events and exam countdowns. Backed by the calendar_events table already defined in the schema."
      />
    </div>
  );
}
