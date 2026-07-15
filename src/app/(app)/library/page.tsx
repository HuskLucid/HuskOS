import { PageHeader } from '@/components/shell/page-header';
import { EmptyState } from '@/components/shell/empty-state';
import { Library } from 'lucide-react';

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Library" subtitle="Your saved study resources." />
      <EmptyState
        icon={Library}
        title="No resources saved"
        body="Bookmark links, PDFs, and references. Backed by the resources table already defined in the schema."
      />
    </div>
  );
}
