import DashboardHeader from "./DashboardHeader";
import DashboardLinks from "./DashboardLinks";
import DashboardStats from "./DashboardStats";

export default function DashboardContent() {
  return (
    <div className="w-full px-10 pt-8 pb-15">
      <DashboardHeader />

      <DashboardStats />

      <DashboardLinks />
    </div>
  );
}
