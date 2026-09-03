import { getCurrentUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSettingsNotifications from "./DashboardSettingsNotifications";
import DashboardSettingsDelete from "./DashboardSettingsDelete";
import DashboardSettingsForm from "./DashboardSettingsForm";

export default async function DashboardDesignContent() {
  const { user } = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div className="w-full px-10 pt-8 pb-15">
      <DashboardSettingsForm user={user} />
      <DashboardSettingsNotifications />
      <DashboardSettingsDelete />
    </div>
  );
}
