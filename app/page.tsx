"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CookieConsent from "@/components/ui/cookie-consent";
import LaunchButton from "@/components/ui/launch-button";
import BusinessForm from "@/components/ui/business-form";
import Logo from "@/components/ui/logo";

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
      {phase !== "cookie" && (
        <div className="fixed top-6 left-6 z-[60]">
          <Logo />
        </div>
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
                  className="absolute inset-0 flex flex-col items-center justify-center z-10"
                >
                  <div className="text-center mb-8">
                    <h1
                      className="text-4xl md:text-6xl text-white mb-3 drop-shadow-2xl"
                      style={{ fontFamily: headingFont }}
                    >
                      Izrada web stranica za cijelu Hrvatsku - 1000€ za bilo koji web
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl">
                      Zagreb, Split, Rijeka, Osijek, Zadar, Pula, Dubrovnik... Mala ili ogromna stranica, ista cijena 1000€. Domena, hosting, dizajn i SEO - sve uključeno.
                    </p>
                    <p className="text-white/40 text-sm md:text-base mt-2">
                      Any website anywhere in Croatia — same flat price 1000€.
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
              <h2
                className="text-2xl md:text-3xl text-white mb-6"
                style={{ fontFamily: headingFont }}
              >
                Radimo u svim gradovima
              </h2>
              <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                {CITIES.map((city) => (
                  <span
                    key={city}
                    className="text-white/60 text-sm md:text-base px-4 py-2 rounded-full border border-white/10"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
