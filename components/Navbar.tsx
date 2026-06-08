"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "culture", label: "Culture" },
  { id: "map", label: "Map" },
  { id: "gallery", label: "Gallery" },
  { id: "timeline", label: "Timeline" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element && window.scrollY >= element.offsetTop - 220) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[94%] max-w-7xl -translate-x-1/2">
      <nav className="premium-card flex items-center justify-between rounded-full px-5 py-3">
        <a href="#home" className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,1)]" />
          <span className="text-xs font-black tracking-[0.35em] text-white md:text-sm">
            AFGHANISTAN
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`rounded-full px-4 py-2 text-sm transition ${
                active === section.id
                  ? "bg-white text-black"
                  : "text-white/55 hover:bg-white/10 hover:text-white"
              }`}
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
