import { getCurrentUser } from "@/lib/auth/auth-server";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const { user } = await getCurrentUser();

  return <NavbarClient user={user} />;
}
