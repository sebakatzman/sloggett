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
  { icon: "clock", label: "Check-in", value: "De 14 a 24 h, con código de acceso" },
];

const faqs = [
  {
    q: "¿Cómo llego desde el aeropuerto?",
    a: "El aeropuerto de Ushuaia está a unos 10 minutos en taxi o remís. Si nos avisás tu horario de vuelo, te ayudamos a coordinar el traslado.",
  },
  {
    q: "¿El desayuno está incluido?",
    a: "Sí, todas las tarifas incluyen desayuno continental, servido todos los días de 7:30 a 10:30 en el desayunador.",
  },
  {
    q: "¿Cómo es el check-in?",
    a: "El ingreso es de 14 a 24 h, de forma automática con códigos que te enviamos antes de tu llegada. El check-out es hasta las 11 h. Otros horarios se coordinan previamente, sujetos a disponibilidad.",
  },
  {
    q: "¿Pueden alojarse chicos?",
    a: "Sí. Los bebés menores de 2 años no pagan y duermen con sus padres; desde los 2 años abonan como adultos. Las familias pueden alojarse combinando dos habitaciones en una misma reserva.",
  },
  {
    q: "¿Cómo se paga la reserva?",
    a: "La reserva se confirma con el pago de una noche en concepto de seña. El saldo de la estadía se abona al momento del ingreso.",
  },
  {
    q: "¿Cuál es la política de cancelación?",
    a: "Podés cancelar sin cargo hasta 10 días antes de la llegada, con devolución total de la seña. Si se cancela dentro de los 10 días previos o no te presentás, se pierde la seña. Las cancelaciones deben avisarse por escrito.",
  },
  {
    q: "¿Se aceptan mascotas? ¿Se puede fumar?",
    a: "No se aceptan mascotas y no se permite fumar en la hostería.",
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
