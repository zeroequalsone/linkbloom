"use client";

import { updateFont } from "@/lib/profile/profile-actions";
import { Font } from "@/lib/profile/profile-types";
import { useRouter } from "next/navigation";

type FontButtonProps = {
  font: Font;
  name: string;
  displayName: string;
  selected: boolean;
  style: string;
};

export default function FontButton({
  font,
  name,
  displayName,
  selected,
  style,
}: FontButtonProps) {
  const router = useRouter();

  const handleClick = async () => {
    await updateFont(font);
    router.push("/dashboard/design");
  };

  return (
    <button
      onClick={handleClick}
      className={`space-y-2 items-center p-3.5 bg-cream-1 rounded-xl border border-cream-3/25 hover:border-cream-4 cursor-pointer ${selected && "border-mint-4"}`}
    >
      <p className={`${style}`}>{displayName}</p>
      <p className="text-xs font-semibold text-cream-5">{name}</p>
    </button>
  );
}
