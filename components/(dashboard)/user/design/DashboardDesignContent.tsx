import DashboardDesignButtonStyle from "./DashboardDesignButtonStyle";
import DashboardDesignFont from "./DashboardDesignFont";
import DashboardDesignHeader from "./DashboardDesignHeader";
import DashboardDesignTheme from "./DashboardDesignTheme";

export default function DashboardDesignContent() {
  return (
    <div className="w-full px-10 pt-8 pb-15">
      <DashboardDesignHeader />
      <DashboardDesignTheme />
      <DashboardDesignFont />
      <DashboardDesignButtonStyle />
    </div>
  );
}
