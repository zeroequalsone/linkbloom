import { createLink } from "@/lib/links/link-actions";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LuX } from "react-icons/lu";

export default function CreateLinkModal({
  setModalOpen,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("https://");
  const [errorStatus, setErrorStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorStatus("");

    if (title.trim().length === 0) {
      setErrorStatus("Bitte gib einen gültigen Titel ein.");
      return;
    }

    try {
      new URL(url);
    } catch {
      setErrorStatus("Bitte gib eine gültige URL ein.");
      return;
    }

    const error = await createLink(title, url);

    if (error) {
      setErrorStatus(
        "Fehler beim Erstellen des Links. Bitte versuche es später erneut.",
      );
      return;
    }

    setModalOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="z-100 fixed inset-0 flex items-center justify-center backdrop-blur-xs p-8">
      <div className="bg-cream-1 p-6 max-w-md w-full rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <p className="font-fraunces font-semibold text-xl">Link hinzufügen</p>
          <div
            onClick={() => setModalOpen(false)}
            className="bg-cream-2 hover:bg-cream-3 active:bg-cream-3/50 hover:text-white p-2 rounded-full cursor-pointer"
          >
            <LuX />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4.5">
            <div className="flex flex-col">
              <label
                className="text-sm font-semibold text-cream-5 mb-1.5"
                htmlFor="title"
              >
                Titel
              </label>
              <input
                className="border border-cream-3 text-cream-5 rounded-xl p-3 outline-cream-4"
                id="title"
                type="text"
                placeholder="z. B. Portfolio ansehen"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-semibold text-cream-5 mb-1.5"
                htmlFor="url"
              >
                URL
              </label>
              <input
                className="border border-cream-3 text-cream-5 rounded-xl p-3 outline-cream-4"
                id="url"
                type="text"
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {errorStatus && <p className="text-red-500">{errorStatus}</p>}

            <div className="flex items-center justify-center gap-2.5">
              <button
                onClick={() => setModalOpen(false)}
                className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 hover:text-white border border-cream-4 text-cream-5 py-2.5 px-4.5 rounded-full text-sm font-medium cursor-pointer"
              >
                Abbrechen
              </button>

              <button
                type="submit"
                className="text-white hover:bg-mint-3 active:bg-mint-2 bg-mint-4 py-2.5 px-4.5 rounded-full text-sm font-medium cursor-pointer disabled:bg-mint-3/50 disabled:cursor-not-allowed disabled:hover:bg-mint-3/50 disabled:active:bg-mint-3/50"
                disabled={url.trim().length === 0 || title.trim().length === 0}
              >
                Link hinzufügen
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
