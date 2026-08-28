import { FaEye } from "react-icons/fa6";
import StatCard from "./StatCard";
import {
  LuChartNoAxesColumn,
  LuMousePointerClick,
  LuUsers,
} from "react-icons/lu";
import { getCurrentUser } from "@/lib/supabase/server";

// const stats = [
//   {
//     title: "Gesamtaufrufe",
//     icon: FaEye,
//   },
//   {
//     title: "Klicks",
//     icon: LuMousePointerClick,
//   },
//   {
//     title: "Klickrate",
//     icon: LuChartNoAxesColumn,
//   },
//   {
//     title: "Neue Follower",
//     icon: LuUsers,
//   },
// ];

type Stat = {
  id: string;
  views: number;
  views_7_days_ago: number;
  clicks: number;
  clicks_7_days_ago: number;
};

export default async function DashboardStats() {
  const { user, supabase } = await getCurrentUser();

  const { data }: { data: Stat[] | null } = await supabase
    .from("stats")
    .select("*")
    .eq("user_id", user?.id);

  if (!data) return;

  const stat = data[0];

  const currentClickRate =
    stat.views > 0 ? (stat.clicks / stat.views) * 100 : 0;

  const previousClickRate =
    stat.views_7_days_ago > 0
      ? (stat.clicks_7_days_ago / stat.views_7_days_ago) * 100
      : 0;

  const calcChange = (current: number, previous: number) => {
    if (previous <= 0) return null;
    return ((current - previous) / previous) * 100;
  };

  const clickRateChange = calcChange(currentClickRate, previousClickRate);

  const formatPercentageChange = (current: number, previous: number) => {
    if (previous <= 0) {
      return "Keine Vergleichsdaten";
    }

    const change = ((current - previous) / previous) * 100;

    return `${change >= 0 ? "+" : ""}${change.toLocaleString("de", { maximumFractionDigits: 2 })}% (letzte 7 Tage)`;
  };

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-9">
      <div key={stat.id} className="contents">
        {/* Gesamtaufrufe */}
        <div className="p-4 space-y-2 bg-cream-2 rounded-xl">
          <p className="text-xs text-cream-4 font-medium">Gesamtaufrufe</p>

          <p className="text-2xl text-cream-6 font-fraunces font-medium">
            {stat.views.toLocaleString("de")}
          </p>

          <p className="flex items-center gap-1 text-mint-4 text-xs font-semibold">
            <span>
              {formatPercentageChange(stat.views, stat.views_7_days_ago)}
            </span>
          </p>
        </div>

        {/* Klicks */}
        <div className="p-4 space-y-2 bg-cream-2 rounded-xl">
          <p className="text-xs text-cream-4 font-medium">Klicks</p>

          <p className="text-2xl text-cream-6 font-fraunces font-medium">
            {stat.clicks.toLocaleString("de")}
          </p>

          <p className="flex items-center gap-1 text-mint-4 text-xs font-semibold">
            <span>
              {formatPercentageChange(stat.clicks, stat.clicks_7_days_ago)}
            </span>
          </p>
        </div>

        {/* Klickrate */}
        <div className="p-4 space-y-2 bg-cream-2 rounded-xl">
          <p className="text-xs text-cream-4 font-medium">Klickrate</p>

          <p className="text-2xl text-cream-6 font-fraunces font-medium">
            {currentClickRate.toLocaleString("de", {
              maximumFractionDigits: 2,
            })}
            %
          </p>

          <p className="flex items-center gap-1 text-mint-4 text-xs font-semibold">
            <span>
              {clickRateChange !== null
                ? `${clickRateChange >= 0 ? "+" : ""}${clickRateChange.toLocaleString(
                    "de",
                    {
                      maximumFractionDigits: 2,
                    },
                  )}% (letzte 7 Tage)`
                : "Keine Vergleichsdaten"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
