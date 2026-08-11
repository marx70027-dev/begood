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
  const [grabbing, setGrabbing] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    const onCanPlay = () => setReady(true);
    video.addEventListener("canplay", onCanPlay);
    if (video.readyState >= 3) setReady(true);
    return () => video.removeEventListener("canplay", onCanPlay);
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

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    setHint(false);
    setGrabbing(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;
    scrub(delta);
  }, [scrub]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    setGrabbing(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      style={{ cursor: grabbing ? "grabbing" : "grab", touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
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
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              color: "#fff",
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
        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "#f5f5f5" }}>
          <div
            className="w-8 h-8 rounded-full animate-spin"
            style={{ border: "2px solid rgba(0,0,0,0.1)", borderTopColor: "rgb(61, 106, 255)" }}
          />
        </div>
      )}
    </div>
  );
}
