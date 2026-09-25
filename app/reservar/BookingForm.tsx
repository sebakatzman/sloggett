"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { rooms, type RoomSlug } from "@/lib/rooms";
import { site, whatsappLink } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { Photo } from "@/components/Photo";

type Initial = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room?: string;
};

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const diff = (Date.parse(b) - Date.parse(a)) / 86_400_000;
  return Number.isFinite(diff) && diff > 0 ? Math.round(diff) : 0;
}

function formatDate(value: string) {
  if (!value) return "—";
  const [y, m, d] = value.split("-");
  return `${d}/${m}/${y}`;
}

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="card p-6 sm:p-7">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-navy text-sm font-semibold text-cream">{n}</span>
        <h2 className="h-display text-2xl">{title}</h2>
      </div>
      {children}
    </fieldset>
  );
}

function Counter({
  label,
  hint,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium text-ink">{label}</p>
        <p className="text-sm text-muted">{hint}</p>
      </div>
      <div className="flex items-center gap-4">
        <button type="button" aria-label={`Restar ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)} className="grid size-9 place-items-center rounded-full border border-line text-navy disabled:opacity-40">
          <Icon name="minus" size={16} />
        </button>
        <span className="w-4 text-center font-semibold">{value}</span>
        <button type="button" aria-label={`Sumar ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)} className="grid size-9 place-items-center rounded-full border border-line text-navy disabled:opacity-40">
          <Icon name="plus" size={16} />
        </button>
      </div>
    </div>
  );
}

