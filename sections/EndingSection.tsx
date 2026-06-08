"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EndingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".ending-line", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      y: 70,
      opacity: 0,
      stagger: 0.18,
      duration: 1,
      ease: "power4.out",
    });

    gsap.to(".ending-glow", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      y: -180,
      scale: 1.2,
    });
  }, { scope: sectionRef });

  return (
    <section
      id="ending"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black px-6 py-32 text-white md:px-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#020202] to-black" />

      <div className="ending-glow absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_180deg,rgba(0,0,0,0.5),rgba(220,38,38,0.18),rgba(34,197,94,0.14),rgba(0,0,0,0.5))] blur-[130px]" />

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center text-center">
        <p className="ending-line mb-6 text-sm uppercase tracking-[0.6em] text-cyan-200/60">
          The Journey Continues
        </p>

        <h2 className="ending-line premium-title text-5xl font-black uppercase leading-none md:text-8xl">
          Afghanistan Lives In Stories
        </h2>

        <p className="ending-line mx-auto mt-10 max-w-4xl text-2xl font-semibold leading-10 text-white/80 md:text-4xl md:leading-[1.35]">
          A land of mountains, poetry, courage, hospitality, and memories
          that continue to travel from one generation to the next.
        </p>

        <div className="ending-line mx-auto mt-12 h-px w-64 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

        <p className="ending-line mt-10 text-3xl font-bold text-cyan-100 md:text-5xl">
          A story still being written.
        </p>
      </div>
    </section>
  );
}
