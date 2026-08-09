"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Shield, BarChart3, Megaphone } from "lucide-react";

interface CookieCategory {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  required?: boolean;
}

const CATEGORIES: CookieCategory[] = [
  { id: "essential", name: "Neophodni", desc: "Potrebni za osnovne funkcije stranice.", icon: <Shield className="size-4" />, required: true },
  { id: "analytics", name: "Analitički", desc: "Pomažu nam razumjeti kako koristite stranicu.", icon: <BarChart3 className="size-4" /> },
  { id: "marketing", name: "Marketinški", desc: "Koriste se za personalizirane oglase.", icon: <Megaphone className="size-4" /> },
];

const STORAGE_KEY = "cookie_prefs";
const CONSENT_KEY = "cookie_consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) {
        const timer = setTimeout(() => setShow(true), 1500);
        return () => clearTimeout(timer);
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPrefs(JSON.parse(saved));
    } catch {
      setShow(true);
    }
  }, []);

  const save = useCallback((p: Record<string, boolean>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
      localStorage.setItem(CONSENT_KEY, "true");
    } catch {}
    setShow(false);
    setExpanded(false);
  }, []);

  const acceptAll = useCallback(() => {
    const all = { essential: true, analytics: true, marketing: true };
    setPrefs(all);
    save(all);
  }, [save]);

  const rejectAll = useCallback(() => {
    const min = { essential: true, analytics: false, marketing: false };
    setPrefs(min);
    save(min);
  }, [save]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-4 sm:right-auto z-[100] w-auto sm:max-w-sm"
        >
          <div className="bg-[#111] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-5 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Cookie className="size-4 text-violet-400" />
                </div>
                <h3 className="text-sm font-semibold text-white">Kolačići</h3>
              </div>
              <button onClick={rejectAll} className="text-white/20 hover:text-white/40 transition-colors" aria-label="Zatvori">
                <X className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-5 pb-4">
              <p className="text-xs text-white/35 leading-relaxed mb-4">
                Koristimo kolačiće za poboljšanje vašeg iskustva, analizu prometa
                i personalizaciju sadržaja.
              </p>

              {/* Expandable categories */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 mb-4">
                      {CATEGORIES.map((cat) => (
                        <div
                          key={cat.id}
                          className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                            prefs[cat.id]
                              ? "border-violet-500/20 bg-violet-500/5"
                              : "border-white/[0.06] bg-white/[0.02]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-white/30">{cat.icon}</span>
                            <div>
                              <span className="text-xs font-medium text-white/70">{cat.name}</span>
                              {cat.required && (
                                <span className="ml-1.5 text-[10px] text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">
                                  Obavezni
                                </span>
                              )}
                              <p className="text-[11px] text-white/25 mt-0.5">{cat.desc}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (cat.required) return;
                              setPrefs((p) => ({ ...p, [cat.id]: !p[cat.id] }));
                            }}
                            disabled={cat.required}
                            className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 relative cursor-pointer disabled:cursor-not-allowed ${
                              prefs[cat.id] ? "bg-violet-500" : "bg-white/10"
                            }`}
                            aria-label={`Toggle ${cat.name}`}
                          >
                            <span
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                                prefs[cat.id] ? "translate-x-[18px]" : "translate-x-0.5"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="px-5 pb-5 flex gap-2">
              <button
                onClick={acceptAll}
                className="flex-1 bg-white text-black text-xs font-semibold py-2.5 rounded-lg hover:bg-white/90 transition-colors cursor-pointer"
              >
                Prihvati sve
              </button>
              <button
                onClick={() => {
                  if (expanded) {
                    save(prefs);
                  } else {
                    setExpanded(true);
                  }
                }}
                className="flex-1 border border-white/10 text-white/60 text-xs font-medium py-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                {expanded ? "Spremi odabir" : "Prilagodi"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
