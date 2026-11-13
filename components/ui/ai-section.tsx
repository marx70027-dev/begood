"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

const headingFont = "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif";

function useTypewriter(text: string, active: boolean, speed = 28) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [active, text, speed]);
  return out;
}

export default function AiSection() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const command = useTypewriter(`curl weblirev.com/llms.txt`, inView, 35);
  const showResults = inView && command.length >= `curl weblirev.com/llms.txt`.length;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  };

  return (
    <section ref={ref} className="border-t border-white/10 py-20 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-white text-black text-xs font-black tracking-[2px] uppercase px-3 py-1.5 rounded mb-4">
            {t.aiTag}
          </span>
          <h2
            className="text-2xl md:text-4xl text-white mb-4 leading-tight"
            style={{ fontFamily: headingFont }}
          >
            {t.aiTitle}
          </h2>
          <p className="text-white/50 text-sm md:text-base leading-relaxed">{t.aiBody}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          animate={{ rotateX: tilt.x, rotateY: tilt.y }}
          style={{ transformPerspective: 800 }}
          className="bg-black border border-white/15 rounded-2xl p-5 font-mono text-xs md:text-sm shadow-[0_0_40px_rgba(255,59,59,0.08)]"
        >
          <div className="flex gap-1.5 mb-4">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <p className="text-white/40 mb-1">{t.aiCommandLabel}</p>
          <p className="text-green-400">
            <span className="text-white/30">$ </span>
            {command}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2 bg-green-400 ml-0.5 align-middle"
              style={{ height: "1em" }}
            />
          </p>
          {showResults && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-3 pl-0 space-y-1 text-white/70"
            >
              <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                {t.aiResultLine1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-green-400 font-bold"
              >
                {t.aiResultLine2}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
