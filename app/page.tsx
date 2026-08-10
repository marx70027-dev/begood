"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CookieConsent from "@/components/ui/cookie-consent";
import LaunchButton from "@/components/ui/launch-button";
import BusinessForm from "@/components/ui/business-form";
import RocketScene from "@/components/ui/rocket-scene";

type Phase = "cookie" | "rocket" | "launching" | "form";

const headingFont = "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("cookie");
  const [showSmoke, setShowSmoke] = useState(false);
  const [rocketY, setRocketY] = useState(0);

  useEffect(() => {
    const accepted = document.cookie.includes("cookies_accepted=true");
    if (accepted) setPhase("rocket");
  }, []);

  const handleAcceptCookies = useCallback(() => {
    document.cookie = "cookies_accepted=true; max-age=31536000; path=/; SameSite=Strict";
    setPhase("rocket");
  }, []);

  const handleLaunch = useCallback(() => {
    setPhase("launching");
    setShowSmoke(true);

    let start: number | null = null;
    const duration = 2500;

    function animate(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setRocketY(-eased * 120);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => setPhase("form"), 400);
      }
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="bg-black min-h-screen overflow-hidden">
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
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="fixed inset-0 z-50"
          >
            {/* Rocket scene with launch animation */}
            <motion.div
              className="absolute inset-0"
              style={{ transform: `translateY(${rocketY}vh)` }}
            >
              <RocketScene />
            </motion.div>

            {/* Smoke effect */}
            <AnimatePresence>
              {showSmoke && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0.5 }}
                  animate={{ opacity: 1, scaleX: 1.5, y: -20 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-white/40 via-orange-300/20 to-transparent blur-xl pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Fire glow during launch */}
            <AnimatePresence>
              {phase === "launching" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.8, 1] }}
                  transition={{ duration: 0.5, repeat: 5, repeatType: "reverse" }}
                  className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full bg-orange-500/60 blur-3xl pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Title + Launch button */}
            {phase === "rocket" && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center z-10"
              >
                <div className="text-center mb-8">
                  <h1
                    className="text-5xl md:text-7xl text-white mb-3 drop-shadow-2xl"
                    style={{ fontFamily: headingFont }}
                  >
                    web<span className="text-white/50">lirev</span>.com
                  </h1>
                  <p className="text-white/60 text-lg md:text-xl">
                    Your website awaits — press Launch
                  </p>
                </div>
                <LaunchButton onClick={handleLaunch} />
              </motion.div>
            )}

            {/* Launching text */}
            {phase === "launching" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              >
                <motion.p
                  initial={{ scale: 2, opacity: 0 }}
                  animate={{ scale: 1, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.5, times: [0, 0.1, 0.7, 1] }}
                  className="text-6xl font-black text-white drop-shadow-2xl"
                  style={{ fontFamily: headingFont }}
                >
                  Launching...
                </motion.p>
              </motion.div>
            )}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