export function BookingForm({ initial }: { initial: Initial }) {
  const [checkIn, setCheckIn] = useState(initial.checkIn);
  const [checkOut, setCheckOut] = useState(initial.checkOut);
  const [adults, setAdults] = useState(initial.adults);
  const [kids, setKids] = useState(initial.children);
  const guests = adults + kids;

  const initialRoom =
    rooms.find((r) => r.slug === initial.room && r.maxGuests >= guests) ??
    rooms.find((r) => r.maxGuests >= guests) ??
    rooms[rooms.length - 1];
  const [roomSlug, setRoomSlug] = useState<RoomSlug>(initialRoom.slug);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Argentina");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const room = rooms.find((r) => r.slug === roomSlug)!;
  const roomFits = room.maxGuests >= guests;
  const nights = nightsBetween(checkIn, checkOut);
  const total = nights * room.price;

  function buildMessage() {
    return [
      `Hola! Quiero solicitar una reserva en ${site.name}:`,
      `• Llegada: ${formatDate(checkIn)}`,
      `• Salida: ${formatDate(checkOut)} (${nights} noche${nights === 1 ? "" : "s"})`,
      `• Huéspedes: ${adults} adulto${adults === 1 ? "" : "s"}${kids ? `, ${kids} niño${kids === 1 ? "" : "s"}` : ""}`,
      `• Habitación: ${room.name}`,
      `• Total estimado: USD ${total}`,
      "",
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Teléfono: ${phone}`,
      `País: ${country}`,
      notes ? `Comentarios: ${notes}` : "",
    ]
      .filter((l, i, arr) => l !== "" || i < arr.length - 1)
      .join("\n");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nights === 0) return setError("Revisá las fechas: la salida tiene que ser posterior a la llegada.");
    if (!roomFits) return setError(`La ${room.name.toLowerCase()} admite hasta ${room.maxGuests} personas.`);
    setError("");
    window.open(whatsappLink(buildMessage()), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="grid items-start gap-8 lg:grid-cols-[1fr_400px]">
      <div className="flex flex-col gap-6">
        <Step n={1} title="Fechas">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field">
              Llegada
              <input className="inp" type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
            </label>
            <label className="field">
              Salida
              <input className="inp" type="date" required min={checkIn || undefined} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </label>
          </div>
        </Step>

        <Step n={2} title="Huéspedes">
          <div className="divide-y divide-line">
            <Counter label="Adultos" hint="13 años o más" value={adults} min={1} max={4} onChange={setAdults} />
            <Counter label="Niños" hint="De 0 a 12 años" value={kids} min={0} max={3} onChange={setKids} />
          </div>
        </Step>

        <Step n={3} title="Habitación">
          <div className="grid gap-3 sm:grid-cols-3">
            {rooms.map((r) => {
              const fits = r.maxGuests >= guests;
              const selected = r.slug === roomSlug;
              return (
                <label
                  key={r.slug}
                  className={`relative flex cursor-pointer flex-col gap-1 rounded-lg border-2 p-4 transition-colors ${
                    selected ? "border-navy bg-sand" : "border-line hover:border-navy/40"
                  } ${fits ? "" : "cursor-not-allowed opacity-45"}`}
                >
                  <input type="radio" name="room" value={r.slug} checked={selected} disabled={!fits} onChange={() => setRoomSlug(r.slug)} className="sr-only" />
                  {selected && (
                    <span className="absolute top-3 right-3 grid size-5 place-items-center rounded-full bg-navy text-cream">
                      <Icon name="check" size={12} />
                    </span>
                  )}
                  <span className="font-semibold text-ink">{r.name.replace("Habitación ", "")}</span>
                  <span className="text-sm text-muted">{r.guests}</span>
                  <span className="mt-2 text-sm font-semibold text-navy">USD {r.price} / noche</span>
                </label>
              );
            })}
          </div>
          {!roomFits && (
            <p className="mt-3 flex items-center gap-2 text-sm text-red-700">
              <Icon name="info" size={16} /> Esta habitación no alcanza para {guests} personas.
            </p>
          )}
        </Step>

        <Step n={4} title="Tus datos">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field">
              Nombre y apellido
              <input className="inp" required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="field">
              Email
              <input className="inp" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className="field">
              Teléfono / WhatsApp
              <input className="inp" type="tel" required autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label className="field">
              País de residencia
              <input className="inp" autoComplete="country-name" value={country} onChange={(e) => setCountry(e.target.value)} />
            </label>
            <label className="field sm:col-span-2">
              Comentarios (opcional)
              <textarea className="inp h-28 py-3" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Horario estimado de llegada, cuna, pedidos especiales…" />
            </label>
          </div>
        </Step>
      </div>

      <aside className="card overflow-hidden lg:sticky lg:top-28">
        <Photo label={room.photos[0].label} src={room.photos[0].src} rounded={false} className="h-44" sizes="400px" />
        <div className="flex flex-col gap-5 p-6">
          <h2 className="h-display text-2xl">Tu estadía</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-muted">Llegada</dt>
              <dd className="font-semibold">{formatDate(checkIn)}</dd>
            </div>
            <div>
              <dt className="text-muted">Salida</dt>
              <dd className="font-semibold">{formatDate(checkOut)}</dd>
            </div>
            <div>
              <dt className="text-muted">Huéspedes</dt>
              <dd className="font-semibold">
                {adults} adulto{adults === 1 ? "" : "s"}
                {kids > 0 && ` · ${kids} niño${kids === 1 ? "" : "s"}`}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Habitación</dt>
              <dd className="font-semibold">{room.name.replace("Habitación ", "")}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>
                USD {room.price} × {nights} noche{nights === 1 ? "" : "s"}
              </span>
              <span>USD {total}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Desayuno</span>
              <span>Incluido</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-semibold">Total estimado</span>
              <span className="font-serif text-3xl font-medium">USD {total}</span>
            </div>
          </div>

          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}

          <button type="submit" className="btn btn-gold w-full">
            Enviar solicitud por WhatsApp
          </button>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent("Consulta de reserva")}`} className="btn btn-outline w-full">
            <Icon name="mail" /> Prefiero escribir por email
          </a>
          <p className="text-center text-xs leading-relaxed text-muted">
            No se cobra nada ahora. Te confirmamos disponibilidad y forma de pago por mensaje.
          </p>
        </div>
      </aside>
    </form>
  );
}
