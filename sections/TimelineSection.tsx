"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  { year: "1747", title: "Birth of Modern Afghanistan", text: "Ahmad Shah Durrani founded the Durrani Empire, often seen as the beginning of modern Afghanistan." },
  { year: "1919", title: "Independence", text: "Afghanistan regained full independence in foreign affairs after the Third Anglo-Afghan War." },
  { year: "1960s", title: "A Time of Change", text: "Cities, education, culture, and modern institutions began to grow in new ways." },
  { year: "2001", title: "A New Era", text: "A new chapter began with major changes in education, media, technology, and society." },
  { year: "2025+", title: "Future Generation", text: "The next story can be shaped by education, creativity, technology, and young builders." },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".timeline-heading", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      opacity: 0,
      y: 70,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(".timeline-line-fill", {
      scrollTrigger: {
        trigger: ".timeline-wrapper",
        start: "top 80%",
        end: "bottom 65%",
        scrub: true,
      },
      height: 0,
      ease: "none",
    });

    gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="timeline" ref={sectionRef} className="section-safe relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0718] to-black" />
      <div className="absolute left-1/2 top-20 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[160px]" />

      <div className="safe-container relative z-10">
        <div className="timeline-heading mx-auto mb-20 max-w-4xl text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.55em] text-purple-200/60">Timeline</p>
          <h2 className="section-title-size font-black">A Story Through Time</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/65">
            Afghanistan’s story is shaped by civilizations, independence, change,
            resilience, and the hope of a new generation.
          </p>
        </div>

        <div className="timeline-wrapper relative mx-auto max-w-5xl">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block">
            <div className="timeline-line-fill absolute left-0 top-0 w-full bg-purple-300 shadow-[0_0_28px_rgba(216,180,254,0.9)]" />
          </div>

          <div className="space-y-14">
            {events.map((event, index) => (
              <div key={event.year} className={`timeline-card flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                <div className="premium-card relative w-full rounded-[2rem] p-7 md:w-[46%]">
                  <span
                    className="absolute top-8 hidden h-4 w-4 rounded-full bg-purple-300 shadow-[0_0_25px_rgba(216,180,254,1)] md:block"
                    style={{
                      right: index % 2 === 0 ? "-2.45rem" : "auto",
                      left: index % 2 === 1 ? "-2.45rem" : "auto",
                    }}
                  />
                  <p className="text-5xl font-black text-purple-200">{event.year}</p>
                  <h3 className="mt-4 text-2xl font-black">{event.title}</h3>
                  <p className="mt-4 leading-7 text-white/65">{event.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
