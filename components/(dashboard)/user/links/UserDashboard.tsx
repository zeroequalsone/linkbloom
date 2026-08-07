import { ReactNode } from "react";

export default function UserDashboard({ children }: { children: ReactNode }) {
  return <div className="flex max-w-7xl mx-auto w-full">{children}</div>;
}
