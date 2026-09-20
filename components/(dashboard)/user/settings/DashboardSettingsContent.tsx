import { getCurrentUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardSettingsNotifications from "./DashboardSettingsNotifications";
import DashboardSettingsDelete from "./DashboardSettingsDelete";
import DashboardSettingsForm from "./DashboardSettingsForm";

export default async function DashboardDesignContent() {
  const { user, supabase } = await getCurrentUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="w-full px-10 pt-8 pb-15">
      <DashboardSettingsForm user={user} profile={profile} />
      <DashboardSettingsNotifications />
      <DashboardSettingsDelete />
    </div>
  );
}
