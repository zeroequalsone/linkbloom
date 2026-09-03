"use client";
import { updateProfile } from "@/lib/auth/auth-actions";
import { FormEvent, TransitionStartFunction, useState } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

type Props = {
  newDisplayName: string;
  setNewDisplayName: (displayName: string) => void;
  newUsername: string;
  setNewUsername: (username: string) => void;
  newEmail: string;
  setNewEmail: (email: string) => void;
  startTransition: TransitionStartFunction;
};

export default function DashboardSettingsAccount({
  newDisplayName,
  setNewDisplayName,
  newUsername,
  setNewUsername,
  newEmail,
  setNewEmail,
  startTransition,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const [saved, setSaved] = useState(false);

  const copyToClipboard = async () => {
    setCopyError("");

    try {
      await navigator.clipboard.writeText(
        `https://linkbloom-two.vercel.app/${newUsername}`,
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopyError("Kopieren fehlgeschlagen!");
      setTimeout(() => setCopyError(""), 1500);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorStatus("");
    setSaved(false);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const error = await updateProfile(formData);

      if (error) {
        setErrorStatus(error);
        return;
      }

      setSaved(true);
    });
  };

  return (
    <section className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <p className="text-lg font-fraunces font-semibold">Konto</p>
      <p className="font-light text-cream-4 text-sm mb-4">
        Deine Basisdaten und wie man dich findet.
      </p>

      <form id="profile-form" onSubmit={handleSubmit} method="POST">
        <div className="grid lg:grid-cols-2 gap-4 text-cream-5 mb-4">
          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="displayName" className="text-sm font-medium">
              Name
            </label>

            <input
              id="displayName"
              name="displayName"
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              className="lg:text-sm border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4 bg-cream-1"
              autoFocus
            />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              E-Mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="lg:text-sm border border-cream-3 rounded-xl py-3 px-3.5 outline-mint-4 bg-cream-1"
            />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <label htmlFor="username" className="text-sm font-medium">
              Deine Linkbloom-URL
            </label>

            <div className="relative flex lg:flex-row flex-col gap-1 w-full lg:text-sm border border-cream-3 rounded-xl py-3 px-3.5 bg-cream-1 focus-within:border-mint-4">
              <span className="select-none">linkbloom.co/</span>
              <input
                id="username"
                name="username"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="flex-1 outline-none pr-12"
              />

              {copied && (
                <div className="flex items-center absolute -right-2.5 bottom-9 bg-mint-4 text-white text-xs px-5.5 py-2 rounded-lg">
                  <p>Kopiert.</p>
                </div>
              )}
              {copyError && (
                <div className="flex items-center absolute -right-2.5 bottom-9 bg-red-500 text-white text-xs px-5.5 py-2 rounded-lg">
                  <p>Kopieren fehlgeschlagen.</p>
                </div>
              )}

              <button
                type="button"
                onClick={copyToClipboard}
                disabled={copied}
                className="flex items-center absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer disabled:cursor-not-allowed"
              >
                {copied ? <MdCheck /> : <MdContentCopy />}
              </button>
            </div>
          </div>
        </div>

        {errorStatus && <p className="text-red-500 text-sm">{errorStatus}</p>}
        {saved && (
          <p className="font-fraunces text-sm font-medium text-mint-4 mt-1">
            Änderungen erfolgreich gespeichert.
          </p>
        )}
      </form>

      <div className="mt-4 bg-cream-1 rounded-xl flex justify-between items-center py-3 px-3.5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-cream-6">Passwort</p>
          <p className="text-xs text-cream-4">Zuletzt geändert am ----</p>
        </div>
        <button
          type="button"
          className="text-sm font-medium hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 flex justify-center gap-2 border-2 border-cream-3 px-5.5 py-1.5 rounded-lg cursor-pointer"
        >
          Ändern
        </button>
      </div>
    </section>
  );
}
