
import DashboardSidebar from "@/components/(dashboard)/user/DashboardSidebar";
import UserDashboard from "@/components/(dashboard)/user/links/UserDashboard";
import DashboardSettingsContent from "@/components/(dashboard)/user/settings/DashboardSettingsContent";
import { getCurrentUser } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function User() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserDashboard>
      <DashboardSidebar tab="Einstellungen" />

      <DashboardSettingsContent />
    </UserDashboard>
  );
}
