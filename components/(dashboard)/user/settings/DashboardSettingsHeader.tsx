import { User } from "@supabase/supabase-js";
import SaveButton from "./SaveButton";

export default function DashboardSettingsHeader({ user }: { user: User }) {
  return (
    <div className="flex justify-between items-center mb-7">
      <div>
        <p className="text-3xl font-fraunces font-semibold mb-1.5">
          Einstellungen
        </p>
        <p className="font-light text-cream-4 text-sm">
          Verwalte dein Konto, Benachrichtigungen und deinen Plan.
        </p>
      </div>
      <SaveButton />
    </div>
  );
}
