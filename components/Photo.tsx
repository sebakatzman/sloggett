import Image from "next/image";

type Props = {
  label: string;
  src?: string;
  className?: string;
  dark?: boolean;
  sizes?: string;
  preload?: boolean;
  rounded?: boolean;
};

// Sin `src` muestra un placeholder con la descripción de la foto que va.
export function Photo({ label, src, className = "", dark, sizes = "100vw", preload, rounded = true }: Props) {
  const base = `relative overflow-hidden ${rounded ? "rounded-md" : ""} ${className}`;

  if (src) {
    return (
      <div className={base}>
        <Image src={src} alt={label} fill sizes={sizes} preload={preload} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={`${base} ph ${dark ? "ph-dark" : ""}`} role="img" aria-label={label}>
      <span className="ph-tag">Foto · {label}</span>
    </div>
  );
}
