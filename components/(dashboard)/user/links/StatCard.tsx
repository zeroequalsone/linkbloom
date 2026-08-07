import { IconType } from "react-icons";
import { FaArrowTrendUp } from "react-icons/fa6";

type StatCardProps = {
  title: string;
  value: number;
  change: number;
  icon: IconType;
};

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  const Icon = icon;

  return (
    <div className="p-4 space-y-2 bg-cream-2 rounded-xl">
      <p className="text-xs text-cream-4 font-medium">{title}</p>
      <p className="text-2xl text-cream-6 font-fraunces font-medium">{value}</p>
      <p className="flex items-center gap-1 text-mint-4 text-xs font-semibold">
        <Icon size={12} />
        <span>+{change}%</span>
      </p>
    </div>
  );
}
