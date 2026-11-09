const MAX_TITLE_LENGTH = 50;
const MAX_URL_LENGTH = 2048;

// Gibt eine Fehlermeldung zurück, oder null wenn alles passt
export function validateLink(title: string, url: string): string | null {
  const cleanTitle = title.trim();
  if (cleanTitle.length === 0) return "Titel darf nicht leer sein.";
  if (cleanTitle.length > MAX_TITLE_LENGTH) {
    return `Titel darf höchstens ${MAX_TITLE_LENGTH} Zeichen haben.`;
  }
  if (url.length > MAX_URL_LENGTH) return "URL ist zu lang.";

  let parsed: URL;
  try {
    parsed = new URL(url.trim());
  } catch {
    return "Ungültige URL.";
  }

  // javascript:-URLs sind gültige URL-Objekte, deshalb Protokoll prüfen
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return "Nur http- und https-Links sind erlaubt.";
  }
  return null;
}