import type { Metadata } from "next";
import { Fraunces, Poppins, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteDescription =
  "LinkBloom ist dein Link-in-Bio: Erstelle in wenigen Minuten deine persönliche Seite, sammle alle wichtigen Links an einem Ort und teile sie mit einem einzigen Link.";

export const metadata: Metadata = {
  title: {
    default: "LinkBloom | Alle deine Links an einem Ort",
    template: "%s | LinkBloom",
  },
  description: siteDescription,
  keywords: [
    "Link in Bio",
    "Link-in-Bio Tool",
    "Linkseite erstellen",
    "Links teilen",
    "Profilseite",
    "Social Media Links",
    "Instagram Bio Link",
    "TikTok Bio Link",
    "Creator",
  ],
  authors: [{ name: "zeroequalsone", url: "https://github.com/zeroequalsone" }],
  openGraph: {
    title: "LinkBloom | Alle deine Links an einem Ort",
    description: siteDescription,
    siteName: "LinkBloom",
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${poppins.className} ${poppins.variable} ${fraunces.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream-1 text-cream-6">
        <Navbar />
        <main className="mt-34">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
