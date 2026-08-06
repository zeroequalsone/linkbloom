import UserDashboard from "@/components/(dashboard)/user/UserDashboard";
import { getCurrentUser } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function User() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <UserDashboard />;
}
