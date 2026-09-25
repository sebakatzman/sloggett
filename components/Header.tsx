"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-cream">
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium transition-colors hover:text-gold-light ${
                  active ? "text-gold-light" : "text-cream/85"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/reservar" className="btn btn-gold h-11 px-5">
            Reservar
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? "close" : "menu"} size={26} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-cream/10 md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-lg text-cream/90"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/reservar" onClick={() => setOpen(false)} className="btn btn-gold mt-2">
              Reservar
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
