import { getCurrentUser } from "@/lib/auth/auth-server";
import FontButton from "./FontButton";

export default async function DashboardDesignFont() {
  const { supabase, user } = await getCurrentUser();

  if (!user) return;

  const displayName = user?.user_metadata.display_name;

  const { data: profile } = await supabase
    .from("profiles")
    .select("font")
    .eq("user_id", user.id)
    .single();

  return (
    <section className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <p className="text-lg font-fraunces font-semibold">Schriftart</p>
      <p className="font-light text-cream-4 text-sm mb-4">
        Bestimmt, wie Name und Bio auf deiner Seite aussehen.
      </p>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
        <FontButton
          font="elegant"
          name="Elegant"
          displayName={displayName}
          selected={profile?.font === "elegant"}
          style="font-fraunces font-semibold italic lg:text-xl"
        />

        <FontButton
          font="clear"
          name="Klar"
          displayName={displayName}
          selected={profile?.font === "clear"}
          style="font-semibold lg:text-xl"
        />

        <FontButton
          font="playful"
          name="Verspielt"
          displayName={displayName}
          selected={profile?.font === "playful"}
          style="font-caveat font-bold lg:text-3xl text-xl"
        />
      </div>
    </section>
  );
}
