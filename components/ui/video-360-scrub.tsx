"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface Video360ScrubProps {
  src: string;
  className?: string;
}

export default function Video360Scrub({ src, className = "" }: Video360ScrubProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const [ready, setReady] = useState(false);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    const onLoaded = () => {
      video.currentTime = 0;
      setReady(true);
    };
    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, [src]);

  const scrub = useCallback((deltaX: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const sensitivity = video.duration / (containerRef.current?.clientWidth || 800);
    let newTime = video.currentTime + deltaX * sensitivity;
    if (newTime < 0) newTime = video.duration + newTime;
    if (newTime > video.duration) newTime = newTime - video.duration;
    video.currentTime = newTime;
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    setHint(false);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    scrub(delta);
  }, [scrub]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDragging.current = true;
      lastX.current = e.touches[0].clientX;
      setHint(false);
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length === 0) return;
    const delta = e.touches[0].clientX - lastX.current;
    lastX.current = e.touches[0].clientX;
    scrub(delta);
  }, [scrub]);

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl ${className}`}
      style={{ cursor: isDragging.current ? "grabbing" : "grab", touchAction: "none" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        className="w-full h-auto block"
        style={{ pointerEvents: "none" }}
      />
      {hint && ready && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium tracking-wide uppercase animate-pulse"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12H19M5 12L9 8M5 12L9 16M19 12L15 8M19 12L15 16" />
            </svg>
            Drag to rotate
          </div>
        </div>
      )}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#111" }}>
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
