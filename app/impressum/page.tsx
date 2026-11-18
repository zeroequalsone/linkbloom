export const metadata = {
  title: "Impressum",
};

export default function Impressum() {
  return (
    <div className="flex lg:max-w-7xl lg:mx-auto justify-center lg:p-24 p-8">
      <div className="flex flex-col gap-6">
        <h1 className="font-fraunces text-2xl sm:text-3xl font-semibold">
          Impressum
        </h1>

        <section className="space-y-2">
          <h2 className="font-fraunces text-lg sm:text-2xl font-semibold">
            Angaben gemäß § 5 DDG
          </h2>
          <p className="text-cream-4">
            Sebastian Götze
            <br />
            Donauschwabenstraße 16
            <br />
            89518 Heidenheim
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-fraunces text-lg sm:text-2xl font-semibold">
            Kontakt
          </h2>
          <p className="text-cream-4">E-Mail: goetze.seb@gmail.com</p>
        </section>

        <p className="text-cream-4 text-sm">
          Quelle:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.e-recht24.de"
            aria-label="eRecht24 öffnen (öffnet in neuem Tab)"
          >
            https://www.e-recht24.de
          </a>
        </p>
      </div>
    </div>
  );
}
