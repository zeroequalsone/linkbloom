"use client";
import { NAV_LINKS } from "@/constants/navigation";
import Logo from "@/public/Logo.svg";
import Link from "next/link";
import { useState } from "react";
import Button from "../ui/Button";
import { logOut } from "@/lib/auth/auth-actions";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { HiOutlineMenuAlt4, HiOutlineX } from "react-icons/hi";

export default function Navbar({ user }: { user: User | null }) {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-8 z-50 w-full max-w-7xl mx-auto select-none">
      <div className="absolute top-0 left-0 lg:px-0 px-8 w-full">
        <div className="bg-cream-2 rounded-lg">
          <div className="flex items-center justify-between p-4 lg:px-10">
            <div className="flex items-center gap-12">
              <Link href={"/"}>
                <Logo
                  className="h-8 w-32"
                  onClick={() => setMobileOpen(false)}
                />
              </Link>
              <div className="lg:block hidden">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:bg-cream-3/25 p-4 rounded-md"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="lg:flex hidden gap-4 items-center">
              {user ? (
                <>
                  <Button variant={2} title="Dashboard" href="/dashboard" />
                  <button
                    className="hover:bg-mint-3 active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg cursor-pointer"
                    onClick={handleLogout}
                  >
                    Ausloggen
                  </button>
                </>
              ) : (
                <>
                  <Button variant={2} title="Einloggen" href="login" />
                  <Button variant={1} title="Registrieren" href="/register" />
                </>
              )}
            </div>
            <button
              className="lg:hidden relative cursor-pointer"
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <HiOutlineMenuAlt4
                size={24}
                className={`transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-90 scale-0 opacity-0"
                    : "rotate-0 scale-100 opacity-100"
                }`}
              />

              <HiOutlineX
                size={24}
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-0 opacity-0"
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <>
              <div className="lg:hidden flex flex-col text-center p-4 gap-4 mb-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:bg-cream-3/25 py-2 rounded-md"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
              <div className="lg:hidden flex flex-col gap-4 items-center p-4">
                {user ? (
                  <>
                    <Button
                      variant={2}
                      title="Dashboard"
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                    />
                    <button
                      className="hover:bg-mint-3 active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg cursor-pointer"
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                    >
                      Ausloggen
                    </button>
                  </>
                ) : (
                  <>
                    <Button
                      variant={2}
                      title="Einloggen"
                      href="login"
                      onClick={() => setMobileOpen(false)}
                    />
                    <Button
                      variant={1}
                      title="Registrieren"
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
