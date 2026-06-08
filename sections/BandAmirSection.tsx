"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BandAmirSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".band-content", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        y: 100,
        scale: 0.85,
        opacity: 0,
        duration: 1.3,
        ease: "power4.out",
      });

      gsap.to(".band-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.2,
        y: -100,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="bandamir" ref={sectionRef} className="relative min-h-screen overflow-hidden bg-black text-white">
      <img
        src="/images/band-e-amir.jpg"
        alt="Band-e Amir"
        className="band-image absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_black_80%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center md:px-20">
        <div className="band-content max-w-5xl">
          <p className="mb-6 text-sm uppercase tracking-[0.5em] text-cyan-200/70">
            Chapter Two
          </p>

          <h2 className="premium-title text-6xl font-black uppercase leading-none md:text-8xl">
            Band-e Amir
          </h2>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-white/75">
            Blue lakes between ancient cliffs. A natural wonder where silence, water,
            and mountains create one of Afghanistan’s most cinematic views.
          </p>

          <a
            href="#culture"
            className="mt-10 inline-flex rounded-full border border-cyan-200/30 px-7 py-3 text-sm font-bold uppercase tracking-[0.25em] text-cyan-100 transition hover:bg-cyan-200 hover:text-black"
          >
            Continue Story →
          </a>
        </div>
      </div>
    </section>
  );
}
