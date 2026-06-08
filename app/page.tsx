import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import GlobalCinematicEffects from "@/components/GlobalCinematicEffects";

import OpeningStorySection from "@/sections/OpeningStorySection";
import CultureSection from "@/sections/CultureSection";
import MapSection from "@/sections/MapSection";
import GallerySection from "@/sections/GallerySection";
import TimelineSection from "@/sections/TimelineSection";
import EndingSection from "@/sections/EndingSection";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <SmoothScroll />
      <ScrollProgress />
      <GlobalCinematicEffects />
      <Navbar />

      <main className="bg-black text-white">
        <OpeningStorySection />
        <CultureSection />
        <MapSection />
        <GallerySection />
        <TimelineSection />
        <EndingSection />
      </main>
    </>
  );
}
