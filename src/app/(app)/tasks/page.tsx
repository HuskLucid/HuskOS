import { PageHeader } from '@/components/shell/page-header';
import { TaskBoard } from '@/components/tasks/task-board';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Tasks" subtitle="Capture it, then let it go." />
      <TaskBoard />
    </div>
  );
}
