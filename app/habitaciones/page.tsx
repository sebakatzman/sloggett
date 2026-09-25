import type { Metadata } from "next";
import Link from "next/link";
import { houseRules, rooms } from "@/lib/rooms";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";

export const metadata: Metadata = {
  title: "Habitaciones",
  description: "Habitaciones doble, triple y familiar con baño privado y desayuno casero en Ushuaia.",
};

export default function HabitacionesPage() {
  return (
    <>
      <section className="container-x flex flex-col gap-5 py-16 lg:py-24">
        <span className="kicker">Habitaciones</span>
        <h1 className="h-display max-w-3xl text-4xl leading-[1.08] sm:text-5xl lg:text-[56px]">
          Siete habitaciones, tres formas de alojarse
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Todas con baño privado, calefacción, Wi-Fi y desayuno casero incluido. Elegí la que mejor
          se adapte a tu viaje.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {rooms.map((r) => (
            <a key={r.slug} href={`#${r.slug}`} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy hover:border-navy">
              {r.name.replace("Habitación ", "")} · {r.maxGuests} pers.
            </a>
          ))}
        </div>
      </section>

      {rooms.map((room, i) => (
        <section key={room.slug} id={room.slug} className={`scroll-mt-20 py-16 lg:py-24 ${i % 2 === 0 ? "bg-white" : ""}`}>
          <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={`flex flex-col gap-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <span className="kicker">{room.guests}</span>
              <h2 className="h-display text-4xl lg:text-[44px]">{room.name}</h2>
              <p className="text-lg leading-relaxed text-muted">{room.description}</p>
              <p className="flex items-center gap-2 font-medium text-ink">
                <Icon name="bed" className="text-gold-dark" /> {room.beds}
              </p>
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {room.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[15px] text-muted">
                    <Icon name="check" className="shrink-0 text-gold-dark" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6">
                <p className="text-sm text-muted">
                  desde <span className="font-serif text-3xl font-medium text-ink">USD {room.price}</span> / noche
                </p>
                <Link href={`/reservar?habitacion=${room.slug}`} className="btn btn-navy">
                  Reservar esta habitación <Icon name="arrow" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Photo label={room.photos[0].label} src={room.photos[0].src} className="col-span-2 h-72 sm:h-96" sizes="(min-width: 1024px) 50vw, 100vw" />
              <Photo label={room.photos[1].label} src={room.photos[1].src} className="h-36 sm:h-48" sizes="(min-width: 1024px) 25vw, 50vw" />
              <Photo label={room.photos[2].label} src={room.photos[2].src} className="h-36 sm:h-48" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
          </div>
        </section>
      ))}

      <section className="bg-navy text-cream">
        <div className="container-x py-16 lg:py-20">
          <h2 className="mb-10 font-serif text-3xl font-medium lg:text-4xl">Bueno saber antes de llegar</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {houseRules.map((r) => (
              <div key={r.title} className="border-t border-cream/15 pt-5">
                <p className="mb-2 font-semibold text-gold-light">{r.title}</p>
                <p className="text-[15px] leading-relaxed text-cream/75">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
