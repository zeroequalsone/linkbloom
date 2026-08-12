type FontButtonProps = {
  font: string;
  description: string;
  displayName: string;
};

export default function FontButton({
  font,
  description,
  displayName,
}: FontButtonProps) {
  return (
    <button className="space-y-2 items-center p-3.5 bg-cream-1 rounded-xl border border-cream-3/25 hover:border-cream-4">
      <p className={`${font}`}>{displayName}</p>
      <p className="text-xs font-semibold text-cream-5">{description}</p>
    </button>
  );
}
