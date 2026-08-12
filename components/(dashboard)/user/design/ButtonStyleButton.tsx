type ButtonStyleButtonProps = {
  variant: 1 | 2 | 3;
  description: string;
};

export default function ButtonStyleButton({
  variant,
  description,
}: ButtonStyleButtonProps) {
  return (
    <button className="hover:border-cream-4 space-y-2 items-center p-3.5 bg-cream-1 rounded-xl border border-cream-3/25 outline-mint-4">
      {variant === 1 && (
        <div className="hover:bg-mint-3 active:bg-mint-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg cursor-pointer">
          Portfolio ansehen
        </div>
      )}
      {variant === 2 && (
        <div className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 border-2 border-cream-3 px-5.5 py-1.5 rounded-lg cursor-pointer">
          Portfolio ansehen
        </div>
      )}
      {variant === 3 && (
        <div className="text-cream-5 font-medium px-5.5 py-2 rounded-xl cursor-pointer hover:text-cream-6 bg-cream-3/25">
          Portfolio ansehen
        </div>
      )}
      <p className="text-xs font-semibold text-cream-5">{description}</p>
    </button>
  );
}
