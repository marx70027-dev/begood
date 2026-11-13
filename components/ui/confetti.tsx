"use client";

import { motion } from "framer-motion";

const COLORS = ["#ff3b3b", "#ffbd2e", "#27c93f", "#3b82f6", "#ffffff"];

export default function Confetti() {
  const pieces = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.3;
        const duration = 1.8 + Math.random() * 1.2;
        const color = COLORS[i % COLORS.length];
        const rotateEnd = Math.random() * 720 - 360;
        const size = 6 + Math.random() * 6;

        return (
          <motion.span
            key={i}
            initial={{ y: -20, x: `${left}vw`, opacity: 1, rotate: 0 }}
            animate={{ y: "100vh", rotate: rotateEnd, opacity: [1, 1, 0] }}
            transition={{ duration, delay, ease: "easeIn" }}
            style={{
              position: "absolute",
              width: size,
              height: size * 1.6,
              backgroundColor: color,
              top: 0,
              borderRadius: 2,
            }}
          />
        );
      })}
    </div>
  );
}
