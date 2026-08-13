import { getCurrentUser } from "@/lib/auth/auth-server";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import { LuChartNoAxesColumn, LuLink, LuPalette } from "react-icons/lu";
import DashboardSidebarMobile from "./DashboardSidebarMobile";

const links = [
  {
    id: 1,
    href: "/dashboard",
    title: "Links",
    icon: LuLink,
  },
  {
    id: 2,
    href: "/dashboard/design",
    title: "Design",
    icon: LuPalette,
  },
  {
    id: 3,
    href: "/dashboard/statistics",
    title: "Statistiken",
    icon: LuChartNoAxesColumn,
  },
  {
    id: 4,
    href: "/dashboard/settings",
    title: "Einstellungen",
    icon: GoGear,
  },
];

export default async function DashboardSidebar({ tab }: { tab: string }) {
  const { user } = await getCurrentUser();
  const username = user?.user_metadata.username;
  const displayName = user?.user_metadata.display_name;
  const displayNameInitial = displayName.substring(0, 1);

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex w-90 flex-col justify-between bg-cream-2 p-8 border-r border-cream-3/25">
        <div>
          <p className="mb-8 text-lg font-medium">Dashboard</p>
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={`hover:bg-cream-3/25 flex items-center gap-3 text-cream-5 font-medium text-sm p-3 rounded-xl cursor-pointer hover:text-cream-6 ${link.title === tab && "bg-cream-3/25"}`}
                >
                  <Icon
                    size={16}
                    className={link.title === tab ? "text-mint-4" : undefined}
                  />
                  <span
                    className={link.title === tab ? "text-cream-6" : undefined}
                  >
                    {link.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
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

      {/* Mobile */}
      <DashboardSidebarMobile
        tab={tab}
        displayNameInitial={displayNameInitial}
      />
    </>
  );
}
