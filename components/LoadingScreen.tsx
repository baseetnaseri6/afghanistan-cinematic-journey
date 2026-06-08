"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-black md:text-7xl">
        AFGHANISTAN
      </h1>

      <p className="mt-4 text-white/60">
        The Land of Stories
      </p>

      <div className="mt-8 h-1 w-40 overflow-hidden rounded-full bg-white/10">
        <div className="h-full animate-pulse bg-white" />
      </div>
    </div>
  );
}
