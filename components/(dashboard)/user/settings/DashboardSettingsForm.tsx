"use client";
import DashboardSettingsHeader from "./DashboardSettingsHeader";
import DashboardSettingsAccount from "./DashboardSettingsAccount";
import { User } from "@supabase/supabase-js";
import { useState, useTransition } from "react";

export default function DashboardSettingsForm({ user }: { user: User }) {
  const [newDisplayName, setNewDisplayName] = useState(
    user.user_metadata?.display_name ?? "",
  );
  const [newUsername, setNewUsername] = useState(
    user.user_metadata?.username ?? "",
  );
  const [newEmail, setNewEmail] = useState(user.email ?? "");

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <DashboardSettingsHeader
        user={user}
        newDisplayName={newDisplayName}
        newUsername={newUsername}
        newEmail={newEmail}
        isPending={isPending}
      />
      <DashboardSettingsAccount
        newDisplayName={newDisplayName}
        setNewDisplayName={setNewDisplayName}
        newUsername={newUsername}
        setNewUsername={setNewUsername}
        newEmail={newEmail}
        setNewEmail={setNewEmail}
        startTransition={startTransition}
      />
    </>
  );
}
