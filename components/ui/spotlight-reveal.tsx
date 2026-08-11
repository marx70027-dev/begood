"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface SpotlightRevealProps {
  baseSrc: string;
  revealSrc: string;
  baseAlt?: string;
  revealAlt?: string;
  radius?: number;
  lerpFactor?: number;
  hudColor?: string;
  hudLabel?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function SpotlightReveal({
  baseSrc,
  revealSrc,
  baseAlt = "Base image",
  revealAlt: _revealAlt,
  radius = 40,
  lerpFactor = 0.2,
  hudColor: _hudColor = "rgba(0, 230, 255, 0.8)",
  hudLabel: _hudLabel = "REVEAL",
  title,
  subtitle,
  className = "",
}: SpotlightRevealProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealImgRef = useRef<HTMLImageElement | null>(null);
  const baseImgRef = useRef<HTMLImageElement>(null);
  const animFrameRef = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);

  const targetRef = useRef({ x: -1000, y: -1000 });
  const currentRef = useRef({ x: -1000, y: -1000 });
  const activeRef = useRef(false);

  useEffect(() => {
    const img = new Image();
    img.src = revealSrc;
    img.onload = () => setLoaded(true);
    revealImgRef.current = img;
  }, [revealSrc]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    canvas.width = stage.clientWidth;
    canvas.height = stage.clientHeight;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      if (activeRef.current && revealImgRef.current && loaded) {
        const cur = currentRef.current;
        const tgt = targetRef.current;
        cur.x += (tgt.x - cur.x) * lerpFactor;
        cur.y += (tgt.y - cur.y) * lerpFactor;

        ctx!.save();
        ctx!.beginPath();
        ctx!.arc(cur.x, cur.y, radius, 0, Math.PI * 2);
        ctx!.clip();
        ctx!.drawImage(revealImgRef.current, 0, 0, canvas!.width, canvas!.height);
        ctx!.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [loaded, radius, lerpFactor]);

  const handlePointerMove = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      targetRef.current.x = clientX - rect.left;
      targetRef.current.y = clientY - rect.top;
      activeRef.current = true;
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handlePointerMove(e.clientX, e.clientY),
    [handlePointerMove]
  );

  const handleMouseLeave = useCallback(() => {
    activeRef.current = false;
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [handlePointerMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    },
    [handlePointerMove]
  );

  const handleTouchEnd = useCallback(() => {
    activeRef.current = false;
  }, []);

  return (
    <div className={className}>
      {(title || subtitle) && (
        <div className="text-center mb-5">
          {title && (
            <h2 className="text-2xl font-bold tracking-wide uppercase text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div
        ref={stageRef}
        className="relative rounded-xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_15px_rgba(0,230,255,0.1)] border border-white/10"
        style={{ touchAction: "none" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={baseImgRef}
          src={baseSrc}
          alt={baseAlt}
          className="block w-full h-auto select-none"
          draggable={false}
          onLoad={resizeCanvas}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
      </div>
    </div>
  );
}
