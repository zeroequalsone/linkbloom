import DashboardSidebar from "./DashboardSidebar";
import DashboardContent from "./DashboardContent";

export default function UserDashboard() {
  return (
    <div className="flex max-w-7xl mx-auto w-full">
      <DashboardSidebar />

      <DashboardContent />
    </div>
  );
}
