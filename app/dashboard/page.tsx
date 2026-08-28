import DashboardSidebar from "@/components/(dashboard)/user/DashboardSidebar";
import DashboardContent from "@/components/(dashboard)/user/links/DashboardContent";
import UserDashboard from "@/components/(dashboard)/user/links/UserDashboard";
import { getCurrentUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function User() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserDashboard>
      <DashboardSidebar tab="Links" />

      <DashboardContent />
    </UserDashboard>
  );
}
