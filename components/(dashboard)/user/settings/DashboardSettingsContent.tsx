import { getCurrentUser } from "@/lib/supabase/server";
import DashboardSettingsHeader from "./DashboardSettingsHeader";

export default async function DashboardDesignContent() {
  const { user } = await getCurrentUser();

  if (!user) return;

  return (
    <div className="w-full px-10 pt-8 pb-15">
      <DashboardSettingsHeader user={user} />
    </div>
  );
}
