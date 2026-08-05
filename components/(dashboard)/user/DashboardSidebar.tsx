import { getCurrentUser } from "@/lib/auth/auth-server";
import { GoGear } from "react-icons/go";
import { LuChartNoAxesColumn, LuLink, LuPalette } from "react-icons/lu";

const links = [
  {
    id: 1,
    title: "Links",
    icon: LuLink,
  },
  {
    id: 2,
    title: "Design",
    icon: LuPalette,
  },
  {
    id: 3,
    title: "Statistiken",
    icon: LuChartNoAxesColumn,
  },
  {
    id: 4,
    title: "Einstellungen",
    icon: GoGear,
  },
];

export default async function DashboardSidebar() {
  const { user } = await getCurrentUser();
  const username = user?.user_metadata.username;
  const displayName = user?.user_metadata.display_name;

  return (
    <div className="flex w-90 flex-col justify-between bg-cream-2 p-8 border-r border-cream-3/25">
      <div>
        <p className="mb-8 text-lg font-medium">Dashboard</p>
        <div className="flex flex-col gap-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <button
                key={link.title}
                className="group hover:bg-cream-3/25 flex items-center gap-3 text-cream-5 font-medium text-sm p-3 rounded-xl cursor-pointer hover:text-cream-6"
              >
                <Icon size={16} />
                <span>{link.title}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 text-cream-5 p-3 pt-6 border-t border-cream-3/25">
          {/* TODO: Profile Picture */}
          <div className="bg-cream-3 rounded-full">
            <div className="size-8"></div>
          </div>
          <div>
            <p className="text-sm text-cream-6 font-medium mb-1">
              {displayName}
            </p>
            <p className="text-xs text-cream-4">@{username}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
