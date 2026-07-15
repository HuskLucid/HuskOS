import { PageHeader } from '@/components/shell/page-header';
import { PomodoroTimer } from '@/components/focus/pomodoro-timer';

export default function FocusPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Focus" subtitle="One task. One timer. Nothing else." />
      <PomodoroTimer />
    </div>
  );
}
