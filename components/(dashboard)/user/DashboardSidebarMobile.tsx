"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import { LuChartNoAxesColumn, LuLink, LuPalette } from "react-icons/lu";

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

export default function DashboardSidebarMobile({
  tab,
  displayNameInitial,
}: {
  tab: string;
  displayNameInitial: string;
}) {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed lg:hidden bottom-0 w-full py-4 bg-cream-2 border-r border-cream-3/25 transition-transform duration-300 ${
        footerVisible ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-evenly">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.title}
              href={link.href}
              className={`hover:bg-cream-3/25 flex flex-col items-center gap-3 text-cream-5 font-medium text-xs p-3 rounded-xl cursor-pointer hover:text-cream-6 ${
                link.title === tab && "bg-cream-3/25"
              }`}
            >
              <Icon
                size={16}
                className={link.title === tab ? "text-mint-4" : undefined}
              />

              <span className={link.title === tab ? "text-cream-6" : undefined}>
                {link.title}
              </span>
            </Link>
          );
        })}

        <div className="flex items-center justify-center bg-cream-3 rounded-full size-8">
          {displayNameInitial}
        </div>
      </div>
    </div>
  );
}
