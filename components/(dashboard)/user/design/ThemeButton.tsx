type ThemeButtonProps = {
  nameOfTheme: string;
  firstColor: string;
  secondColor: string;
  thirdColor: string;
};

export default function ThemeButton({
  nameOfTheme,
  firstColor,
  secondColor,
  thirdColor,
}: ThemeButtonProps) {
  return (
    <button className="flex flex-col gap-3 items-start p-3.5 bg-cream-1 rounded-xl border border-cream-3/25 hover:border-cream-4 outline-mint-4">
      <div className="flex gap-1.5">
        <div
          className={`${firstColor} size-5.5 border border-cream-3/25 rounded-lg`}
        ></div>
        <div
          className={`${secondColor} size-5.5 border border-cream-3/25 rounded-lg`}
        ></div>
        <div
          className={`${thirdColor} size-5.5 border border-cream-3/25 rounded-lg`}
        ></div>
      </div>
      <p className="text-sm font-semibold">{nameOfTheme}</p>
    </button>
  );
}
