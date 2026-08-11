import ButtonStyleButton from "./ButtonStyleButton";

export default function DashboardDesignButtonStyle() {
  return (
    <div className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <div>
        <p className="text-lg font-fraunces font-semibold">Button-Stil</p>
        <p className="font-light text-cream-4 text-sm mb-4">
          So sehen deine Link-Buttons für Besucher aus.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <ButtonStyleButton variant={1} description="Ausgefüllt" />
        <ButtonStyleButton variant={2} description="Umrandet" />
        <ButtonStyleButton variant={3} description="Soft" />
      </div>
    </div>
  );
}
