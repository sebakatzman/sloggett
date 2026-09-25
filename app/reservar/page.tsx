import type { Metadata } from "next";
import { BookingForm } from "./BookingForm";

export const metadata: Metadata = {
  title: "Reservar",
  description: "Reservá directo en Hostería Sloggett y obtené la mejor tarifa.",
};

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ReservarPage({ searchParams }: PageProps<"/reservar">) {
  const params = await searchParams;
  const [adults, children] = (first(params.huespedes) ?? "2-0").split("-").map(Number);

  return (
    <section className="container-x py-14 lg:py-20">
      <div className="mb-10 flex flex-col gap-4">
        <span className="kicker">Reserva directa</span>
        <h1 className="h-display text-4xl sm:text-5xl">Reservá tu estadía</h1>
        <p className="max-w-2xl text-lg text-muted">
          Completá los datos y te confirmamos disponibilidad a la brevedad. No se cobra nada ahora.
        </p>
      </div>
      <BookingForm
        initial={{
          checkIn: first(params.llegada) ?? "",
          checkOut: first(params.salida) ?? "",
          adults: Number.isFinite(adults) && adults > 0 ? Math.min(adults, 4) : 2,
          children: Number.isFinite(children) && children >= 0 ? Math.min(children, 3) : 0,
          room: first(params.habitacion),
        }}
      />
    </section>
  );
}
