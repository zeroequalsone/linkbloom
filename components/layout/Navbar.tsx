"use client";
import { NAV_LINKS } from "@/constants/navigation";
import Logo from "@/public/Logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { LuMenu, LuX } from "react-icons/lu";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/supabase-client";
import { logOut } from "@/lib/auth/auth-actions";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="p-8">
      <div className="rounded-xl p-4 lg:px-10 bg-cream-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href={"/"}>
              <Logo className="h-8 w-32" />
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
            className="lg:hidden cursor-pointer hover:bg-cream-3/25 p-4 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <>
            <div className="lg:hidden flex flex-col text-center mb-4">
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
            <div className="lg:hidden flex flex-col gap-4 items-center">
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
          </>
        )}
      </div>
    </header>
  );
}
