"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cultureItems = [
  {
    title: "Poetry",
    text: "Words that carry love, memory, wisdom, and the soul of generations.",
    image: "/images/poetry.jpg",
  },
  {
    title: "Hospitality",
    text: "A guest is welcomed with honor, tea, bread, warmth, and respect.",
    image: "/images/kabul.jpg",
  },
  {
    title: "Heritage",
    text: "Carpets, calligraphy, music, clothes, and traditions shaped by centuries.",
    image: "/images/carpet.jpg",
  },
  {
    title: "Food",
    text: "Kabuli palaw, mantu, ashak, fresh fruits, tea, and unforgettable flavors.",
    image: "/images/food.jpg",
  },
];

export default function CultureSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".culture-kicker", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".culture-word", {
        scrollTrigger: {
          trigger: ".culture-title",
          start: "top 75%",
        },
        y: 90,
        opacity: 0,
        rotateX: 70,
        duration: 1.1,
        stagger: 0.12,
        ease: "power4.out",
      });

      gsap.from(".culture-line", {
        scrollTrigger: {
          trigger: ".culture-line",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
      });

      gsap.from(".culture-card", {
        scrollTrigger: {
          trigger: ".culture-grid",
          start: "top 75%",
        },
        y: 90,
        opacity: 0,
        scale: 0.92,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
      });

      gsap.to(".culture-bg-orb", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -220,
        scale: 1.25,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="culture"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-32 text-white md:px-20"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[2] h-80 bg-gradient-to-b from-black via-black/95 to-transparent" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,black_0%,black_22%,rgba(249,115,22,0.08)_45%,rgba(249,115,22,0.18)_68%,black_100%)]" />

      <div className="cinematic-grid absolute inset-0 opacity-40" />
      <div className="culture-bg-orb absolute left-1/2 top-80 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-orange-500/18 blur-3xl" />
      <div className="absolute inset-0 bg-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="culture-kicker mb-6 text-sm uppercase tracking-[0.55em] text-orange-200/60">
            Chapter Three
          </p>

          <h2 className="culture-title overflow-hidden text-5xl font-black uppercase leading-none md:text-8xl">
            <span className="culture-word inline-block">Culture</span>{" "}
            <span className="culture-word inline-block text-orange-100">&</span>{" "}
            <span className="culture-word inline-block">Beauty</span>
          </h2>

          <div className="mx-auto mt-10 max-w-4xl space-y-4 text-xl leading-9 text-white/70 md:text-2xl">
            <p className="culture-line">
              Afghanistan is not only landscapes and history.
            </p>
            <p className="culture-line">
              It is poetry spoken softly, tea served with honor, carpets woven by hand,
              and stories carried from one generation to the next.
            </p>
          </div>
        </div>

        <div className="culture-grid mt-20 grid gap-6 md:grid-cols-4">
          {cultureItems.map((item, index) => (
            <article
              key={item.title}
              className={`culture-card group relative h-[460px] overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 ${
                index % 2 === 0 ? "md:mt-16" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="absolute bottom-0 p-7">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-black text-white backdrop-blur">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-3xl font-black">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-white/70">
                  {item.text}
                </p>

                <div className="mt-6 h-1 w-14 rounded-full bg-orange-200 transition-all duration-500 group-hover:w-28" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-[1fr_1.5fr] md:items-center">
          <div className="premium-card rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.4em] text-orange-200/60">
              Living Culture
            </p>

            <h3 className="mt-5 text-4xl font-black md:text-5xl">
              Every province has its own rhythm.
            </h3>
          </div>

          <p className="text-2xl leading-10 text-white/65">
            From Herat’s poetry to Kandahar’s pomegranates, from Bamyan’s valleys
            to Nuristan’s forests, culture is the thread that connects the country.
          </p>
        </div>
      </div>
    </section>
  );
}
