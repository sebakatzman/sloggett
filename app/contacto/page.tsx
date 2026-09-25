import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import { Icon, type IconName } from "@/components/Icon";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos por WhatsApp o email. Hostería Sloggett, Ushuaia, Tierra del Fuego.",
};

const channels: { icon: IconName; label: string; value: string; href?: string }[] = [
  { icon: "pin", label: "Dirección", value: site.address },
  { icon: "chat", label: "WhatsApp", value: site.phoneDisplay, href: whatsappLink() },
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "instagram", label: "Instagram", value: `@${site.instagram}`, href: `https://instagram.com/${site.instagram}` },
  { icon: "clock", label: "Recepción", value: "Todos los días de 8:00 a 22:00" },
];

const faqs = [
  {
    q: "¿Cómo llego desde el aeropuerto?",
    a: "El aeropuerto de Ushuaia está a unos 10 minutos en taxi o remís. Si nos avisás tu horario de vuelo, te ayudamos a coordinar el traslado.",
  },
  {
    q: "¿El desayuno está incluido?",
    a: "Sí, todas las tarifas incluyen desayuno casero, servido todas las mañanas en el desayunador con vista al canal.",
  },
  {
    q: "¿Pueden alojarse chicos?",
    a: "Sí. Tenemos una habitación familiar para hasta 4 personas y cuna disponible a pedido.",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Podés cancelar sin cargo hasta 7 días antes de la llegada. Pasado ese plazo se cobra la primera noche.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Transferencia bancaria, efectivo (pesos o dólares) y tarjetas de crédito y débito.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_520px] lg:gap-20 lg:py-24">
        <div className="flex flex-col gap-5">
          <span className="kicker">Contacto</span>
          <h1 className="h-display text-4xl leading-[1.08] sm:text-5xl lg:text-[56px]">Te esperamos en Ushuaia</h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted">
            Escribinos por cualquier consulta sobre habitaciones, tarifas o cómo llegar. Respondemos
            en el día.
          </p>
          <ul className="mt-4 flex flex-col gap-5">
            {channels.map((c) => {
              const content = (
                <>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand text-navy">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{c.label}</span>
                    <span className="font-medium break-all text-ink">{c.value}</span>
                  </span>
                </>
              );
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 hover:opacity-80">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <a href={whatsappLink("Hola! Tengo una consulta sobre la hostería.")} target="_blank" rel="noopener noreferrer" className="btn btn-gold mt-4 self-start">
            <Icon name="chat" /> Escribir por WhatsApp
          </a>
        </div>

        <ContactForm />
      </section>

      <section className="container-x pb-16 lg:pb-24">
        <iframe
          title="Ubicación de Hostería Sloggett"
          src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
          className="h-[420px] w-full rounded-lg border border-line"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <span className="kicker">Preguntas frecuentes</span>
            <h2 className="h-display text-4xl">Antes de reservar</h2>
            <p className="text-lg text-muted">¿No encontrás lo que buscás? Escribinos y te respondemos.</p>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink">
                  {f.q}
                  <Icon name="chevron" className="shrink-0 text-gold-dark transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
