"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

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
  const [mounted, setMounted] = useState(false);
  const [showAllDistricts, setShowAllDistricts] = useState(false);

  const districts = detail?.districts || [];
  const visibleDistricts = showAllDistricts ? districts : districts.slice(0, 6);
  const hiddenCount = districts.length > 6 ? districts.length - 6 : 0;

  useEffect(() => {
    setMounted(true);

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    const oldBodyStyle = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    const oldHtmlOverflow = html.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      html.style.overflow = oldHtmlOverflow;
      body.style.overflow = oldBodyStyle.overflow;
      body.style.position = oldBodyStyle.position;
      body.style.top = oldBodyStyle.top;
      body.style.left = oldBodyStyle.left;
      body.style.right = oldBodyStyle.right;
      body.style.width = oldBodyStyle.width;
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/95 px-4 py-8 backdrop-blur-2xl"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div
        data-lenis-prevent
        className="relative h-[86vh] w-full max-w-6xl overflow-hidden rounded-[2.2rem] border border-white/15 bg-zinc-950 text-white shadow-[0_0_120px_rgba(0,0,0,0.95)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-5 top-5 z-[80] rounded-full border border-white/20 bg-black/85 px-5 py-2 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white hover:text-black"
        >
          Close
        </button>

        <div
          data-lenis-prevent
          className="modal-scroll h-full overflow-y-auto overscroll-contain"
          onWheel={(e) => {
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="relative h-[520px] overflow-hidden bg-black">
            <img
              src={detail?.image || "/images/bamyan.jpg"}
              alt={name}
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-black/40 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

            <div className="absolute bottom-10 left-7 right-7 md:left-10 md:right-10">
              <p className="mb-4 text-xs uppercase tracking-[0.5em] text-cyan-200/80">
                Province Experience
              </p>

              <h2 className="premium-title text-5xl font-black md:text-8xl">
                {name}
              </h2>

              <div className="mt-6 flex flex-wrap gap-3">
                <Badge>{detail?.capital || "Capital"}</Badge>
                <Badge>{detail?.population || "Population"}</Badge>
                <Badge>{detail?.districtCount || `${districts.length} Districts`}</Badge>
              </div>
            </div>
          </div>

          <div className="px-7 pb-14 pt-8 md:px-10">
            <p className="max-w-5xl text-lg leading-8 text-white/75 md:text-xl md:leading-9">
              {detail?.description ||
                `${name} is renowned for its culture, history, natural beauty, traditions, and warm hospitality.`}
            </p>

            {detail?.provinceStory && (
              <Panel title={`Discover ${name}`} className="mt-6">
                <p className="whitespace-pre-line text-base leading-8 text-white/75 md:text-lg md:leading-9">
                  {detail.provinceStory}
                </p>
              </Panel>
            )}

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <InfoCard title="Capital" value={detail?.capital || "Not available"} />
              <InfoCard title="Population" value={detail?.population || "Not available"} />
              <InfoCard title="Districts" value={detail?.districtCount || `${districts.length} Districts`} />
              <InfoCard title="Area" value={detail?.area || "Not available"} />
              <InfoCard title="Main Language" value={detail?.mainLanguage || "Not available"} wide />
              <InfoCard title="Region" value={detail?.region || "Afghanistan"} />
              <InfoCard title="Country" value="Afghanistan" />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <Panel title="Famous For">
                <div className="flex flex-wrap gap-2">
                  {(detail?.famousFor || ["Culture", "History", "People"]).map((item) => (
                    <span key={item} className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-4 py-2 text-sm text-cyan-100">
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

            <Panel title="District List" className="mt-6">
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
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowAllDistricts(true);
                    }}
                    className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold text-cyan-200"
                  >
                    +{hiddenCount} More
                  </button>
                )}

                {showAllDistricts && districts.length > 6 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setShowAllDistricts(false);
                    }}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white"
                  >
                    Show Less
                  </button>
                )}
              </div>

              <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {visibleDistricts.map((district, index) => (
                  <div key={`${district}-${index}`} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-[10px] font-black text-cyan-200">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="text-sm text-white/80">{district}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Nature" className="mt-6">
              <p className="leading-8 text-white/65">
                {detail?.nature || "A unique landscape with its own local beauty."}
              </p>
            </Panel>

            <p className="mt-8 text-sm text-white/35">
              Population figures are approximate estimates.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/85 backdrop-blur-xl">
      {children}
    </span>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:p-6 ${className}`}>
      <h3 className="mb-4 text-sm uppercase tracking-[0.3em] text-white/40">{title}</h3>
      {children}
    </div>
  );
}

function InfoCard({ title, value, wide }: { title: string; value: string; wide?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl md:p-5 ${wide ? "md:col-span-2" : ""}`}>
      <h3 className="text-xs uppercase tracking-[0.28em] text-white/35">{title}</h3>
      <p className="mt-3 text-base font-black text-cyan-100 md:text-lg">{value}</p>
    </div>
  );
}
