"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ExperienceLayer() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const atmosphereTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-atmosphere]"));
    let frame = 0;
    let previousScroll = window.scrollY;
    let previousTime = performance.now();

    const updateScroll = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? window.scrollY / distance : 0;
      root.style.setProperty("--scroll-progress", String(Math.min(1, Math.max(0, progress))));
      const now = performance.now();
      const velocity = Math.max(-1, Math.min(1, (window.scrollY - previousScroll) / Math.max(16, now - previousTime) / 2.2));
      root.style.setProperty("--scroll-velocity", velocity.toFixed(3));
      previousScroll = window.scrollY;
      previousTime = now;

      document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((target) => {
        const bounds = target.getBoundingClientRect();
        const range = window.innerHeight + bounds.height;
        const sectionProgress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / range));
        target.style.setProperty("--section-progress", sectionProgress.toFixed(4));
      });

      const atmosphereCursor = window.innerHeight * 0.48;
      const atmosphere = atmosphereTargets.find((target) => {
        const bounds = target.getBoundingClientRect();
        return bounds.top <= atmosphereCursor && bounds.bottom >= atmosphereCursor;
      });
      root.dataset.atmosphere = atmosphere?.dataset.atmosphere ?? "paper";
    };

    const requestScrollUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(".route-stage > section:not(:first-child), [data-reveal]"));
    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-revealed");
                observer?.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -9%", threshold: 0.12 },
        );

    revealTargets.forEach((target) => {
      if (reducedMotion) target.classList.add("is-revealed");
      else observer?.observe(target);
    });

    const spotlightTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-spotlight]"));
    const cleanups = spotlightTargets.map((target) => {
      const move = (event: PointerEvent) => {
        const bounds = target.getBoundingClientRect();
        target.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
        target.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
      };
      target.addEventListener("pointermove", move);
      return () => target.removeEventListener("pointermove", move);
    });

    const tiltCleanups = finePointer
      ? Array.from(document.querySelectorAll<HTMLElement>("[data-tilt]")).map((target) => {
          const move = (event: PointerEvent) => {
            const bounds = target.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            target.style.setProperty("--tilt-y", `${x * 7}deg`);
            target.style.setProperty("--tilt-x", `${y * -6}deg`);
            target.style.setProperty("--tilt-z", "12px");
          };
          const leave = () => {
            target.style.setProperty("--tilt-y", "0deg");
            target.style.setProperty("--tilt-x", "0deg");
            target.style.setProperty("--tilt-z", "0px");
          };
          target.addEventListener("pointermove", move);
          target.addEventListener("pointerleave", leave);
          return () => {
            target.removeEventListener("pointermove", move);
            target.removeEventListener("pointerleave", leave);
          };
        })
      : [];

    const magneticCleanups = finePointer
      ? Array.from(document.querySelectorAll<HTMLElement>(".action-button, .header-action, [data-magnetic]")).map((target) => {
          const move = (event: PointerEvent) => {
            const bounds = target.getBoundingClientRect();
            const x = event.clientX - (bounds.left + bounds.width / 2);
            const y = event.clientY - (bounds.top + bounds.height / 2);
            target.style.setProperty("--magnetic-x", `${x * 0.12}px`);
            target.style.setProperty("--magnetic-y", `${y * 0.16}px`);
          };
          const leave = () => {
            target.style.setProperty("--magnetic-x", "0px");
            target.style.setProperty("--magnetic-y", "0px");
          };
          target.addEventListener("pointermove", move);
          target.addEventListener("pointerleave", leave);
          return () => {
            target.removeEventListener("pointermove", move);
            target.removeEventListener("pointerleave", leave);
          };
        })
      : [];

    const pointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-page-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-page-y", `${event.clientY}px`);
    };

    root.classList.add("experience-ready");
    updateScroll();
    window.addEventListener("scroll", requestScrollUpdate, { passive: true });
    window.addEventListener("resize", requestScrollUpdate, { passive: true });
    if (finePointer) window.addEventListener("pointermove", pointerMove, { passive: true });

    return () => {
      observer?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      tiltCleanups.forEach((cleanup) => cleanup());
      magneticCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", requestScrollUpdate);
      window.removeEventListener("resize", requestScrollUpdate);
      window.removeEventListener("pointermove", pointerMove);
      if (frame) window.cancelAnimationFrame(frame);
      delete root.dataset.atmosphere;
    };
  }, [pathname]);

  return (
    <div className="experience-chrome" aria-hidden="true">
      <span className="experience-progress" />
      <span className="experience-noise" />
    </div>
  );
}
