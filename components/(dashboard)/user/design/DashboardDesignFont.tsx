import { getCurrentUser } from "@/lib/auth/auth-server";
import FontButton from "./FontButton";

export default async function DashboardDesignFont() {
  const { user } = await getCurrentUser();
  const displayName = user?.user_metadata.display_name;

  return (
    <section className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <p className="text-lg font-fraunces font-semibold">Schriftart</p>
      <p className="font-light text-cream-4 text-sm mb-4">
        Bestimmt, wie Name und Bio auf deiner Seite aussehen.
      </p>
      <div className="grid grid-cols-3 gap-4">
        <FontButton
          font="font-fraunces font-semibold italic text-xl"
          description="Elegant"
          displayName={displayName}
        />
        <FontButton
          font="font-semibold text-xl"
          description="Klar"
          displayName={displayName}
        />
        <FontButton
          font="font-caveat font-bold text-3xl"
          description="Verspielt"
          displayName={displayName}
        />
      </div>
    </section>
  );
}
