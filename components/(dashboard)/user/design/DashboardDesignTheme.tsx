import { getCurrentUser } from "@/lib/supabase/server";
import ThemeButton from "./ThemeButton";

export default async function DashboardDesignTheme() {
  const { supabase, user } = await getCurrentUser();

  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("theme")
    .eq("user_id", user.id)
    .single();

  return (
    <section className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <p className="text-lg font-fraunces font-semibold">Theme</p>
      <p className="font-light text-cream-4 text-sm mb-4">
        Wähl eine Farbstimmung für deine Seite.
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
        <ThemeButton
          theme="bloom"
          name="Blüte"
          selected={profile?.theme === "bloom"}
          firstColor="bg-cream-1"
          secondColor="bg-cream-2"
          thirdColor="bg-cream-4"
        />

        <ThemeButton
          theme="meadow"
          name="Wiese"
          selected={profile?.theme === "meadow"}
          firstColor="bg-mint-1"
          secondColor="bg-cream-1"
          thirdColor="bg-mint-4"
        />

        <ThemeButton
          theme="caramel"
          name="Karamell"
          selected={profile?.theme === "caramel"}
          firstColor="bg-cream-2"
          secondColor="bg-cream-1"
          thirdColor="bg-cream-5"
        />

        <ThemeButton
          theme="morningDew"
          name="Morgentau"
          selected={profile?.theme === "morningDew"}
          firstColor="bg-cream-1"
          secondColor="bg-mint-1"
          thirdColor="bg-mint-3"
        />
      </div>
    </section>
  );
}
