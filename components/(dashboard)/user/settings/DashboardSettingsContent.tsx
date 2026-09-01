import { getCurrentUser } from "@/lib/supabase/server";
import DashboardSettingsHeader from "./DashboardSettingsHeader";
import { redirect } from "next/navigation";
import DashboardSettingsNotifications from "./DashboardSettingsNotifications";
import DashboardSettingsDelete from "./DashboardSettingsDelete";

export default async function DashboardDesignContent() {
  const { user } = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="w-full px-10 pt-8 pb-15">
      <DashboardSettingsHeader user={user} />
      <DashboardSettingsNotifications />
      <DashboardSettingsDelete />
    </div>
  );
}
