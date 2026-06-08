"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MountainsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".mountain-content", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        x: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".mountain-title", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 120,
        scale: 0.75,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
      });

      gsap.to(".mountain-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.18,
        y: -120,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="mountains" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/images/panjshir.jpg"
        alt="Afghan mountains"
        className="mountain-image absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      <div className="relative z-10 flex min-h-screen items-center px-6 md:px-24">
        <div className="mountain-content max-w-3xl">
          <p className="mb-5 text-sm uppercase tracking-[0.5em] text-cyan-200/70">
            Chapter One
          </p>

          <h2 className="mountain-title premium-title text-6xl font-black uppercase leading-none md:text-8xl">
            The Mountains
          </h2>

          <p className="mt-8 max-w-2xl text-xl leading-9 text-white/75">
            Afghanistan is shaped by the mighty Hindu Kush mountains, silent valleys,
            ancient roads, and landscapes that feel untouched by time.
          </p>

          <a
            href="#bandamir"
            className="mt-10 inline-flex rounded-full border border-cyan-200/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-100 transition hover:bg-cyan-200 hover:text-black"
          >
            Explore More →
          </a>
        </div>
      </div>
    </section>
  );
}
