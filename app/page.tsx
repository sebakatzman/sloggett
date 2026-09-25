import Link from "next/link";
import { rooms } from "@/lib/rooms";
import { site, whatsappLink } from "@/lib/site";
import { Icon, type IconName } from "@/components/Icon";
import { Photo } from "@/components/Photo";

const highlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "mountain", title: "Vista al canal", text: "Beagle y cordillera desde la casa" },
  { icon: "coffee", title: "Desayuno casero", text: "Incluido en todas las tarifas" },
  { icon: "pin", title: "A pasos del centro", text: "Caminando a la calle San Martín" },
  { icon: "users", title: "Para familias", text: "Habitaciones de hasta 4 personas" },
];

const seasons = [
  {
    icon: "sun" as IconName,
    name: "Verano",
    months: "Diciembre a marzo",
    photo: "Verano en el canal de Beagle",
    items: [
      "Navegación por el canal y la Isla de los Lobos",
      "Trekking a Laguna Esmeralda y Glaciar Martial",
      "Parque Nacional Tierra del Fuego",
      "Días largos, con luz hasta casi las 23 h",
    ],
  },
  {
    icon: "snow" as IconName,
    name: "Invierno",
    months: "Junio a septiembre",
    photo: "Invierno en Cerro Castor",
    items: [
      "Esquí y snowboard en Cerro Castor",
      "Trineos con perros y raquetas de nieve",
      "Centros invernales del Valle de Tierra Mayor",
      "Paisajes nevados desde la ventana",
    ],
  },
];

