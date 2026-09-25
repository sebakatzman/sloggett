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
