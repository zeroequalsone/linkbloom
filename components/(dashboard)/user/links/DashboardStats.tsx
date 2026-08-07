import { FaEye } from "react-icons/fa6";
import StatCard from "./StatCard";
import {
  LuChartNoAxesColumn,
  LuMousePointerClick,
  LuUsers,
} from "react-icons/lu";
import { getCurrentUser } from "@/lib/auth/auth-server";
import { IconType } from "react-icons";

// const stats = [
//   {
//     title: "Aufrufe (7 Tage)",
//     value: "2.481",
//     change: "12",
//     icon: FaEye,
//   },
//   {
//     title: "Klicks",
//     value: "892",
//     change: "8",
//     icon: LuMousePointerClick,
//   },
//   {
//     title: "Klickrate",
//     value: "35,9%",
//     change: "3",
//     icon: LuChartNoAxesColumn,
//   },
//   {
//     title: "Neue Follower",
//     value: "46",
//     change: "21",
//     icon: LuUsers,
//   },
// ];

type Stat = {
  id: string;
  title: string;
  value: number;
  change: number;
  icon: IconType;
};

export default async function DashboardStats() {
  const { user, supabase } = await getCurrentUser();

  const { data }: { data: Stat[] | null } = await supabase
    .from("stats")
    .select("*")
    .eq("user_id", user?.id);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-9">
      {data &&
        data.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
    </div>
  );
}
