import Link from "next/link";
import { nav, site, whatsappLink } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-xs text-[15px] leading-relaxed text-cream/70">
            Siete habitaciones privadas con desayuno casero y vista al canal de Beagle, a pasos del
            centro de Ushuaia.
          </p>
        </div>

        <div>
          <h3 className="footer-title">Hostería</h3>
          <ul className="flex flex-col gap-3 text-[15px] text-cream/80">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Contacto</h3>
          <ul className="flex flex-col gap-3 text-[15px] text-cream/80">
            <li className="flex gap-2">
              <Icon name="pin" className="mt-0.5 shrink-0 text-gold" />
              {site.address}
            </li>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-gold-light">
                <Icon name="chat" className="mt-0.5 shrink-0 text-gold" />
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-2 break-all hover:text-gold-light">
                <Icon name="mail" className="mt-0.5 shrink-0 text-gold" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-title">Seguinos</h3>
          <ul className="flex flex-col gap-3 text-[15px] text-cream/80">
            <li>
              <a
                href={`https://instagram.com/${site.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 hover:text-gold-light"
              >
                <Icon name="instagram" className="mt-0.5 shrink-0 text-gold" />@{site.instagram}
              </a>
            </li>
            <li>
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-gold-light">
                <Icon name="star" className="mt-0.5 shrink-0 text-gold" />
                Reseñas en Booking
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-x flex flex-col justify-between gap-2 py-6 text-[13px] text-cream/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Hostería Sloggett · Ushuaia, Tierra del Fuego</span>
          <span>Reservá directo y obtené la mejor tarifa</span>
        </div>
      </div>
    </footer>
  );
}
