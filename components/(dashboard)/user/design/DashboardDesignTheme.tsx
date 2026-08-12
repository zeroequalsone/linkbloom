import ThemeButton from "./ThemeButton";

export default function DashboardDesignTheme() {
  return (
    <section className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <p className="text-lg font-fraunces font-semibold">Theme</p>
      <p className="font-light text-cream-4 text-sm mb-4">
        Wähl eine Farbstimmung für deine Seite.
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <ThemeButton
          nameOfTheme="Blüte"
          firstColor="bg-cream-1"
          secondColor="bg-cream-2"
          thirdColor="bg-cream-4"
        />

        <ThemeButton
          nameOfTheme="Wiese"
          firstColor="bg-mint-1"
          secondColor="bg-cream-1"
          thirdColor="bg-mint-4"
        />

        <ThemeButton
          nameOfTheme="Karamell"
          firstColor="bg-cream-2"
          secondColor="bg-cream-1"
          thirdColor="bg-cream-5"
        />

        <ThemeButton
          nameOfTheme="Morgentau"
          firstColor="bg-cream-1"
          secondColor="bg-mint-1"
          thirdColor="bg-mint-3"
        />
      </div>
    </section>
  );
}
