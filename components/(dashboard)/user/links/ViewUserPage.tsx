import { getCurrentUser } from "@/lib/supabase/server";
import Link from "next/link";
import { FiEye } from "react-icons/fi";

export default async function ViewUserPage() {
  const { user } = await getCurrentUser();
  const username = user?.user_metadata.username;

  return (
    <Link
      href={`@${username}`}
      className="hover:bg-cream-3 hover:border-transparent active:bg-cream-3/50 hover:text-white flex items-center gap-2 border border-cream-4 text-cream-5 py-2.5 px-4.5 rounded-full text-sm font-medium cursor-pointer"
    >
      <FiEye />
      <span>Seite ansehen</span>
    </Link>
  );
}
