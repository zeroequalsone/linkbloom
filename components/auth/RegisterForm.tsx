"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Divider from "../ui/Divider";
import Checkbox from "../ui/Checkbox";
import Input from "../ui/Input";
import { FormEvent, useState } from "react";
import { signUp } from "@/lib/auth/auth-actions";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorStatus, setErrorStatus] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorStatus("");

    const error = await signUp(email, password, displayName, username);

    if (error) {
      setErrorStatus(error);
      return;
    }

    router.push("/dashboard");
  };

  const [passwordType, setPasswordType] = useState<"password" | "text">(
    "password",
  );

  return (
    <div className="grid lg:grid-cols-2 lg:gap-48 gap-8 lg:max-w-7xl lg:mx-auto">
      <div className="flex flex-col gap-6 p-8">
        <h1 className="text-4xl font-fraunces font-semibold">
          Leg los und <br /> lass es{" "}
          <span className="text-mint-4 font-medium italic">blühen.</span>
        </h1>

        <h2 className="text-cream-5 lg:text-lg lg:font-normal font-light lg:max-w-lg max-w-xs">
          Kostenlos registrieren und deine erste Linkbloom-Seite in wenigen
          Minuten live schalten.
        </h2>

        <div className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="text-cream-5">
            {/* Name */}
            <Input
              id="display-name"
              label="Name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={40}
              placeholder="Wie sollen wir dich nennen?"
              isSuccess={displayName.trim().length > 0}
              success="Ein wunderschöner Name."
              autoFocus
              required
            />

            <Input
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""),
                )
              }
              placeholder="Wie willst du genannt werden?"
              minLength={3}
              maxLength={20}
              pattern="^[a-z0-9]{3,20}$"
              title="Der Username darf nur Kleinbuchstaben und Zahlen enthalten."
              isSuccess={/^[a-z0-9]{3,20}$/.test(username)}
              success="Klasse, sehr einprägsam."
              required
            />

            {/* Email */}
            <Input
              id="email"
              label="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="du@beispiel.de"
              isSuccess={/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)}
              success="Super, wir können dich erreichen."
              required
            />

            {/* Passwort */}
            <Input
              id="password"
              label="Passwort"
              type={passwordType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mindestens 8 Zeichen (Groß-/Kleinbuchstaben, Zahl, Sonderzeichen)."
              minLength={8}
              isSuccess={/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(
                password,
              )}
              success="Perfekt, das sieht sicher aus."
              required
              rightElement={
                <button
                  type="button"
                  onClick={() =>
                    setPasswordType((prev) =>
                      prev === "password" ? "text" : "password",
                    )
                  }
                  className="text-cream-5 hover:text-mint-4 cursor-pointer"
                >
                  {passwordType === "password" ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              }
            />

            {errorStatus && (
              <p className="text-red-500 text-sm">{errorStatus}</p>
            )}

            {/* Zustimmen */}
            <Checkbox required>
              Ich stimme der{" "}
              <Link className="font-bold" href={"/datenschutz"}>
                Datenschutzerklärung
              </Link>{" "}
              und den{" "}
              <Link className="font-bold" href={"/agb"}>
                AGB
              </Link>{" "}
              zu
            </Checkbox>

            {/* Registrieren */}
            <button
              type="submit"
              className="hover:bg-mint-3 active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg w-full cursor-pointer"
            >
              Kostenlos registrieren
            </button>
          </form>

          {/* Divider */}
          {/* <Divider text="oder" /> */}

          {/* Google */}
          {/* <button className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 flex items-center justify-center gap-2 border-2 border-cream-3 px-5.5 py-1.5 rounded-lg w-full cursor-pointer">
            <FcGoogle size={24} />
            <span>Mit Google fortfahren</span>
          </button> */}

          <p className="font-light text-center">
            Schon ein Konto?{" "}
            <Link className="text-mint-4 font-medium" href={"/login"}>
              Einloggen
            </Link>
          </p>
        </div>
      </div>

      <div className="bg-mint-2 flex flex-col p-8 gap-8 justify-center items-center">
        <div className="bg-cream-1 p-5 pr-10 max-w-xs flex flex-col rounded-xl -rotate-2">
          <span className="text-xs mb-2">🌸🌸🌸🌸🌸</span>
          <p className="font-semibold font-fraunces italic text-cream-5 mb-4">
            "Endlich eine Seite, die aussieht wie ich - nicht wie eine Vorlage."
          </p>
          <div>
            <p className="text-sm font-semibold">Anastasija K.</p>
            <p className="text-xs text-cream-4">Illustratorin</p>
          </div>
        </div>
        <div className="bg-cream-1 p-5 pr-10 max-w-xs flex items-center gap-3 rounded-full rotate-1">
          <span className="text-xl mb-2">🌸</span>
          <div>
            <p className="text-lg font-semibold">12.400+</p>
            <p className="text-sm text-cream-4">Seiten zum Blühen gebracht</p>
          </div>
        </div>
      </div>
    </div>
  );
}
