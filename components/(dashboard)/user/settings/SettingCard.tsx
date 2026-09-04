import SettingsSwitch from "./SettingsSwitch";

export default function SettingCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex justify-between items-center bg-cream-1 opacity-50 rounded-xl py-3 px-3.5">
      <div className="flex flex-col gap-1 max-w-48">
        <p className="text-sm font-medium text-cream-6">{title}</p>
        <p className="text-xs text-cream-4">{description}</p>
      </div>
      <SettingsSwitch linkId="" enabled={false} />
    </div>
  );
}
