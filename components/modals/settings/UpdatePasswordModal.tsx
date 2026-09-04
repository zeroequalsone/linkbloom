"use client";
import Input from "@/components/ui/Input";
import { updatePassword } from "@/lib/auth/auth-actions";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { LuX } from "react-icons/lu";

export default function UpdatePasswordModal({
  setModalOpen,
  setSaved,
}: {
  setModalOpen: (val: boolean) => void;
  setSaved: (val: boolean) => void;
}) {
  const [errorStatus, setErrorStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorStatus("");
    setSaved(false);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const error = await updatePassword(formData);

        if (error) {
          setErrorStatus(error);
          return;
        }

        setSaved(true);
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
          <p className="font-fraunces font-semibold text-xl">Passwort ändern</p>
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            disabled={isPending}
            className="bg-cream-2 p-2 rounded-full hover:bg-cream-3 active:bg-cream-3/50 hover:text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LuX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-cream-5">
              Aktuelles Passwort
            </label>
            <input
              type="password"
              name="currentPassword"
              className="w-full lg:text-sm text-xs border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4"
              placeholder="••••••••"
              disabled={isPending}
              required
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-cream-5">
              Neues Passwort
            </label>
            <input
              type="password"
              name="newPassword"
              className="w-full lg:text-sm text-xs border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4"
              placeholder="Mindestens 8 Zeichen (Groß-/Kleinbuchstaben, Zahl, Sonderzeichen)."
              required
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-cream-5">
              Neues Passwort bestätigen
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full lg:text-sm text-xs border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4"
              placeholder="Mindestens 8 Zeichen (Groß-/Kleinbuchstaben, Zahl, Sonderzeichen)."
              required
              disabled={isPending}
            />
          </div>

          {errorStatus && (
            <p className="text-red-500 text-sm text-center mt-1">
              {errorStatus}
            </p>
          )}

          <div className="flex items-center justify-center gap-2.5 mt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              disabled={isPending}
              className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 hover:text-white border border-cream-4 text-cream-5 py-2.5 px-4.5 rounded-full lg:text-sm text-xs font-medium cursor-pointer"
            >
              Abbrechen
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="text-white hover:bg-mint-3 active:bg-mint-2 bg-mint-4 py-2.5 px-4.5 rounded-full lg:text-sm text-xs font-medium cursor-pointer disabled:bg-mint-3/50 disabled:cursor-not-allowed disabled:hover:bg-mint-3/50 disabled:active:bg-mint-3/50"
            >
              {isPending ? "Speichern..." : "Passwort speichern"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
