"use client";
import { updateEnabled } from "@/lib/links/link-actions";
import { useState } from "react";

export default function Switch({
  enabled: initialEnabled,
  linkId,
}: {
  enabled: boolean;
  linkId: string;
}) {
  const [enabled, setEnabled] = useState(initialEnabled);

  const handleToggle = async () => {
    const newState = !enabled;
    setEnabled(newState);
    await updateEnabled(linkId, newState);
  };

  return (
    <div
      onClick={handleToggle}
      className={`w-9.5 h-5.5 rounded-full relative cursor-pointer transition-all duration-150 ${
        enabled ? "bg-mint-4" : "bg-cream-3"
      }`}
    >
      <span
        className={`bg-white size-4.5 rounded-full top-0.5 absolute transition-all duration-150 ${
          enabled ? "left-4.5" : "left-0.5"
        }`}
      ></span>
    </div>
  );
}
