import { User } from "@supabase/supabase-js";

type Props = {
  user: User;
  newDisplayName: string;
  newUsername: string;
  newEmail: string;
  isPending: boolean;
};

export default function SaveButton({
  user,
  newDisplayName,
  newUsername,
  newEmail,
  isPending,
}: Props) {
  const currentDisplayName = user.user_metadata?.display_name ?? "";
  const currentUsername = user.user_metadata?.username ?? "";
  const currentEmail = user.email ?? "";

  return (
    <button
      type="submit"
      form="profile-form"
      disabled={
        isPending ||
        (newDisplayName === currentDisplayName &&
          newUsername === currentUsername &&
          newEmail === currentEmail)
      }
      className="hover:bg-mint-3 active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-mint-4 disabled:active:bg-mint-4"
    >
      {isPending ? "Speichern..." : "Speichern"}
    </button>
  );
}
