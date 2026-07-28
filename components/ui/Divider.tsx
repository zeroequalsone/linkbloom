export default function Divider({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-full h-px bg-cream-3"></span>
      <p className="text-cream-4">{text}</p>
      <span className="w-full h-px bg-cream-3"></span>
    </div>
  );
}
