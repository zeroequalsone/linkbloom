import ViewUserPage from "./ViewUserPage";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center mb-7">
      <div>
        <p className="text-3xl font-fraunces font-semibold mb-1.5">
          Deine Links
        </p>
        <p className="font-light text-cream-4">
          Änderungen erscheinen sofort in der Vorschau.
        </p>
      </div>
      <ViewUserPage />
    </div>
  );
}
