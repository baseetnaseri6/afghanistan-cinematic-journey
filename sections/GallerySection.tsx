"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const places = [
  {
    province: "Bamyan",
    title: "Band-e Amir",
    subtitle: "Afghanistan’s first national park, famous for deep blue lakes and ancient cliffs.",
    image: "/images/band-e-amir.jpg",
  },
  {
    province: "Bamyan",
    title: "Bamyan Valley",
    subtitle: "Ancient cliffs, mountain silence, and unforgettable landscapes.",
    image: "/images/bamyan.jpg",
  },
  {
    province: "Herat",
    title: "Herat Citadel",
    subtitle: "A historic fortress surrounded by poetry, art, and architecture.",
    image: "/images/herat.jpg",
  },
  {
    province: "Balkh",
    title: "Blue Mosque",
    subtitle: "One of Afghanistan’s most beautiful spiritual landmarks.",
    image: "/images/blue-mosque.jpg",
  },
  {
    province: "Panjshir",
    title: "Panjshir Valley",
    subtitle: "Green valleys, crystal rivers, and the Valley of Five Lions.",
    image: "/images/panjshir.jpg",
  },
  {
    province: "Badakhshan",
    title: "Wakhan Corridor",
    subtitle: "Remote mountain routes, Pamir beauty, and dramatic landscapes.",
    image: "/images/wakhan.jpg",
  },
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".gallery-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 90,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".place-card", {
        scrollTrigger: {
          trigger: ".places-grid",
          start: "top 75%",
        },
        y: 120,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.to(".gallery-bg-image", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.18,
        y: -160,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-safe relative overflow-hidden bg-black text-white"
    >

      <div className="pointer-events-none absolute left-0 right-0 top-0 z-[2] h-72 bg-gradient-to-b from-black via-black/95 to-transparent" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_bottom,black_0%,black_20%,rgba(6,182,212,0.08)_42%,rgba(6,182,212,0.18)_65%,black_100%)]" />
      <img
        src="/images/band-e-amir.jpg"
        alt="Band-e Amir"
        className="gallery-bg-image absolute inset-0 h-full w-full object-cover opacity-25"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#041821]/85 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.22),_transparent_45%,_black_85%)]" />

      <div className="safe-container relative z-10">
        <div className="gallery-heading mx-auto mb-16 max-w-5xl text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.55em] text-cyan-200/60">
            Famous Places
          </p>

          <h2 className="section-title-size font-black uppercase leading-none">
            Places That Tell Stories
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-xl leading-9 text-white/65">
            A cinematic journey through Afghanistan’s lakes, valleys, mosques,
            ancient cities, and mountain corridors.
          </p>
        </div>

        <div className="places-grid grid gap-6 md:grid-cols-4">
          {places.map((place, index) => (
            <article
              key={place.title}
              className={`place-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 ${
                index === 0 ? "h-[620px] md:col-span-2 md:row-span-2" : "h-[420px]"
              }`}
            >
              <img
                src={place.image}
                alt={place.title}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

              <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-cyan-100 backdrop-blur">
                {place.province}
              </div>

              <div className="absolute bottom-0 p-7">
                <span className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-black text-white backdrop-blur">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-4xl font-black">
                  {place.title}
                </h3>

                <p className="mt-4 max-w-xl leading-7 text-white/70">
                  {place.subtitle}
                </p>

                <div className="mt-6 h-1 w-14 rounded-full bg-cyan-200 transition-all duration-500 group-hover:w-32" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
