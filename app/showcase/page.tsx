"use client";

import { motion } from "framer-motion";
import { Outfit, Sora } from "next/font/google";
import SpotlightReveal from "@/components/ui/spotlight-reveal";
import Video360Scrub from "@/components/ui/video-360-scrub";
import { useState } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-outfit",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-sora",
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const SPECS = [
  { label: "Engine", value: "689cc", detail: "CP2 Parallel-Twin", icon: "⚡" },
  { label: "Power", value: "72 hp", detail: "@ 9,000 RPM", icon: "🔥" },
  { label: "Torque", value: "68 Nm", detail: "50 lb-ft", icon: "💪" },
  { label: "Gears", value: "6-Speed", detail: "Transmission", icon: "⚙️" },
  { label: "Weight", value: "204 kg", detail: "450 lbs wet", icon: "⚖️" },
  { label: "Seat", value: "875 mm", detail: "34.4 inches", icon: "🏍️" },
  { label: "Fuel", value: "16 L", detail: "4.2 gallons", icon: "⛽" },
  { label: "Clearance", value: "240 mm", detail: "9.5 inches", icon: "🏔️" },
];

const FUN_FACTS = [
  {
    title: "Rally DNA",
    text: "That 4-LED headlight? Straight from Yamaha's Dakar Rally machines. Not just looks — it's built to cut through Saharan dust storms.",
    tag: "Heritage",
  },
  {
    title: "Desert Name",
    text: "\"Ténéré\" = one of the most brutal desert regions on Earth. Yamaha's been slapping this name on their toughest bikes since the '80s.",
    tag: "Origins",
  },
  {
    title: "No Nonsense",
    text: "While others pile on electronics, Yamaha went raw. Pure throttle. Long-travel suspension. The kind of bike that makes you feel the road.",
    tag: "Philosophy",
  },
  {
    title: "Unkillable Engine",
    text: "Same CP2 engine as the MT-07 — a parallel-twin so reliable that mechanics worldwide call it bulletproof. Seriously.",
    tag: "Engineering",
  },
  {
    title: "Dirt Ready",
    text: "21\" front, 18\" rear — that's proper dirt bike sizing. Not \"adventure-lite\" — this thing was born to eat trails.",
    tag: "Off-Road",
  },
];

const FEATURES = [
  {
    title: "Kill the ABS",
    text: "One button. Rear ABS off. Full ABS off. Your call. Dirt, ice, gravel — ride it your way.",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "43mm USD Forks",
    text: "Fully adjustable upside-down forks that swallow rocks, ruts, and jumps like breakfast.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Rally Position",
    text: "Stand on the pegs. Grip the tank. Total control at any speed, any terrain. Built for standing riders.",
    gradient: "from-pink-500/20 to-orange-500/20",
  },
];

function GlowButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`glow-btn ${className}`}>
      {children}
    </button>
  );
}

