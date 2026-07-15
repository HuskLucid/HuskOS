import { PageHeader } from '@/components/shell/page-header';
import { SettingsPanel } from '@/components/settings/settings-panel';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Make HuskOS yours." />
      <SettingsPanel />
    </div>
  );
}
