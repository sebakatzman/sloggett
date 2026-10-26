import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center rounded-md bg-cream px-3 py-2"
      aria-label="Hostería Sloggett, inicio"
    >
      <Image
        src="/images/logo-sloggett.jpg"
        alt="Hostería Sloggett, Ushuaia"
        width={640}
        height={396}
        priority
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
