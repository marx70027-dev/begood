"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export default function StickyCta() {
  const { t } = useLanguage();
  const [formVisible, setFormVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const form = document.getElementById("contact-form");
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFormVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(form);

    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const visible = scrolled && !formVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToForm}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[65] bg-[#ff3b3b] hover:bg-[#ff5050] text-white text-sm font-black tracking-wide px-5 py-3 rounded-full shadow-[0_0_30px_rgba(255,59,59,0.5)] cursor-pointer"
        >
          {t.stickyCta}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
