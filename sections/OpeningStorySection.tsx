"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  {
    kicker: "Cinematic Travel Story",
    title: "Afghanistan",
    text: "A journey through mountains, valleys, culture, history, and untold stories.",
    image: "/images/afghanistan.jpg",
  },
  {
    kicker: "Chapter One",
    title: "Mountains",
    text: "The Hindu Kush rises across the country, shaping valleys, roads, rivers, and the feeling of Afghanistan.",
    image: "/images/panjshir.jpg",
  },
  {
    kicker: "Chapter Two",
    title: "Band-e Amir",
    text: "Blue lakes hidden between ancient cliffs, where water, stone, and silence create a breathtaking view.",
    image: "/images/band-e-amir.jpg",
  },
];

export default function OpeningStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3600",
          scrub: 1,
          pin: true,
        },
      });

      chapters.forEach((_, index) => {
        tl.to(
          ".story-bg",
          {
            opacity: (i) => (i === index ? 1 : 0),
            scale: (i) => (i === index ? 1.16 : 1.04),
            duration: 1.1,
            ease: "none",
          },
          index === 0 ? 0 : ">"
        );

        tl.fromTo(
          `.story-copy-${index}`,
          {
            opacity: 0,
            y: 130,
            scale: 0.85,
            filter: "blur(14px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
          },
          "<"
        );

        tl.to(
          `.story-copy-${index}`,
          {
            opacity: 0,
            y: -100,
            scale: 1.1,
            filter: "blur(8px)",
            duration: 0.8,
            ease: "power3.inOut",
          },
          "+=0.65"
        );
      });

      gsap.to(".story-mist", {
        x: -220,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3600",
          scrub: true,
        },
      });

      gsap.to(".story-foreground", {
        y: -90,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3600",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black text-white"
    >
      {chapters.map((chapter, index) => (
        <img
          key={chapter.title}
          src={chapter.image}
          alt={chapter.title}
          className="story-bg story-bg-breathing absolute inset-0 h-full w-full object-cover opacity-0 brightness-[0.92] contrast-[1.08] saturate-[1.12]"
          style={{ opacity: index === 0 ? 1 : 0 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_35%,_rgba(0,0,0,0.68)_100%)]" />

      <div className="story-mist absolute inset-0 bg-[linear-gradient(90deg,_transparent,_rgba(255,255,255,0.09),_transparent)] opacity-40 blur-3xl" />

      <div className="story-foreground absolute bottom-0 left-0 right-0 z-20 h-[20vh] bg-gradient-to-t from-black via-black/45 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[25] h-[10vh] bg-gradient-to-t from-black/85 via-black/35 to-transparent" />


      <div className="absolute inset-0 z-30 flex items-center justify-center px-6 text-center">
        {chapters.map((chapter, index) => (
          <div
            key={chapter.title}
            className={`story-copy-${index} absolute max-w-6xl`}
            style={{ opacity: index === 0 ? 1 : 0 }}
          >
            <p className="mb-6 text-sm uppercase tracking-[0.65em] text-cyan-100/80">
              {chapter.kicker}
            </p>

            <h1 className="premium-title text-6xl font-black uppercase leading-none drop-shadow-[0_8px_35px_rgba(0,0,0,0.8)] md:text-[9rem]">
              {chapter.title}
            </h1>

            <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-white/85 md:text-2xl">
              {chapter.text}
            </p>

            <div className="mx-auto mt-10 h-px w-56 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
          </div>
        ))}
      </div>

      <div className="scroll-travel-indicator pointer-events-none absolute bottom-10 left-1/2 z-[80] -translate-x-1/2 text-center text-xs uppercase tracking-[0.45em] text-white/80">
        Scroll to travel
        <div className="mx-auto mt-4 h-12 w-px bg-white/45" />
      </div>
    </section>
  );
}
