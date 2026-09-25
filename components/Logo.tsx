import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Hostería Sloggett, inicio">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <circle cx="17" cy="17" r="16" stroke="#c9a86a" strokeWidth="1.5" />
        <path d="M6 23l7-9 4 5 3-3 8 7" stroke="#e3cd9a" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M6 26.5c3.5-1.5 7-1.5 11 0s7.5 1.5 11 0" stroke="#c9a86a" strokeWidth="1.4" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-medium tracking-tight">Hostería Sloggett</span>
        <span className="mt-1 text-[10px] font-semibold tracking-[.2em] text-gold-light/80">
          USHUAIA · FIN DEL MUNDO
        </span>
      </span>
    </Link>
  );
}
