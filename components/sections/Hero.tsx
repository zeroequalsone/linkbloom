import { LuArrowRight } from "react-icons/lu";

export default function Hero() {
  return (
    <div className="lg:max-w-7xl lg:w-full lg:mx-auto flex lg:flex-row flex-col items-center justify-between p-8 gap-12">
      <div>
        <h1 className="lg:text-start text-center lg:text-6xl text-4xl font-fraunces font-semibold mb-6">
          Ein Link. <br /> Und er{" "}
          <span className="text-mint-4 font-medium italic">blüht auf.</span>
        </h1>
        <h2 className="text-cream-5 font-light text-lg mb-8 lg:max-w-lg max-w-xs lg:text-start text-center">
          Portfolio, Shop, Playlist, Newsletter — alles, was zu dir gehört, auf
          einer ästhetischen kompakten Seite. Angelegt in ein paar Minuten, ganz
          ohne Code.
        </h2>
        <div className="flex lg:flex-row flex-col gap-2 lg:items-center border border-cream-3 rounded-xl lg:p-1.5 p-2.5 lg:max-w-xl mb-4">
          <span className="font-medium lg:pl-3 lg:pr-1 p-1 pb-0">
            linkbloom.co/
          </span>
          <input
            type="text"
            placeholder="deinname"
            className="border-2 border-none outline-mint-4 rounded-lg px-1 py-2 flex-1"
          />
          <button className="hover:bg-mint-3 cursor-pointer active:bg-mint-2 flex justify-center gap-2 bg-mint-4 text-white px-5.5 py-2 rounded-lg">
            <span>Bloom erstellen</span>
            <LuArrowRight size={24} />
          </button>
        </div>
        <p className="text-cream-4 text-sm">
          Kostenlos starten · Keine Kreditkarte · Jederzeit kündbar
        </p>
      </div>
      <div>
        <div className="flex items-center justify-center border-8 rounded-4xl w-2xs h-108">
          Bild kommt bald...
        </div>
      </div>
    </div>
  );
}
