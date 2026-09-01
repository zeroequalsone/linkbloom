import SettingCard from "./SettingCard";

export default function DashboardSettingsNotifications() {
  return (
    <section className="bg-cream-2 p-6 rounded-xl mb-5.5">
      <p className="text-lg font-fraunces font-semibold">Benachrichtigungen</p>
      <p className="font-light text-cream-4 text-sm mb-4">
        Wähl aus, worüber wir dich per E-Mail informieren.
      </p>
      <div className="relative grid lg:grid-cols-2 gap-4 text-cream-5 select-none">
        <div className="hover:opacity-100 active:opacity-100 transition-all duration-300 z-10 opacity-0 flex items-center justify-center absolute inset-0 rounded-xl">
          <p className="bg-cream-3 p-2 text-sm rounded-lg text-white">
            Wir arbeiten gerade daran. ✨
          </p>
        </div>
        <SettingCard
          title="Wöchentliche Zusammenfassung"
          description="Jeden Montag eine Übersicht deiner Statistiken"
        />

        <SettingCard
          title="Neue Follower"
          description="E-Mail, wenn dir jemand folgt"
        />

        <SettingCard
          title="Klick-Meilensteine"
          description="Benachrichtigung bei 100, 500, 1.000 Klicks"
        />

        <SettingCard
          title="Produkt-News"
          description="Neuigkeiten und Tipps von Linkbloom"
        />
      </div>
    </section>
  );
}
