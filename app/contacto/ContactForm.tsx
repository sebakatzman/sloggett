"use client";

import type { FormEvent } from "react";
import { site } from "@/lib/site";

export function ContactForm() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Nombre: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Teléfono: ${data.get("phone") || "-"}`,
      `Fechas tentativas: ${data.get("dates") || "-"}`,
      "",
      String(data.get("message")),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Consulta desde la web")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col gap-4 self-start p-6 sm:p-8">
      <h2 className="h-display mb-1 text-2xl">Escribinos</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field">
          Nombre
          <input className="inp" name="name" required autoComplete="name" />
        </label>
        <label className="field">
          Email
          <input className="inp" name="email" type="email" required autoComplete="email" />
        </label>
        <label className="field">
          Teléfono
          <input className="inp" name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="field">
          Fechas tentativas
          <input className="inp" name="dates" placeholder="Ej: 15 al 19 de enero" />
        </label>
      </div>
      <label className="field">
        Mensaje
        <textarea className="inp h-36 py-3" name="message" required />
      </label>
      <button type="submit" className="btn btn-navy self-start">
        Enviar mensaje
      </button>
    </form>
  );
}
