"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProvinceDetail = {
  description?: string;
  famousFor?: string[];
  highlights?: string[];
  nature?: string;
  image?: string;
  region?: string;
  capital?: string;
  population?: string;
  districtCount?: string;
  districts?: string[];
  mainLanguage?: string;
  area?: string;
  provinceStory?: string;
};

export default function ProvinceModal({
  name,
  detail,
  onClose,
}: {
  name: string;
  detail?: ProvinceDetail;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAllDistricts, setShowAllDistricts] = useState(false);

  const districts = detail?.districts || [];
  const visibleDistricts = showAllDistricts ? districts : districts.slice(0, 6);
  const hiddenCount = districts.length > 6 ? districts.length - 6 : 0;

  useEffect(() => {
    const scrollY = window.scrollY;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".modal-shell",
        { opacity: 0, y: 70, scale: 0.94, filter: "blur(16px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power4.out" }
      );

      gsap.fromTo(
        ".modal-hero-img",
        { scale: 1.16 },
        { scale: 1.02, duration: 1.4, ease: "power4.out" }
      );

      gsap.from(".modal-title-line", {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
        delay: 0.15,
      });

      gsap.utils.toArray<HTMLElement>(".modal-reveal").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 45, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              scroller: scrollRef.current,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.to(".modal-hero-img", {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: ".modal-content",
          scroller: scrollRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: modalRef }
  );

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/96 px-4 py-8 backdrop-blur-2xl"
    >
      <div
        className="modal-shell relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-[2.4rem] border border-white/15 bg-[#050507] text-white shadow-[0_0_120px_rgba(0,0,0,0.95)]"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-50 rounded-full border border-white/20 bg-black/75 px-5 py-2 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
        >
          Close
        </button>

        <div
          ref={scrollRef}
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="h-full overflow-y-auto overscroll-contain scroll-smooth"
        >
          <div className="relative h-[62vh] min-h-[460px] overflow-hidden bg-black">
            <img
              src={detail?.image || "/images/bamyan.jpg"}
              alt={name}
              className="modal-hero-img h-[115%] w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-black/35 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent" />
            <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />

            <div className="absolute bottom-14 left-6 right-6 md:left-10 md:right-10">
              <p className="modal-title-line mb-4 text-xs uppercase tracking-[0.55em] text-cyan-200/80">
                Province Experience
              </p>

              <h2 className="modal-title-line premium-title text-5xl font-black md:text-8xl">
                {name}
              </h2>

              <div className="modal-title-line mt-6 flex flex-wrap gap-3">
                <Badge>{detail?.capital || "Capital not available"}</Badge>
                <Badge>{detail?.population || "Population not available"}</Badge>
                <Badge>{detail?.districtCount || `${districts.length} Districts`}</Badge>
              </div>
            </div>
          </div>

          <div className="modal-content relative z-20 -mt-10 rounded-t-[2.4rem] bg-[#050507] px-6 pb-14 pt-10 shadow-[0_-35px_80px_rgba(0,0,0,0.85)] md:px-10">
            <p className="modal-reveal max-w-5xl text-lg leading-8 text-white/75 md:text-xl md:leading-9">
              {detail?.description ||
                `${name} is renowned for its culture, history, natural beauty, traditions, and warm hospitality.`}
            </p>

            {detail?.provinceStory && (
              <Panel title={`Discover ${name}`} className="modal-reveal mt-6">
                <p className="whitespace-pre-line text-base leading-8 text-white/75 md:text-lg md:leading-9">
                  {detail.provinceStory}
                </p>
              </Panel>
            )}

            <div className="modal-reveal mt-8 grid gap-4 md:grid-cols-4">
              <InfoCard title="Capital" value={detail?.capital || "Not available"} />
              <InfoCard title="Population" value={detail?.population || "Not available"} />
              <InfoCard title="Districts" value={detail?.districtCount || `${districts.length} Districts`} />
              <InfoCard title="Area" value={detail?.area || "Not available"} />
              <InfoCard title="Main Language" value={detail?.mainLanguage || "Not available"} wide />
              <InfoCard title="Region" value={detail?.region || "Afghanistan"} />
              <InfoCard title="Country" value="Afghanistan" />
            </div>

            <div className="modal-reveal mt-6 grid gap-6 md:grid-cols-2">
              <Panel title="Famous For">
                <div className="flex flex-wrap gap-2">
                  {(detail?.famousFor || ["Culture", "History", "People"]).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-sm text-cyan-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Panel>

              <Panel title="Highlights">
                <ul className="space-y-2 text-white/65">
                  {(detail?.highlights || ["Local traditions", "Historic places", "Natural beauty"]).map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </Panel>
            </div>

            <Panel title="District List" className="modal-reveal mt-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-black text-cyan-100">
                    {districts.length} Districts
                  </h4>
                  <p className="text-xs text-white/40">
                    Administrative divisions of {name}
                  </p>
                </div>

                {hiddenCount > 0 && !showAllDistricts && (
                  <button
                    onClick={() => setShowAllDistricts(true)}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-200 transition hover:scale-105"
                  >
                    +{hiddenCount} More
                  </button>
                )}

                {showAllDistricts && districts.length > 6 && (
                  <button
                    onClick={() => setShowAllDistricts(false)}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white hover:text-black"
                  >
                    Show Less
                  </button>
                )}
              </div>

              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {visibleDistricts.map((district, index) => (
                  <div
                    key={`${district}-${index}`}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 transition hover:border-cyan-200/20 hover:bg-cyan-200/5"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-[10px] font-black text-cyan-200 shadow-[0_0_12px_rgba(34,211,238,.4)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="text-sm text-white/80">{district}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Nature" className="modal-reveal mt-6">
              <p className="leading-8 text-white/65">
                {detail?.nature || "A unique landscape with its own local beauty."}
              </p>
            </Panel>

            <p className="modal-reveal mt-8 text-sm text-white/35">
              Population figures are approximate estimates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-xl">
      {children}
    </span>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:p-6 ${className}`}>
      <h3 className="mb-4 text-sm uppercase tracking-[0.3em] text-white/40">
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoCard({
  title,
  value,
  wide,
}: {
  title: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition hover:border-cyan-200/20 md:p-5 ${wide ? "md:col-span-2" : ""}`}>
      <h3 className="text-xs uppercase tracking-[0.28em] text-white/35">
        {title}
      </h3>
      <p className="mt-3 text-base font-black text-cyan-100 md:text-lg">
        {value}
      </p>
    </div>
  );
}
