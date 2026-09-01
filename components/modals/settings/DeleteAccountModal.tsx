"use client";
import { deleteAccount } from "@/lib/auth/auth-actions";
import { useEffect, useState, useTransition } from "react";
import { LuX } from "react-icons/lu";

export default function DeleteAccountModal({
  setModalOpen,
}: {
  setModalOpen: (val: boolean) => void;
}) {
  const [errorStatus, setErrorStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleDelete = () => {
    setErrorStatus("");

    startTransition(async () => {
      try {
        const res = await deleteAccount();

        if (res?.message) {
          setErrorStatus(
            "Fehler beim Löschen des Accounts. Bitte versuche es später erneut.",
          );
          return;
        }

        setModalOpen(false);
      } catch {
        setErrorStatus("Ein unerwarteter Fehler ist aufgetreten.");
      }
    });
  };

  return (
    <div className="z-100 fixed inset-0 flex items-center justify-center backdrop-blur-xs p-8">
      <div className="bg-cream-1 p-6 max-w-md w-full rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <p className="font-fraunces font-semibold text-xl">
            Account wirklich löschen?
          </p>
          <button
            onClick={() => setModalOpen(false)}
            disabled={isPending}
            className="bg-cream-2 p-2 rounded-full hover:bg-cream-3 active:bg-cream-3/50 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuX />
          </button>
        </div>
        <div className="flex flex-col gap-4.5">
          <p className="text-center">
            Möchtest du deinen Account wirklich unwiderruflich löschen?
          </p>

          <div className="flex items-center justify-center gap-2.5">
            <button
              onClick={() => setModalOpen(false)}
              disabled={isPending}
              className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:text-white border border-cream-4 text-cream-5 py-2.5 px-4.5 rounded-full text-sm font-medium"
            >
              Abbrechen
            </button>

            <button
              onClick={handleDelete}
              disabled={isPending}
              className="text-white hover:bg-red-600 active:bg-red-500 bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed py-2.5 px-4.5 rounded-full text-sm font-medium cursor-pointer"
            >
              {isPending ? "Löschen..." : "Löschen"}
            </button>
          </div>

          {errorStatus && (
            <p className="text-red-500 text-sm text-center">{errorStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
}
