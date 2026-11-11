"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };

  return (
    <div className="flex flex-col lg:max-w-7xl lg:mx-auto gap-4 items-center lg:p-24 lg:py-48 p-8">
      <Image
        src={"/wilted-plant.png"}
        alt="Verwelkte Pflanze"
        className="mb-4"
        height={96}
        width={96}
        priority
      />
      <h1 className="font-fraunces text-3xl font-semibold w-3xs text-center">
        Hier ist etwas verwelkt.
      </h1>
      <p className="text-cream-4 w-xs text-center mb-4">
        Auf unserer Seite ist etwas schiefgelaufen.
      </p>
      <button
        type="button"
        onClick={retry}
        className="hover:bg-mint-3 active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg cursor-pointer"
      >
        Erneut versuchen
      </button>
      <Button variant={2} title="Zur Startseite" href="/" />
    </div>
  );
}
