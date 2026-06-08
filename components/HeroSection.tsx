"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-kicker", { y: 30, opacity: 0, duration: 1 });
      gsap.from(".hero-title", { y: 90, opacity: 0, scale: 0.92, duration: 1.3, delay: 0.2 });
      gsap.from(".hero-subtitle", { y: 30, opacity: 0, duration: 1, delay: 0.5 });
      gsap.from(".hero-scroll", { opacity: 0, y: -20, duration: 1, delay: 0.9 });
    },
    { scope: sectionRef }
  );

  return (
    <section id="home" ref={sectionRef} className="relative h-screen overflow-hidden bg-black text-white">
      <img
        src="/images/wakhan.jpg"
        alt="Afghanistan mountains"
        className="absolute inset-0 h-full w-full scale-110 object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_black_75%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="hero-kicker mb-6 text-sm uppercase tracking-[0.65em] text-white/70">
          Cinematic Travel Story
        </p>

        <h1 className="hero-title premium-title text-6xl font-black uppercase leading-none md:text-[9rem]">
          Afghanistan
        </h1>

        <p className="hero-subtitle mt-6 max-w-3xl text-lg text-white/80 md:text-2xl">
          A journey through mountains, history, culture, and untold stories.
        </p>

        <div className="hero-scroll mt-16 flex flex-col items-center gap-3 text-xs uppercase tracking-[0.45em] text-white/60">
          Scroll to Explore
          <span className="h-12 w-px bg-white/40" />
          <span className="h-3 w-3 rounded-full border border-white/70" />
        </div>
      </div>
    </section>
  );
}
