import { getCurrentUser } from "@/lib/supabase/server";
import ButtonStyleButton from "./ButtonStyleButton";

export default async function DashboardDesignButtonStyle() {
  const { supabase, user } = await getCurrentUser();

  if (!user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("button_style")
    .eq("user_id", user.id)
    .single();

  return (
    <div className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <div>
        <p className="text-lg font-fraunces font-semibold">Button-Stil</p>
        <p className="font-light text-cream-4 text-sm mb-4">
          So sehen deine Link-Buttons für Besucher aus.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
        <ButtonStyleButton
          buttonStyle="filled"
          name="Ausgefüllt"
          selected={profile?.button_style === "filled"}
        />
        <ButtonStyleButton
          buttonStyle="outlined"
          name="Umrandet"
          selected={profile?.button_style === "outlined"}
        />
        <ButtonStyleButton
          buttonStyle="soft"
          name="Soft"
          selected={profile?.button_style === "soft"}
        />
      </div>
    </div>
  );
}
