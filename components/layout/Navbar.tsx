import { getCurrentUser } from "@/lib/supabase/server";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const { user } = await getCurrentUser();

  return <NavbarClient user={user} />;
}
