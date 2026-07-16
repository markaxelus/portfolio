"use client";

import { useEffect } from "react";

/**
 * THE POCKET PRINTS + THE TIE-OFF (strike = ink). SSR ships the jacket
 * fully printed (no-js/print/reduced/?still get the finished pocket);
 * this effect ARMS the print client-side (.ink-armed strips the strokes
 * and the face's printed matter) and strikes it (.inked) when the pocket
 * enters the viewport: the blank jacket sets down, the face prints, the
 * franking cancels, the string ties itself shut, the red pass lands.
 */
export default function OutroPocketInk() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = /[?&]still(\b|=)/.test(window.location.search);
    if (reduced || still) return;
    const pocket = document.querySelector<HTMLElement>(".outro .pocket");
    if (!pocket) return;

    pocket.classList.add("ink-armed");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            pocket.classList.add("inked");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    );
    io.observe(pocket);

    /* a print mid-arm must ship the finished jacket */
    const onPrint = () => pocket.classList.add("inked");
    window.addEventListener("beforeprint", onPrint);

    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", onPrint);
      pocket.classList.remove("ink-armed", "inked");
    };
  }, []);
  return null;
}
