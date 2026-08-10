"use client";

import { useEffect, useRef } from "react";

export default function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let ready = false;
    function onLoaded() {
      ready = true;
    }
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) ready = true;

    const v = video;
    const c = container;

    function onScroll() {
      if (!ready || !v.duration) return;
      const rect = c.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = c.offsetHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, scrolled / total));
      v.currentTime = pct * v.duration;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", onLoaded);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>
    </div>
  );
}