export default function ShowcasePage() {
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [expandedFact, setExpandedFact] = useState<number | null>(null);

  return (
    <div
      className={`${outfit.variable} ${sora.variable} min-h-screen overflow-x-hidden`}
      style={{ background: "#08080c", color: "#e8e8ee" }}
    >
      <style jsx global>{`
        .glow-btn {
          position: relative;
          padding: 12px 28px;
          border-radius: 7px;
          border: 1px solid rgb(61, 106, 255);
          font-size: 13px;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 2px;
          background: transparent;
          color: #fff;
          overflow: hidden;
          box-shadow: 0 0 0 0 transparent;
          transition: all 0.2s ease-in;
          cursor: pointer;
          font-family: var(--font-sora);
        }
        .glow-btn:hover {
          background: rgb(61, 106, 255);
          box-shadow: 0 0 30px 5px rgba(61, 106, 255, 0.5);
          transition: all 0.2s ease-out;
        }
        .glow-btn:hover::before {
          animation: btn-shine 0.5s 0s linear;
        }
        .glow-btn::before {
          content: '';
          display: block;
          width: 0px;
          height: 86%;
          position: absolute;
          top: 7%;
          left: 0%;
          opacity: 0;
          background: #fff;
          box-shadow: 0 0 50px 30px #fff;
          transform: skewX(-20deg);
        }
        @keyframes btn-shine {
          from { opacity: 0; left: 0%; }
          50% { opacity: 1; }
          to { opacity: 0; left: 100%; }
        }
        .glow-btn:active {
          box-shadow: 0 0 0 0 transparent;
          transition: box-shadow 0.2s ease-in;
        }
        .spec-card {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .spec-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: rgba(61, 106, 255, 0.4) !important;
          box-shadow: 0 8px 32px rgba(61, 106, 255, 0.15);
        }
        .fact-card {
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          cursor: pointer;
        }
        .fact-card:hover {
          border-color: rgba(61, 106, 255, 0.3) !important;
        }
        .feature-card {
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .counter-value {
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16"
        style={{
          background: "rgba(8, 8, 12, 0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="text-base font-extrabold tracking-[3px] uppercase"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          <span style={{ color: "rgb(61, 106, 255)" }}>T7</span>
          <span style={{ color: "rgba(255,255,255,0.5)" }}> / </span>
          <span>Showcase</span>
        </span>
        <GlowButton>Explore</GlowButton>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-20 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 max-w-[60px]" style={{ background: "rgb(61, 106, 255)" }} />
              <span
                className="text-xs tracking-[5px] uppercase font-semibold"
                style={{ color: "rgb(61, 106, 255)", fontFamily: "var(--font-sora)" }}
              >
                Yamaha 2024
              </span>
            </div>
            <h1
              className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[0.9] mb-6"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Ténéré
              <br />
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, rgb(61, 106, 255), #a855f7, #ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                700
              </span>
            </h1>
            <p
              className="text-lg max-w-xl leading-relaxed mb-10"
              style={{
                color: "rgba(255,255,255,0.45)",
                fontFamily: "var(--font-sora)",
                fontWeight: 300,
              }}
            >
              Born from the Sahara. Built to go anywhere.
              Hover the image to reveal the alternate colorway.
            </p>
            <div className="flex gap-4">
              <GlowButton>See Specs</GlowButton>
              <button
                className="px-7 py-3 rounded-lg text-xs uppercase font-semibold tracking-widest transition-all duration-200 hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "var(--font-sora)",
                }}
              >
                360° View
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPOTLIGHT REVEAL */}
      <section className="px-[5%] pb-24 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SpotlightReveal
            baseSrc="/black_motorcycle.png"
            revealSrc="/white_motorcycle.png"
            radius={60}
            lerpFactor={0.12}
          />
          <p
            className="text-center mt-5 text-xs tracking-[3px] uppercase"
            style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-sora)" }}
          >
            Hover to reveal Competition White beneath Raven Black
          </p>
        </motion.div>
      </section>

      {/* SPECS */}
      <section className="px-[5%] pb-24 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "rgb(61, 106, 255)" }} />
              <span
                className="text-xs tracking-[4px] uppercase font-semibold"
                style={{ color: "rgb(61, 106, 255)", fontFamily: "var(--font-sora)" }}
              >
                Numbers
              </span>
            </div>
            <h2
              className="text-4xl sm:text-5xl font-extrabold"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Raw Specs
            </h2>
          </div>
          <p
            className="hidden md:block text-sm max-w-xs text-right"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sora)", fontWeight: 300 }}
          >
            Click any card to expand
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="spec-card rounded-xl p-5 cursor-pointer"
              style={{
                background: activeSpec === i
                  ? "rgba(61, 106, 255, 0.08)"
                  : "rgba(255,255,255,0.02)",
                border: activeSpec === i
                  ? "1px solid rgba(61, 106, 255, 0.3)"
                  : "1px solid rgba(255,255,255,0.06)",
              }}
              onClick={() => setActiveSpec(activeSpec === i ? null : i)}
            >
              <div className="text-2xl mb-3">{spec.icon}</div>
              <span
                className="text-[10px] tracking-[3px] uppercase block mb-1"
                style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-sora)" }}
              >
                {spec.label}
              </span>
              <span
                className="text-2xl font-extrabold block counter-value"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {spec.value}
              </span>
              {activeSpec === i && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs block mt-2"
                  style={{ color: "rgba(61, 106, 255, 0.8)", fontFamily: "var(--font-sora)" }}
                >
                  {spec.detail}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* 360 VIDEO */}
      <section className="px-[5%] pb-24 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: "rgb(61, 106, 255)" }} />
            <span
              className="text-xs tracking-[4px] uppercase font-semibold"
              style={{ color: "rgb(61, 106, 255)", fontFamily: "var(--font-sora)" }}
            >
              Interactive
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mb-3"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            360° View
          </h2>
          <p
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-sora)", fontWeight: 300 }}
          >
            Drag left or right to spin the bike around. Full control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Video360Scrub
            src="/t7-360.mp4"
            className="border border-white/6 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </section>

      {/* FUN FACTS */}
      <section className="px-[5%] pb-24 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: "rgb(61, 106, 255)" }} />
            <span
              className="text-xs tracking-[4px] uppercase font-semibold"
              style={{ color: "rgb(61, 106, 255)", fontFamily: "var(--font-sora)" }}
            >
              Deep Cuts
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Things You Didn&apos;t Know
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FUN_FACTS.map((fact, i) => (
            <motion.div
              key={fact.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="fact-card rounded-xl overflow-hidden"
              style={{
                background: expandedFact === i
                  ? "rgba(61, 106, 255, 0.06)"
                  : "rgba(255,255,255,0.02)",
                border: expandedFact === i
                  ? "1px solid rgba(61, 106, 255, 0.2)"
                  : "1px solid rgba(255,255,255,0.06)",
              }}
              onClick={() => setExpandedFact(expandedFact === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-semibold tracking-wider uppercase"
                    style={{
                      background: "rgba(61, 106, 255, 0.12)",
                      color: "rgb(61, 106, 255)",
                      fontFamily: "var(--font-sora)",
                      fontSize: "10px",
                    }}
                  >
                    {fact.tag}
                  </span>
                  <h3
                    className="text-base font-bold"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    {fact.title}
                  </h3>
                </div>
                <span
                  className="text-lg transition-transform duration-300"
                  style={{
                    transform: expandedFact === i ? "rotate(45deg)" : "rotate(0deg)",
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  +
                </span>
              </div>
              {expandedFact === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-5 pb-5"
                >
                  <p
                    className="text-sm leading-relaxed pl-[calc(3rem+16px)]"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sora)", fontWeight: 300 }}
                  >
                    {fact.text}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-[5%] pb-28 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8" style={{ background: "rgb(61, 106, 255)" }} />
            <span
              className="text-xs tracking-[4px] uppercase font-semibold"
              style={{ color: "rgb(61, 106, 255)", fontFamily: "var(--font-sora)" }}
            >
              Standout
            </span>
          </div>
          <h2
            className="text-4xl sm:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Why This Bike Hits Different
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`feature-card rounded-2xl p-7 bg-gradient-to-br ${feat.gradient}`}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-5 text-lg"
                style={{
                  background: "rgba(61, 106, 255, 0.15)",
                  color: "rgb(61, 106, 255)",
                }}
              >
                {i === 0 ? "⛔" : i === 1 ? "🔧" : "🏁"}
              </div>
              <h3
                className="text-xl font-extrabold mb-3"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {feat.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-sora)", fontWeight: 300 }}
              >
                {feat.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5%] pb-24 max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, rgba(61, 106, 255, 0.08), rgba(168, 85, 247, 0.06))",
            border: "1px solid rgba(61, 106, 255, 0.12)",
          }}
        >
          <h2
            className="text-4xl sm:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            Ready to ride?
          </h2>
          <p
            className="text-base mb-8 max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-sora)", fontWeight: 300 }}
          >
            The desert is calling. Answer it.
          </p>
          <GlowButton>Find a dealer</GlowButton>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer
        className="text-center py-8"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          fontFamily: "var(--font-sora)",
        }}
      >
        <p className="text-[11px] tracking-wider" style={{ color: "rgba(255,255,255,0.2)" }}>
          Yamaha Ténéré 700 &middot; Interactive Showcase &middot; 689cc CP2 &middot; Built for Adventure
        </p>
      </footer>
    </div>
  );
}
