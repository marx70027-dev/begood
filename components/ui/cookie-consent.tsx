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
  { id: "essential", name: "Essential", desc: "Required for basic site functionality.", icon: <Shield className="size-4" />, required: true },
  { id: "analytics", name: "Analytics", desc: "Help us understand how you use the site.", icon: <BarChart3 className="size-4" /> },
  { id: "marketing", name: "Marketing", desc: "Used for personalized advertising.", icon: <Megaphone className="size-4" /> },
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
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden">
            <div className="flex items-center justify-between p-5 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Cookie className="size-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-gray-900">Cookies</h3>
              </div>
              <button onClick={rejectAll} className="text-gray-300 hover:text-gray-500 transition-colors" aria-label="Close">
                <X className="size-4" />
              </button>
            </div>

            <div className="px-5 pb-4">
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                We use cookies to improve your experience, analyze traffic,
                and personalize content.
              </p>

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
                              ? "border-blue-200 bg-blue-50/50"
                              : "border-gray-100 bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-gray-400">{cat.icon}</span>
                            <div>
                              <span className="text-xs font-medium text-gray-700">{cat.name}</span>
                              {cat.required && (
                                <span className="ml-1.5 text-[10px] text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">
                                  Required
                                </span>
                              )}
                              <p className="text-[11px] text-gray-400 mt-0.5">{cat.desc}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              if (cat.required) return;
                              setPrefs((p) => ({ ...p, [cat.id]: !p[cat.id] }));
                            }}
                            disabled={cat.required}
                            className={`w-9 h-5 rounded-full transition-colors flex-shrink-0 relative cursor-pointer disabled:cursor-not-allowed ${
                              prefs[cat.id] ? "bg-blue-500" : "bg-gray-200"
                            }`}
                            aria-label={`Toggle ${cat.name}`}
                          >
                            <span
                              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
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

            <div className="px-5 pb-5 flex gap-2">
              <button
                onClick={acceptAll}
                className="flex-1 bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Accept all
              </button>
              <button
                onClick={() => {
                  if (expanded) {
                    save(prefs);
                  } else {
                    setExpanded(true);
                  }
                }}
                className="flex-1 border border-gray-200 text-gray-600 text-xs font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {expanded ? "Save preferences" : "Customize"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
