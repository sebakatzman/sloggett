"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { bookingEngineOrigin } from "@/lib/site";

type ResizableFrame = HTMLIFrameElement & { iFrameResizer?: { removeListeners: () => void } };

declare global {
  interface Window {
    iFrameResize?: (options: object, target: HTMLIFrameElement) => void;
    lightGallery?: (el: HTMLElement, options: object) => { openGallery: () => void };
  }
}

const assets = `${bookingEngineOrigin}/BookingFrameClient/public/assets/booking-frame/js`;
const lightGalleryCdn = "https://cdnjs.cloudflare.com/ajax/libs/lightgallery/2.7.2";

function initResizer(frame: HTMLIFrameElement | null) {
  if (frame && window.iFrameResize) window.iFrameResize({ heightCalculationMethod: "taggedElement" }, frame);
}

// Equivalente al script oficial de MiniHotel (main.js + bframe-main.js), pero compatible con la
// navegación del lado del cliente de Next y validando el origen de los mensajes.
export function BookingEngine({ src }: { src: string }) {
  const frameRef = useRef<ResizableFrame>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    // Igual que el script oficial: en celulares el motor se usa a pantalla completa.
    if (window.innerWidth < 768) {
      window.location.replace(src);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | null = null;
    const sendPosition = () => {
      if (timer) return;
      timer = setTimeout(() => {
        timer = null;
        const r = frame.getBoundingClientRect();
        frame.contentWindow?.postMessage(
          {
            top: r.top,
            left: r.left,
            bottom: r.bottom,
            right: r.right,
            scrollY: window.scrollY,
            scrollX: window.scrollX,
            height: r.height,
            width: r.width,
            topOffset: r.top + window.scrollY,
            leftOffset: r.left + window.scrollX,
            currentScrollY: document.scrollingElement?.scrollTop ?? 0,
            currentScrollX: document.scrollingElement?.scrollLeft ?? 0,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
          },
          bookingEngineOrigin,
        );
      }, 10);
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== bookingEngineOrigin) return;
      const data = event.data as { type?: string; images?: unknown[] } | null;
      if (data?.type === "BFRAME_SCROLL_TOP") {
        frame.scrollIntoView();
      } else if (data?.type === "hw-open-gallery" && Array.isArray(data.images) && window.lightGallery) {
        window.lightGallery(document.createElement("button"), { dynamic: true, dynamicEl: data.images }).openGallery();
      }
    };

    window.addEventListener("scroll", sendPosition);
    window.addEventListener("resize", sendPosition);
    window.addEventListener("message", onMessage);
    frame.addEventListener("load", sendPosition);
    initResizer(frame);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", sendPosition);
      window.removeEventListener("resize", sendPosition);
      window.removeEventListener("message", onMessage);
      frame.removeEventListener("load", sendPosition);
      frame.iFrameResizer?.removeListeners();
    };
  }, [src]);

  return (
    <>
      <iframe
        ref={frameRef}
        id="hw-booking-frame"
        title="Reservas online de Hostería Sloggett"
        src={src}
        className="block w-full border-0"
        style={{ height: 1100 }}
      />
      <Script src={`${assets}/iframe-resizer.min.js`} onLoad={() => initResizer(frameRef.current)} />
      <Script src={`${lightGalleryCdn}/lightgallery.min.js`} strategy="lazyOnload" />
      <link rel="stylesheet" href={`${lightGalleryCdn}/css/lightgallery.min.css`} precedence="default" />
    </>
  );
}
