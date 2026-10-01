import type { Metadata } from "next";
import { bookingEngineUrl, whatsappLink, type BookingQuery } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { BookingEngine } from "./BookingEngine";

export const metadata: Metadata = {
  title: "Reservar",
  description: "Reservá online en Hostería Sloggett: disponibilidad y tarifas en tiempo real.",
};

function first(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function isoDate(v: string | undefined) {
  return v && /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) ? v : undefined;
}

function count(v: number | undefined, max: number) {
  return v !== undefined && Number.isInteger(v) && v >= 0 ? Math.min(v, max) : undefined;
}

export default async function ReservarPage({ searchParams }: PageProps<"/reservar">) {
  const params = await searchParams;
  const query: BookingQuery = {};

  const from = isoDate(first(params.llegada));
  const to = isoDate(first(params.salida));
  if (from && to && to > from) {
    query.from = from;
    query.to = to;
  }

  // huespedes = "adultos-niños-bebés"
  const [adults, children, babies] = (first(params.huespedes) ?? "").split("-").map(Number);
  const nAdults = count(adults, 2);
  if (nAdults) {
    query.nAdults = nAdults;
    query.nChilds = count(children, 2) ?? 0;
    query.nBabies = count(babies, 2) ?? 0;
  }

  const src = bookingEngineUrl(query);

  return (
    <>
      <h1 className="sr-only">Reservá tu estadía en Hostería Sloggett</h1>

      <section className="border-b border-line bg-white">
        <BookingEngine src={src} />
      </section>

      <section className="container-x flex flex-col items-start justify-between gap-4 py-10 sm:flex-row sm:items-center">
        <p className="text-muted">
          ¿Viajan más de dos personas o tenés alguna consulta? Te ayudamos a armar tu reserva.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappLink("Hola! Quería consultar por una reserva.")} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <Icon name="chat" /> WhatsApp
          </a>
          <a href={src} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            Abrir reservas en otra pestaña
          </a>
        </div>
      </section>
    </>
  );
}