const familyPoints = [
  "Habitación familiar para 2 adultos y 2 chicos",
  "Cuna disponible a pedido, sin cargo",
  "Desayuno pensado también para los más chicos",
  "Te ayudamos a armar salidas aptas para toda la familia",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[760px] flex-col justify-between bg-ink">
        <Photo label="Vista del canal de Beagle desde la hostería" src="/images/vistaalmar.jpeg" dark rounded={false} preload className="absolute! inset-0" />
        <div className="absolute inset-0 bg-[rgba(16,36,46,.55)]" />

        <div className="container-x relative flex flex-col gap-6 pt-24 pb-10 lg:pt-[150px]">
          <span className="text-[13px] font-semibold tracking-[.18em] text-gold-light">
            USHUAIA · TIERRA DEL FUEGO
          </span>
          <h1 className="max-w-[760px] font-serif text-5xl leading-[1.02] font-medium tracking-[-.02em] text-cream sm:text-6xl lg:text-[80px]">
            Vistas al canal de Beagle, al fin del mundo
          </h1>
          <p className="max-w-[560px] text-lg leading-[1.55] text-cream/90 lg:text-xl">
            Siete habitaciones privadas con desayuno casero, a pasos del centro de Ushuaia. Ahora
            también pensada para familias.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <Link href="/reservar" className="btn btn-gold">
              Ver disponibilidad
            </Link>
            <a href={whatsappLink("Hola! Quería consultar por disponibilidad en la hostería.")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <Icon name="chat" /> Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div className="container-x relative pb-12">
          <form
            action="/reservar"
            className="grid gap-4 rounded-lg bg-cream p-5 shadow-[0_20px_50px_rgba(0,0,0,.25)] sm:grid-cols-2 lg:grid-cols-4 lg:items-end lg:px-6"
          >
            <label className="field">
              Llegada
              <input className="inp" type="date" name="llegada" />
            </label>
            <label className="field">
              Salida
              <input className="inp" type="date" name="salida" />
            </label>
            <label className="field">
              Huéspedes
              <select className="inp" name="huespedes" defaultValue="2-0">
                <option value="1-0">1 adulto</option>
                <option value="2-0">2 adultos</option>
                <option value="2-1">2 adultos · 1 niño</option>
                <option value="2-2">2 adultos · 2 niños</option>
                <option value="3-0">3 adultos</option>
                <option value="4-0">4 adultos</option>
              </select>
            </label>
            <button type="submit" className="btn btn-navy">
              Consultar disponibilidad <Icon name="arrow" />
            </button>
          </form>
        </div>
      </section>

      {/* Destacados */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-navy">
                <Icon name={h.icon} size={20} />
              </span>
              <div>
                <p className="font-semibold text-ink">{h.title}</p>
                <p className="text-sm text-muted">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nuestra casa */}
      <section className="container-x grid items-center gap-14 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <div className="flex flex-col gap-5">
          <span className="kicker">Nuestra casa</span>
          <h2 className="h-display text-4xl leading-[1.1] lg:text-[44px]">
            Una casa conocida en Ushuaia, en una nueva etapa
          </h2>
          <p className="text-lg leading-[1.7] text-muted">
            La Hostería Sloggett lleva años recibiendo viajeros en Gobernador Campos, con vistas al
            canal de Beagle y a la cordillera.
          </p>
          <p className="text-lg leading-[1.7] text-muted">
            Hoy vuelve a abrir con una gestión nueva y cercana. Mantenemos lo que siempre funcionó
            —la ubicación, el desayuno casero, el trato cálido— y sumamos habitaciones pensadas para
            familias.
          </p>
          <Link href="/habitaciones" className="link-underline mt-2">
            Conocé las habitaciones <Icon name="arrow" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Photo label="Mesa con vista al canal" src="/images/mesavistavertical.jpeg" className="h-[320px] sm:h-[440px]" sizes="(min-width: 1024px) 25vw, 50vw" />
          <div className="flex flex-col gap-4 pt-10 sm:pt-[60px]">
            <Photo label="Desayunador" src="/images/desayunadorpro.jpeg" className="h-[170px] sm:h-[240px]" sizes="(min-width: 1024px) 25vw, 50vw" />
            <Photo label="Recepción" src="/images/recepcion.jpeg" className="h-[130px] sm:h-[184px]" sizes="(min-width: 1024px) 25vw, 50vw" />
          </div>
        </div>
      </section>

      {/* Desayuno */}
      <section className="container-x pb-20 lg:pb-28">
        <div className="mb-10 flex flex-col gap-3.5">
          <span className="kicker">Desayuno casero</span>
          <h2 className="h-display text-4xl lg:text-[44px]">Empezá el día mirando el canal</h2>
          <p className="max-w-xl text-lg text-muted">
            Pan, dulces, fruta, yogur con granola, fiambres y café caliente, todas las mañanas en el
            desayunador.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <Photo label="Desayuno con vista" src="/images/personadesayunando.jpeg" className="col-span-2 h-64 lg:row-span-2 lg:h-full" sizes="(min-width: 1024px) 50vw, 100vw" />
          <Photo label="Mesa de desayuno" src="/images/desayuno.jpeg" className="h-44 lg:h-56" sizes="(min-width: 1024px) 25vw, 50vw" />
          <Photo label="Desayunador con vista" src="/images/desayunadorvista.jpeg" className="h-44 lg:h-56" sizes="(min-width: 1024px) 25vw, 50vw" />
          <Photo label="Mesas del desayunador" src="/images/desayunadorconmesas.jpeg" className="h-44 lg:h-56" sizes="(min-width: 1024px) 25vw, 50vw" />
          <Photo label="Medialunas caseras" src="/images/desayuno2.jpeg" className="h-44 lg:h-56" sizes="(min-width: 1024px) 25vw, 50vw" />
        </div>
      </section>

      {/* Habitaciones */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-3.5">
              <span className="kicker">Habitaciones</span>
              <h2 className="h-display text-4xl lg:text-[44px]">Tres formas de alojarse</h2>
              <p className="max-w-xl text-lg text-muted">
                Todas con baño privado, calefacción y desayuno incluido.
              </p>
            </div>
            <Link href="/habitaciones" className="btn btn-outline self-start md:self-auto">
              Ver todas las habitaciones
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.slug} className="card flex flex-col overflow-hidden bg-cream">
                <Photo label={room.photos[0].label} src={room.photos[0].src} rounded={false} className="h-60" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="h-display text-2xl">{room.name.replace("Habitación ", "")}</h3>
                    <span className="text-sm text-muted">{room.guests}</span>
                  </div>
                  <p className="text-[15px] leading-relaxed text-muted">{room.summary}</p>
                  <ul className="flex flex-col gap-2 text-sm text-ink">
                    <li className="flex items-center gap-2">
                      <Icon name="bed" className="text-gold-dark" /> {room.beds}
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="coffee" className="text-gold-dark" /> Desayuno incluido
                    </li>
                  </ul>
                  <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
                    <p className="text-sm text-muted">
                      desde
                      <span className="block font-serif text-2xl font-medium text-ink">USD {room.price}</span>
                      por noche
                    </p>
                    <Link href={`/habitaciones#${room.slug}`} className="btn btn-navy h-11 px-5">
                      Ver más
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Temporadas */}
      <section className="container-x py-20 lg:py-28">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-3.5 text-center">
          <span className="kicker">Cuándo venir</span>
          <h2 className="h-display text-4xl lg:text-[44px]">
            Ushuaia cambia de cara <em className="text-gold-dark">según el mes</em>
          </h2>
          <p className="text-lg text-muted">
            Estamos abiertos todo el año. Te contamos qué hacer en cada temporada.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {seasons.map((s) => (
            <article key={s.name} className="card overflow-hidden">
              <Photo label={s.photo} rounded={false} className="h-72" sizes="(min-width: 768px) 50vw, 100vw" />
              <div className="flex flex-col gap-4 p-7">
                <div className="flex items-center gap-3">
                  <Icon name={s.icon} size={22} className="text-gold-dark" />
                  <span className="text-sm font-semibold tracking-wide text-muted uppercase">{s.months}</span>
                </div>
                <h3 className="h-display text-3xl">{s.name}</h3>
                <ul className="flex flex-col gap-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[15px] text-muted">
                      <Icon name="check" className="mt-0.5 shrink-0 text-gold-dark" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Familias */}
      <section className="container-x pb-20 lg:pb-28">
        <div className="grid items-center gap-10 rounded-xl bg-gold p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div className="flex flex-col gap-4">
            <span className="text-[13px] font-semibold tracking-[.18em] text-ink/70 uppercase">Novedad</span>
            <h2 className="h-display text-4xl lg:text-5xl">Ahora, también para familias</h2>
            <p className="text-lg leading-relaxed text-ink/80">
              Sumamos habitaciones amplias para que viajen juntos, con todo lo necesario para los
              chicos y la tranquilidad de una casa chica.
            </p>
            <Link href="/habitaciones#familiar" className="btn btn-navy mt-2 self-start">
              Ver habitación familiar <Icon name="arrow" />
            </Link>
          </div>
          <ul className="flex flex-col gap-4">
            {familyPoints.map((p) => (
              <li key={p} className="flex items-center gap-4 rounded-lg bg-cream/40 p-4 text-ink">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink text-gold-light">
                  <Icon name="check" size={16} />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reseñas */}
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-3.5">
              <span className="kicker">Reseñas</span>
              <h2 className="h-display text-4xl lg:text-[44px]">Lo que dicen quienes se quedaron</h2>
            </div>
            <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
              Ver todas en Booking <Icon name="arrow" />
            </a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <figure key={n} className="card flex flex-col gap-5 bg-cream p-7">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" size={16} className="fill-current" />
                  ))}
                </div>
                <blockquote className="font-serif text-lg leading-relaxed text-ink">
                  «Acá va una reseña real de un huésped, tomada de Booking o Google.»
                </blockquote>
                <figcaption className="mt-auto text-sm text-muted">
                  Nombre del huésped · País · Booking
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Reserva directa */}
      <section className="bg-navy text-cream">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <div className="flex flex-col gap-5">
            <span className="text-[13px] font-semibold tracking-[.18em] text-gold-light uppercase">
              Reserva directa
            </span>
            <h2 className="font-serif text-4xl leading-tight font-medium lg:text-5xl">
              La mejor tarifa, sin intermediarios
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-cream/80">
              Reservando directo con nosotros pagás menos que en las plataformas y hablás con quien
              te va a recibir.
            </p>
            <div className="mt-2 flex flex-wrap gap-3.5">
              <Link href="/reservar" className="btn btn-gold">
                Reservar ahora
              </Link>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Icon name="chat" /> WhatsApp
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-cream/15 p-6">
              <p className="mb-1 text-sm text-cream/60">Booking y otras plataformas</p>
              <p className="text-lg">Tarifa + comisión de la plataforma</p>
            </div>
            <div className="rounded-lg border-2 border-gold bg-ink/40 p-6">
              <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-gold-light">
                <Icon name="shield" size={16} /> Reserva directa
              </p>
              <p className="text-lg">Mejor precio, trato directo y respuesta rápida</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
