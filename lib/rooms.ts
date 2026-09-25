export type RoomSlug = "doble" | "triple" | "familiar";

export type Room = {
  slug: RoomSlug;
  name: string;
  guests: string;
  maxGuests: number;
  beds: string;
  summary: string;
  description: string;
  features: string[];
  // TODO: precios de ejemplo, reemplazar por las tarifas reales
  price: number;
  photos: { label: string; src?: string }[];
};

const common = ["Baño privado", "Desayuno casero incluido", "Wi-Fi", "Calefacción central"];

export const rooms: Room[] = [
  {
    slug: "doble",
    name: "Habitación doble",
    guests: "Hasta 2 personas",
    maxGuests: 2,
    beds: "Cama matrimonial o dos individuales",
    summary: "Ideal para parejas o dos amigos que viajan juntos.",
    description:
      "Para parejas o dos viajeros. Cama matrimonial o dos individuales, baño privado y vista a la ciudad o a la montaña.",
    features: [...common, "Ropa blanca y toallas", "TV"],
    price: 80,
    photos: [
      { label: "Habitación doble con cama matrimonial", src: "/images/habdobleysimple2.jpeg" },
      { label: "Habitación doble con dos camas", src: "/images/hab1.jpeg" },
      { label: "Baño privado", src: "/images/baño.jpeg" },
    ],
  },
  {
    slug: "triple",
    name: "Habitación triple",
    guests: "Hasta 3 personas",
    maxGuests: 3,
    beds: "Matrimonial + individual o tres individuales",
    summary: "Para grupos chicos o una pareja con un hijo.",
    description:
      "Para grupos de amigos o una pareja con un hijo. Tres camas individuales o una matrimonial más una individual.",
    features: [...common, "Ropa blanca y toallas", "Placard amplio"],
    price: 100,
    photos: [
      { label: "Habitación triple", src: "/images/hab2.jpeg" },
      { label: "Habitación triple, matrimonial e individual", src: "/images/habdobleysimple.jpeg" },
      { label: "Toallas y amenities", src: "/images/toallajabon.jpeg" },
    ],
  },
  {
    slug: "familiar",
    name: "Habitación familiar",
    guests: "Hasta 4 personas",
    maxGuests: 4,
    beds: "Matrimonial + dos individuales",
    summary: "Nueva: espacio para toda la familia, con lugar para cuna.",
    description:
      "Nuestra propuesta nueva. Espacio para dos adultos y dos chicos, con cama matrimonial, dos individuales y lugar para cuna.",
    features: [...common, "Cuna a pedido", "Espacio extra para equipaje"],
    price: 130,
    photos: [
      { label: "Habitación familiar", src: "/images/hab4.jpeg" },
      { label: "Caja fuerte en la habitación", src: "/images/cajafuerte.jpeg" },
      { label: "Baño de la habitación familiar", src: "/images/bañovertical.jpeg" },
    ],
  },
];

export const houseRules = [
  { title: "Check-in / Check-out", text: "Ingreso desde las 14:00 · Salida hasta las 10:00" },
  { title: "Desayuno", text: "Casero, todos los días de 7:30 a 10:30" },
  { title: "Cancelación", text: "Sin cargo hasta 7 días antes de la llegada" },
  { title: "Estacionamiento", text: "Lugar en la calle, frente a la hostería" },
];
