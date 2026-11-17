"use client";

import { useEffect, useRef } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ProjectVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      poster={BASE + poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      className={className}
    >
      <source src={BASE + src} type="video/mp4" />
      <source src={BASE + src.replace(/\.mp4$/, ".webm")} type="video/webm" />
    </video>
  );
}
