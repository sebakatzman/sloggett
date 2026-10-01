// TODO: reemplazar con los datos reales de la hostería
export const site = {
  name: "Hostería Sloggett",
  region: "Ushuaia · Tierra del Fuego",
  address: "Gobernador Campos, Ushuaia, Tierra del Fuego",
  whatsapp: "5492901521362",
  phoneDisplay: "+54 9 2901 52-1362",
  email: "reservas@hosteriasloggett.com",
  instagram: "hosteriasloggett",
  bookingUrl: "https://www.booking.com",
  mapQuery: "Hosteria Sloggett, Ushuaia",
};

export const bookingEngineOrigin = "https://frame2.hotelpms.io";

const bookingEnginePath =
  "/BookingFrameClient/hotel/08C8CCDB36E34BCF4AABD18FE4E2BCBB/e2d8af9e-82cf-4b24-ba19-fc7b08142f0e/book/rooms";

export type BookingQuery = {
  from?: string;
  to?: string;
  nAdults?: number;
  nChilds?: number;
  nBabies?: number;
};

// Motor de reservas de MiniHotel. Acepta from/to (AAAA-MM-DD), nAdults, nChilds, nBabies.
export function bookingEngineUrl(query: BookingQuery = {}) {
  const params = new URLSearchParams({ currency: "USD", language: "es-ES", rp: "" });
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== "") params.set(key, String(value));
  }
  return `${bookingEngineOrigin}${bookingEnginePath}?${params}`;
}

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/habitaciones", label: "Habitaciones" },
  { href: "/reservar", label: "Reservar" },
  { href: "/contacto", label: "Contacto" },
] as const;
