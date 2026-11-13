"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CookieConsent from "@/components/ui/cookie-consent";
import LaunchButton from "@/components/ui/launch-button";
import BusinessForm from "@/components/ui/business-form";
import Logo from "@/components/ui/logo";
import LanguageToggle from "@/components/ui/language-toggle";
import AiSection from "@/components/ui/ai-section";
import ScrollProgress from "@/components/ui/scroll-progress";
import StickyCta from "@/components/ui/sticky-cta";
import BackToTop from "@/components/ui/back-to-top";
import StatsSection from "@/components/ui/stats-section";
import { LanguageProvider, useLanguage } from "@/lib/i18n";

type Phase = "cookie" | "rocket" | "launching" | "form";

const headingFont = "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif";
const IDLE_END = 1.0;

const CITIES = [
  "Zagreb",
  "Split",
  "Rijeka",
  "Osijek",
  "Zadar",
  "Slavonski Brod",
  "Pula",
  "Sesvete",
  "Karlovac",
  "Varaždin",
  "Dubrovnik",
  "Šibenik",
  "Sisak",
  "Velika Gorica",
];

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}

function HomeContent() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>("cookie");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const accepted = document.cookie.includes("cookies_accepted=true");
    if (accepted) setPhase("rocket");
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (phase === "rocket") {
      vid.currentTime = 0;
      vid.play().catch(() => {});

      const onTime = () => {
        if (phase === "rocket" && vid.currentTime >= IDLE_END) {
          vid.currentTime = 0;
        }
      };
      vid.addEventListener("timeupdate", onTime);
      return () => vid.removeEventListener("timeupdate", onTime);
    }
  }, [phase]);

  const handleAcceptCookies = useCallback(() => {
    document.cookie = "cookies_accepted=true; max-age=31536000; path=/; SameSite=Strict";
    setPhase("rocket");
  }, []);

  const handleLaunch = useCallback(() => {
    setPhase("launching");
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = IDLE_END;
      vid.play().catch(() => {});

      const onEnd = () => {
        setPhase("form");
        vid.removeEventListener("ended", onEnd);
      };
      vid.addEventListener("ended", onEnd);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      {phase !== "cookie" && <ScrollProgress />}
      {phase !== "cookie" && (
        <>
          <div className="fixed top-6 left-6 z-[60]">
            <Logo />
          </div>
          <div className="fixed top-6 right-6 z-[60]">
            <LanguageToggle />
          </div>
        </>
      )}
      {phase === "form" && (
        <>
          <StickyCta />
          <BackToTop />
        </>
      )}

      <CookieConsent
        visible={phase === "cookie"}
        onAccept={handleAcceptCookies}
      />

      <AnimatePresence>
        {(phase === "rocket" || phase === "launching") && (
          <motion.div
            key="rocket-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-50 bg-black"
          >
            <video
              ref={videoRef}
              src="/rocket-launch.mp4"
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

            {/* Title + Launch button */}
            <AnimatePresence>
              {phase === "rocket" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
                >
                  <div className="text-center mb-10 max-w-2xl mx-auto px-4 relative">
                    <div
                      className="absolute inset-0 -z-10 blur-3xl opacity-60"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 70%)",
                      }}
                    />
                    <motion.span
                      animate={{ boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.4)", "0 0 0px rgba(255,255,255,0)"] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="inline-block bg-white text-black text-[10px] md:text-xs font-black tracking-[3px] uppercase px-3 py-1.5 rounded-full mb-6"
                    >
                      WebliRev — Web Design
                    </motion.span>
                    <h1
                      className="text-3xl md:text-5xl lg:text-6xl text-white mb-5 leading-tight tracking-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: headingFont }}
                    >
                      {t.heroTitle}
                    </h1>
                    <p className="text-white/70 text-base md:text-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                      {t.heroSubtitle}
                    </p>
                    <p className="text-white/40 text-xs md:text-sm mt-4 uppercase tracking-[0.2em]">
                      {t.heroEnLine}
                    </p>
                  </div>
                  <LaunchButton onClick={handleLaunch} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Launching text */}
            <AnimatePresence>
              {phase === "launching" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <motion.p
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 3, times: [0, 0.1, 0.6, 1] }}
                    className="text-6xl font-black text-white drop-shadow-2xl"
                    style={{ fontFamily: headingFont }}
                  >
                    Launching...
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form phase */}
      <AnimatePresence>
        {phase === "form" && (
          <motion.div
            key="form-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <BusinessForm />

            <section className="border-t border-white/10 py-16 px-6 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-white/10 text-white/70 text-xs font-bold tracking-[2px] uppercase px-3 py-1.5 rounded-full mb-4 border border-white/10"
              >
                {t.citiesCount}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl text-white mb-3"
                style={{ fontFamily: headingFont }}
              >
                {t.citiesTitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/40 text-sm md:text-base max-w-xl mx-auto mb-8"
              >
                {t.citiesSubtitle}
              </motion.p>
              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {CITIES.map((city, i) => (
                  <motion.span
                    key={city}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.4)" }}
                    className="text-white/60 hover:text-white text-sm md:text-base px-4 py-2 rounded-full border border-white/10 cursor-default transition-colors"
                  >
                    {city}
                  </motion.span>
                ))}
              </div>
            </section>

            <StatsSection />

            <AiSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
