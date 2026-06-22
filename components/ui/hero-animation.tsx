"use client";

import { useEffect, useRef } from "react";

export default function HeroAnimation() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const TOTAL = 300;
    const FPS = 15;
    const cache: HTMLImageElement[] = [];
    const ready: boolean[] = new Array(TOTAL).fill(false);
    let current = 0;
    let lastTime = 0;
    let rafId: number;
    let started = false;

    function pad(n: number) {
      return String(n).padStart(3, "0");
    }
    function src(i: number) {
      return `/frames/ezgif-frame-${pad(i + 1)}.jpg`;
    }

    function tick(ts: number) {
      if (ts - lastTime >= 1000 / FPS) {
        lastTime = ts;
        let next = (current + 1) % TOTAL;
        let tries = 0;
        while (!ready[next] && tries++ < TOTAL) next = (next + 1) % TOTAL;
        if (ready[next] && imgRef.current) {
          current = next;
          imgRef.current.src = cache[current].src;
        }
      }
      rafId = requestAnimationFrame(tick);
    }

    function loadFrame(i: number) {
      const img = new Image();
      img.onload = () => {
        cache[i] = img;
        ready[i] = true;
        if (i === 0 && !started && imgRef.current) {
          imgRef.current.src = img.src;
          started = true;
          rafId = requestAnimationFrame(tick);
        }
      };
      img.src = src(i);
    }

    function loadBatch(start: number, end: number) {
      for (let i = start; i < Math.min(end, TOTAL); i++) loadFrame(i);
    }

    loadBatch(0, 30);
    const t1 = setTimeout(() => loadBatch(30, 100), 300);
    const t2 = setTimeout(() => loadBatch(100, 200), 1000);
    const t3 = setTimeout(() => loadBatch(200, 300), 2200);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/frames/ezgif-frame-001.jpg"
      alt="BeGood radovi"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
  );
}
