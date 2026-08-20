"use client";

import { updateTheme } from "@/lib/profile/profile-actions";
import { Theme } from "@/lib/profile/profile-types";
import { useRouter } from "next/navigation";

type ThemeButtonProps = {
  theme: Theme;
  name: string;
  selected: boolean;
  firstColor: string;
  secondColor: string;
  thirdColor: string;
};

export default function ThemeButton({
  theme,
  name,
  selected,
  firstColor,
  secondColor,
  thirdColor,
}: ThemeButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    await updateTheme(theme);
    router.push("/dashboard/design");
  };

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col gap-3 items-start p-3.5 bg-cream-1 rounded-xl border border-cream-3/25 hover:border-cream-4 cursor-pointer ${selected && "border-mint-4"}`}
    >
      <div className="flex gap-1.5">
        <div
          className={`${firstColor} size-5.5 border border-cream-3/25 rounded-lg`}
        ></div>
        <div
          className={`${secondColor} size-5.5 border border-cream-3/25 rounded-lg`}
        ></div>
        <div
          className={`${thirdColor} size-5.5 border border-cream-3/25 rounded-lg`}
        ></div>
      </div>
      <p className="text-sm font-semibold">{name}</p>
    </button>
  );
}
