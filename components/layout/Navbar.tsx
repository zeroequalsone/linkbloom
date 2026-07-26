"use client";
import { NAV_LINKS } from "@/constants/navigation";
import Logo from "@/public/Logo.svg";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Button from "../ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <header className="p-8">
      <div className="rounded-xl p-4 lg:px-10 bg-cream-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href={"/"}>
              <Logo className="h-8 w-fit" />
            </Link>
            <div className="lg:block hidden">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:bg-cream-3/25 p-4 rounded-md text-lg"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:flex hidden gap-4 items-center">
            <Button variant={2} title="Einloggen" href="login" />
            <Button variant={1} title="Registrieren" href="/register" />
          </div>
          <button
            className="lg:hidden hover:cursor-pointer hover:bg-cream-3/25 p-4 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
        {mobileOpen && (
          <>
            <div className="lg:hidden flex flex-col text-center mb-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:bg-cream-3/25 p-4 rounded-md text-lg"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="lg:hidden flex flex-col gap-4 items-center">
              <Button variant={2} title="Einloggen" href="login" />
              <Button variant={1} title="Registrieren" href="/register" />
            </div>
          </>
        )}
      </div>
    </header>
  );
}
