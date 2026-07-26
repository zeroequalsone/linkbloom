import Link from "next/link";

type ButtonProps = {
  variant: 1 | 2;
  title: string;
  href: string;
};

export default function Button({ variant, title, href }: ButtonProps) {
  //   Green Variant
  if (variant === 1) {
    return (
      <Link
        href={href}
        className="hover:bg-mint-3 active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg"
      >
        {title}
      </Link>
    );
  }

  //   Brown Variant
  if (variant === 2) {
    return (
      <Link
        href={href}
        className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 flex justify-center gap-2 border-2 border-cream-3 px-5.5 py-1.5 rounded-lg"
      >
        {title}
      </Link>
    );
  }
}
