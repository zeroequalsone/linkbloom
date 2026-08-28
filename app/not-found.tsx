import Button from "@/components/ui/Button";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center lg:p-24 p-8">
      <p className="absolute lg:text-[24rem] text-[10rem] font-fraunces font-extrabold text-cream-2 -z-10">
        404
      </p>
      <Image
        src={"/spider-plant.png"}
        alt="Golden Pothos Plant Image"
        className="mb-4"
        height={96}
        width={96}
        loading="eager"
        priority
      />
      <p className="font-fraunces text-3xl font-semibold w-xs text-center">
        Hier ist noch nichts gewachsen.
      </p>
      <p className="text-cream-4 w-xs text-center mb-4">
        Die Seite gibt es bei uns nicht — entweder ein Tippfehler, oder hier hat
        noch niemand gepflanzt.
      </p>
      <Button variant={1} title="Account erstellen" href="/register" />
      <Button variant={2} title="Zurück zur Startseite" href="/" />
    </div>
  );
}
