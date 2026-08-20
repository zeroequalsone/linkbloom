import { deleteLink } from "@/lib/links/link-actions";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { LuX } from "react-icons/lu";

export default function DeleteLinkModal({
  linkId,
  title,
  setModalOpen,
}: {
  linkId: string;
  title: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [errorStatus, setErrorStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorStatus("");

    const error = await deleteLink(linkId);

    if (error) {
      setErrorStatus(
        "Fehler beim Löschen des Links. Bitte versuche es später erneut.",
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
          <p className="font-fraunces font-semibold text-xl">
            Link wirklich löschen?
          </p>
          <div
            onClick={() => setModalOpen(false)}
            className="bg-cream-2 hover:bg-cream-3 active:bg-cream-3/50 hover:text-white p-2 rounded-full cursor-pointer"
          >
            <LuX />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4.5">
            <p className="text-center">
              Möchtest du den Link{" "}
              <b className="text-cream-5 font-fraunces">”</b>
              <span className="font-fraunces font-bold text-mint-4">
                {title}
              </span>
              <b className="text-cream-5 font-fraunces">”</b> wirklich
              unwiderruflich löschen?
            </p>

            <div className="flex items-center justify-center gap-2.5">
              <button
                onClick={() => setModalOpen(false)}
                className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 hover:text-white border border-cream-4 text-cream-5 py-2.5 px-4.5 rounded-full text-sm font-medium cursor-pointer"
              >
                Abbrechen
              </button>

              <button
                type="submit"
                className="text-white hover:bg-red-600 active:bg-red-500 bg-red-700 py-2.5 px-4.5 rounded-full text-sm font-medium cursor-pointer"
              >
                Löschen
              </button>
            </div>

            {errorStatus && <p className="text-red-500">{errorStatus}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
