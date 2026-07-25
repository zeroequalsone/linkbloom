import { FOOTER_LINKS } from "@/constants/navigation";
import Logo from "@/public/Logo.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex justify-center p-8 pb-0 bg-mint-1 text-mint-4 select-none">
      <div className="flex flex-col items-center gap-4 w-7xl">
        <div className="lg:flex-row flex flex-col items-center justify-between w-full gap-8">
          <div className="flex flex-col gap-2">
            <Link href={"/"}>
              <Logo className="h-16 w-fit" />
            </Link>
            <p className="text-center">
              Create beautiful link pages in minutes.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {FOOTER_LINKS.map((link) => (
              <div key={link.title} className="flex flex-col">
                <p className="text-xl font-medium">{link.title}</p>
                <div className="flex">
                  {link.links.map((detail) => (
                    <Link
                      key={detail.href}
                      href={detail.href}
                      className="hover:bg-mint-3/25 p-4 rounded-md"
                    >
                      {detail.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Linkbloom</p>
          <Link
            href={"https://github.com/zeroequalsone/linkbloom"}
            className="hover:text-mint-3/75"
          >
            Portfolio-Projekt von zeroequalsone
          </Link>
        </div>
      </div>
    </footer>
  );
}
