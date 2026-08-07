import DashboardDesignContent from "@/components/(dashboard)/user/design/DashboardDesignContent";
import DashboardSidebar from "@/components/(dashboard)/user/links/DashboardSidebar";
import UserDashboard from "@/components/(dashboard)/user/links/UserDashboard";
import { getCurrentUser } from "@/lib/auth/auth-server";
import { redirect } from "next/navigation";

export default async function User() {
  const { user } = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserDashboard>
      <DashboardSidebar tab="Design" />

      <DashboardDesignContent />
    </UserDashboard>
  );
}
