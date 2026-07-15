import { PageHeader } from '@/components/shell/page-header';
import { EmptyState } from '@/components/shell/empty-state';
import { NotebookPen } from 'lucide-react';

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Notes" subtitle="Markdown notes, organized in folders." />
      <EmptyState
        icon={NotebookPen}
        title="Your notebook is ready"
        body="Notes are stored in Supabase and support Markdown. The editor UI is the next build step — the data layer and schema are already in place."
      />
    </div>
  );
}
