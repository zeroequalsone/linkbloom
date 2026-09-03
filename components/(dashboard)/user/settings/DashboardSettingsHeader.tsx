import { User } from "@supabase/supabase-js";
import SaveButton from "./SaveButton";

type Props = {
  user: User;
  newDisplayName: string;
  newUsername: string;
  newEmail: string;
  isPending: boolean;
};

export default function DashboardSettingsHeader({
  user,
  newDisplayName,
  newUsername,
  newEmail,
  isPending,
}: Props) {
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
      <SaveButton
        user={user}
        newDisplayName={newDisplayName}
        newUsername={newUsername}
        newEmail={newEmail}
        isPending={isPending}
      />
    </div>
  );
}
