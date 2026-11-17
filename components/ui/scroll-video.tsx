"use client";

import { useEffect, useRef } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const pad = (i: number) => String(i + 1).padStart(3, "0");

const DESKTOP = { count: 300, src: (i: number) => `${BASE}/frames/ezgif-frame-${pad(i)}.jpg` };
const MOBILE = { count: 100, src: (i: number) => `${BASE}/frames-m/f-${pad(i)}.jpg` };

export default function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !container || !ctx) return;

    const cfg = window.matchMedia("(max-width: 767px)").matches ? MOBILE : DESKTOP;
    const imgs: (HTMLImageElement | undefined)[] = new Array(cfg.count);
    let target = 0;
    let drawn = -1;
    let raf = 0;
    let next = 0;
    let inflight = 0;
    let dead = false;

    function nearest(i: number) {
      for (let d = 0; d < cfg.count; d++) {
        if (imgs[i - d]) return i - d;
        if (imgs[i + d]) return i + d;
      }
      return -1;
    }

    function draw() {
      raf = 0;
      const idx = nearest(target);
      if (idx < 0 || idx === drawn) return;
      const img = imgs[idx]!;
      const cw = canvas!.width;
      const ch = canvas!.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx!.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
      drawn = idx;
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(draw);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(canvas!.clientWidth * dpr);
      canvas!.height = Math.round(canvas!.clientHeight * dpr);
      drawn = -1;
      schedule();
    }

    function onScroll() {
      const rect = container!.getBoundingClientRect();
      const total = container!.offsetHeight - window.innerHeight;
      const pct = Math.max(0, Math.min(1, -rect.top / total));
      target = Math.round(pct * (cfg.count - 1));
      schedule();
    }

    function pump() {
      while (!dead && inflight < 6 && next < cfg.count) {
        const i = next++;
        const im = new Image();
        inflight++;
        im.onload = () => {
          imgs[i] = im;
          inflight--;
          schedule();
          pump();
        };
        im.onerror = () => {
          inflight--;
          pump();
        };
        im.src = cfg.src(i);
      }
    }

    resize();
    onScroll();
    pump();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>
    </div>
  );
}
