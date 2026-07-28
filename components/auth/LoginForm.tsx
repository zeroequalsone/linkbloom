import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Divider from "../ui/Divider";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";

export default function LoginForm() {
  return (
    <div className="grid lg:grid-cols-2 lg:gap-48 gap-8 lg:max-w-7xl lg:mx-auto">
      <div className="flex flex-col gap-6 p-8">
        <h1 className="text-4xl font-fraunces font-semibold">
          Schön, dich <br /> wieder
          <span className="text-mint-4 font-medium italic">zusehen.</span>
        </h1>

        <h2 className="text-cream-5 lg:text-lg lg:font-normal font-light lg:max-w-lg max-w-xs">
          Logg dich ein und mach da weiter, wo du aufgehört hast.
        </h2>

        <div className="flex flex-col gap-6">
          <form className="text-cream-5">
            {/* Email */}
            <Input
              label="E-Mail"
              type="text"
              placeholder="du@beispiel.de"
              autoFocus={true}
            />

            {/* Passwort */}
            <Input label="Passwort" type="password" placeholder="••••••••" />

            <div className="flex items-center justify-between">
              {/* Zustimmen */}
              <Checkbox>Angemeldet bleiben</Checkbox>
              <Link
                className="text-mint-4 font-medium text-sm"
                href={"/forgot-password"}
              >
                Passwort vergessen?
              </Link>
            </div>

            {/* Einloggen */}
            <button className="hover:bg-mint-3 active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg w-full cursor-pointer">
              Einloggen
            </button>
          </form>

          {/* Divider */}
          <Divider text="oder" />

          {/* Google */}
          <button className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 flex items-center justify-center gap-2 border-2 border-cream-3 px-5.5 py-1.5 rounded-lg w-full cursor-pointer">
            <FcGoogle size={24} />
            <span>Mit Google fortfahren</span>
          </button>

          <p className="font-light text-center">
            Schon ein Konto?{" "}
            <Link className="text-mint-4 font-medium" href={"/register"}>
              Registrieren
            </Link>
          </p>
        </div>
      </div>

      <div className="bg-mint-2 flex flex-col p-8 gap-8 justify-center items-center">
        <div className="bg-cream-1 p-5 pr-10 max-w-xs flex flex-col rounded-xl -rotate-2">
          <span className="text-xs mb-2">🌸🌸🌸🌸🌸</span>
          <p className="font-semibold font-fraunces italic text-cream-5 mb-4">
            "Mein liebster Moment am Tag: sehen, wer heute alles vorbeigeschaut
            hat."
          </p>
          <div>
            <p className="text-sm font-semibold">Jonas R.</p>
            <p className="text-xs text-cream-4">Fotograf</p>
          </div>
        </div>
        <div className="bg-cream-1 p-5 pr-10 max-w-xs flex items-center gap-3 rounded-full rotate-1">
          <span className="text-xl mb-2">🌸</span>
          <div>
            <p className="text-lg font-semibold font-fraunces">3,2 Mio.</p>
            <p className="text-sm text-cream-4">Klicks im letzten Monat</p>
          </div>
        </div>
      </div>
    </div>
  );
}
