"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CookieConsentProps {
  visible: boolean;
  onAccept: () => void;
}

export default function CookieConsent({ visible, onAccept }: CookieConsentProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            <div className="text-4xl mb-4">🍪</div>
            <h2
              className="text-2xl font-black text-white mb-3"
              style={{ fontFamily: "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif" }}
            >
              We Use Cookies
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              This website uses cookies to improve your browsing experience.
              By continuing to use this site, you agree to the use of cookies
              in accordance with our privacy policy.
            </p>
            <div className="flex gap-3">
              <button
                onClick={onAccept}
                className="flex-1 bg-white text-black font-black text-sm py-3 px-6 rounded-xl hover:bg-white/90 transition-all cursor-pointer active:scale-95"
              >
                Accept
              </button>
            </div>
            <p className="text-white/30 text-xs mt-4 text-center">
              weblirev.com &mdash; Your privacy matters to us
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
