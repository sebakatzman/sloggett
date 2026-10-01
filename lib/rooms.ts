export type RoomSlug = "doble" | "twin" | "suite";

// Categorías agrupadas a partir de las habitaciones cargadas en MiniHotel.
// Precios y disponibilidad se muestran solo en el motor de reservas.
export type Room = {
  slug: RoomSlug;
  name: string;
  shortName: string;
  guests: string;
  maxGuests: number;
  beds: string;
  options: string[];
  summary: string;
  description: string;
  features: string[];
  photos: { label: string; src?: string }[];
};

const common = ["Baño privado", "Desayuno continental incluido", "Wi-Fi", "Calefacción central"];

export const rooms: Room[] = [
  {
    slug: "doble",
    name: "Habitación doble",
    shortName: "Doble",
    guests: "Hasta 2 personas",
    maxGuests: 2,
    beds: "Cama matrimonial",
    options: ["Standard", "Vista a las montañas", "Vista al canal"],
    summary: "Para parejas, con vista a las montañas o al canal de Beagle.",
    description:
      "Pensada para parejas. Cama matrimonial, baño privado y, según la habitación, vista a las montañas o al canal de Beagle.",
    features: [...common, "Ropa blanca y toallas", "TV"],
    photos: [
      { label: "Habitación doble con cama matrimonial", src: "/images/habdobleysimple.jpeg" },
      { label: "Baño privado", src: "/images/baño.jpeg" },
      { label: "Toallas y amenities", src: "/images/toallajabon.jpeg" },
    ],
  },
  {
    slug: "twin",
    name: "Habitación twin",
    shortName: "Twin",
    guests: "Hasta 2 personas",
    maxGuests: 2,
    beds: "Dos camas individuales",
    options: ["Vista a las montañas", "Vista al canal"],
    summary: "Dos camas individuales, ideal para amigos o compañeros de viaje.",
    description:
      "Para dos viajeros que prefieren camas separadas. Dos camas individuales, baño privado y vista a las montañas o al canal.",
    features: [...common, "Ropa blanca y toallas", "Caja de seguridad"],
    photos: [
      { label: "Habitación twin con dos camas", src: "/images/hab1.jpeg" },
      { label: "Habitación twin", src: "/images/hab4.jpeg" },
      { label: "Caja de seguridad en la habitación", src: "/images/cajafuerte.jpeg" },
    ],
  },
  {
    slug: "suite",
    name: "Suite",
    shortName: "Suite",
    guests: "Hasta 2 personas",
    maxGuests: 2,
    beds: "Cama matrimonial",
    options: [],
    summary: "Nuestra categoría superior, para una estadía especial.",
    description:
      "La categoría superior de la hostería: cama matrimonial, baño privado y todo el confort para una estadía especial en Ushuaia.",
    features: [...common, "Ropa blanca y toallas", "TV"],
    photos: [
      { label: "Suite con cama matrimonial", src: "/images/habdobleysimple2.jpeg" },
      { label: "Suite", src: "/images/hab2.jpeg" },
      { label: "Baño de la suite", src: "/images/bañovertical.jpeg" },
    ],
  },
];

export const houseRules = [
  { title: "Check-in / Check-out", text: "Ingreso de 14 a 24 h con código de acceso · Salida hasta las 11 h" },
  { title: "Desayuno continental", text: "Incluido, todos los días de 7:30 a 10:30" },
  { title: "Reserva y cancelación", text: "Se confirma con una seña de una noche. Cancelación sin cargo hasta 10 días antes" },
  { title: "Menores", text: "Bebés menores de 2 años sin cargo. Desde los 2 años abonan como adultos" },
];
