"use client";

import { motion } from "framer-motion";
import { Playfair_Display, DM_Sans } from "next/font/google";
import SpotlightReveal from "@/components/ui/spotlight-reveal";
import Video360Scrub from "@/components/ui/video-360-scrub";
import { useState } from "react";
import styles from "./showcase.module.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm",
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
  { label: "Engine", value: "689cc", detail: "CP2 Parallel-Twin" },
  { label: "Power", value: "72 hp", detail: "@ 9,000 RPM" },
  { label: "Torque", value: "68 Nm", detail: "50 lb-ft" },
  { label: "Gears", value: "6-Speed", detail: "Transmission" },
  { label: "Weight", value: "204 kg", detail: "450 lbs wet" },
  { label: "Seat", value: "875 mm", detail: "34.4 inches" },
  { label: "Fuel", value: "16 L", detail: "4.2 gallons" },
  { label: "Clearance", value: "240 mm", detail: "9.5 inches" },
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
    color: "#3d6aff",
  },
  {
    title: "43mm USD Forks",
    text: "Fully adjustable upside-down forks that swallow rocks, ruts, and jumps like breakfast.",
    color: "#a855f7",
  },
  {
    title: "Rally Position",
    text: "Stand on the pegs. Grip the tank. Total control at any speed, any terrain. Built for standing riders.",
    color: "#ec4899",
  },
];

export default function ShowcasePage() {
  const [activeSpec, setActiveSpec] = useState<number | null>(null);
  const [expandedFact, setExpandedFact] = useState<number | null>(null);

  return (
    <div
      className={`${playfair.variable} ${dmSans.variable} min-h-screen overflow-x-hidden`}
      style={{ background: "#ffffff", color: "#111111" }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <span
          className="text-sm font-bold tracking-[4px] uppercase"
          style={{ fontFamily: "var(--font-dm)", color: "#111" }}
        >
          Ténéré <span className={styles.gradientText}>700</span>
        </span>
        <button className={styles.glowBtn} style={{ fontFamily: "var(--font-dm)" }}>
          Explore
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-36 pb-20 px-[5%]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="text-xs tracking-[6px] uppercase font-medium block mb-6"
              style={{ color: "#3d6aff", fontFamily: "var(--font-dm)" }}
            >
              Yamaha — Adventure Series
            </span>
            <h1
              className="text-6xl sm:text-7xl md:text-[7rem] font-black leading-[0.85] mb-8"
              style={{ fontFamily: "var(--font-playfair)", color: "#111" }}
            >
              Born from<br />
              the{" "}
              <em className={styles.gradientText} style={{ fontStyle: "italic", fontWeight: 400 }}>
                Sahara.
              </em>
            </h1>
            <div className="flex items-end justify-between flex-wrap gap-8">
              <p
                className="text-lg max-w-md leading-relaxed"
                style={{
                  color: "rgba(0,0,0,0.45)",
                  fontFamily: "var(--font-dm)",
                  fontWeight: 300,
                }}
              >
                Built to go anywhere. Hover the image to peek at the alternate colorway hiding underneath.
              </p>
              <div className="flex gap-4">
                <button className={styles.glowBtn} style={{ fontFamily: "var(--font-dm)" }}>
                  See Specs
                </button>
                <button
                  className="px-7 py-3.5 rounded-lg text-xs uppercase font-bold tracking-[3px] transition-all duration-200 hover:bg-black hover:text-white"
                  style={{
                    border: "1px solid rgba(0,0,0,0.15)",
                    color: "#111",
                    fontFamily: "var(--font-dm)",
                  }}
                >
                  360° View
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPOTLIGHT REVEAL */}
      <section className="px-[5%] pb-28 max-w-[1200px] mx-auto">
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
            className="text-center mt-5 text-xs tracking-[4px] uppercase"
            style={{ color: "rgba(0,0,0,0.25)", fontFamily: "var(--font-dm)" }}
          >
            Hover to reveal &middot; Competition White beneath Raven Black
          </p>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(61,106,255,0.3), rgba(168,85,247,0.3), transparent)" }} />
      </div>

      {/* SPECS */}
      <section className="px-[5%] py-28 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span
            className="text-xs tracking-[6px] uppercase font-medium block mb-4"
            style={{ color: "#3d6aff", fontFamily: "var(--font-dm)" }}
          >
            The Numbers
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Raw <em className={styles.gradientText} style={{ fontStyle: "italic", fontWeight: 400 }}>Specs</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SPECS.map((spec, i) => (
            <motion.div
              key={spec.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`${styles.specCard} rounded-xl p-6`}
              style={{
                background: activeSpec === i ? "rgba(61, 106, 255, 0.04)" : "#fafafa",
                border: activeSpec === i
                  ? "1px solid rgba(61, 106, 255, 0.3)"
                  : "1px solid rgba(0,0,0,0.06)",
              }}
              onClick={() => setActiveSpec(activeSpec === i ? null : i)}
            >
              <span
                className="text-[10px] tracking-[3px] uppercase block mb-2 font-medium"
                style={{ color: "rgba(0,0,0,0.35)", fontFamily: "var(--font-dm)" }}
              >
                {spec.label}
              </span>
              <span
                className={`text-3xl font-black block ${styles.counterValue}`}
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {spec.value}
              </span>
              {activeSpec === i && (
                <motion.span
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs block mt-2 font-medium"
                  style={{ color: "#3d6aff", fontFamily: "var(--font-dm)" }}
                >
                  {spec.detail}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div className="max-w-[1200px] mx-auto px-[5%]">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(236,72,153,0.3), transparent)" }} />
      </div>

      {/* 360 VIDEO */}
      <section className="px-[5%] py-28 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span
            className="text-xs tracking-[6px] uppercase font-medium block mb-4"
            style={{ color: "#a855f7", fontFamily: "var(--font-dm)" }}
          >
            Interactive
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Spin it <em className={styles.gradientText} style={{ fontStyle: "italic", fontWeight: 400 }}>around.</em>
          </h2>
          <p
            className="text-base max-w-md"
            style={{ color: "rgba(0,0,0,0.4)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
          >
            Drag left or right to rotate the bike. Full 360 degrees of control.
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
            className="border border-black/8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] rounded-2xl"
          />
        </motion.div>
      </section>

      {/* DARK SECTION — FUN FACTS */}
      <section
        className="py-28"
        style={{ background: "linear-gradient(135deg, #0a0a12, #151520)", color: "#fff" }}
      >
        <div className="px-[5%] max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <span
              className="text-xs tracking-[6px] uppercase font-medium block mb-4"
              style={{ color: "#ec4899", fontFamily: "var(--font-dm)" }}
            >
              Deep Cuts
            </span>
            <h2
              className="text-5xl sm:text-6xl font-black"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Things you didn&apos;t{" "}
              <em className={styles.gradientText} style={{ fontStyle: "italic", fontWeight: 400 }}>know.</em>
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
                className={`${styles.factCard} rounded-xl overflow-hidden`}
                style={{
                  background: expandedFact === i
                    ? "rgba(100, 140, 255, 0.08)"
                    : "rgba(255,255,255,0.04)",
                  border: expandedFact === i
                    ? "1px solid rgba(100, 140, 255, 0.3)"
                    : "1px solid rgba(255,255,255,0.08)",
                }}
                onClick={() => setExpandedFact(expandedFact === i ? null : i)}
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-5">
                    <span
                      className="px-3 py-1 rounded-full font-bold tracking-[2px] uppercase"
                      style={{
                        background: `rgba(${i % 2 === 0 ? "61, 106, 255" : "168, 85, 247"}, 0.15)`,
                        color: i % 2 === 0 ? "#648cff" : "#c084fc",
                        fontFamily: "var(--font-dm)",
                        fontSize: "9px",
                      }}
                    >
                      {fact.tag}
                    </span>
                    <h3
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {fact.title}
                    </h3>
                  </div>
                  <span
                    className="text-xl font-light transition-transform duration-300"
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
                    className="px-6 pb-6"
                  >
                    <p
                      className="text-sm leading-[1.8] pl-[calc(3rem+20px)]"
                      style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
                    >
                      {fact.text}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-[5%] py-28 max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span
            className="text-xs tracking-[6px] uppercase font-medium block mb-4"
            style={{ color: "#f97316", fontFamily: "var(--font-dm)" }}
          >
            What Sets It Apart
          </span>
          <h2
            className="text-5xl sm:text-6xl font-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Why this bike hits{" "}
            <em className={styles.gradientText} style={{ fontStyle: "italic", fontWeight: 400 }}>different.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`${styles.featureCard} rounded-2xl p-8`}
              style={{
                background: "#fafafa",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="w-12 h-1 rounded-full mb-6"
                style={{ background: feat.color }}
              />
              <h3
                className="text-xl font-black mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {feat.title}
              </h3>
              <p
                className="text-sm leading-[1.8]"
                style={{ color: "rgba(0,0,0,0.45)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
              >
                {feat.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-[5%] pb-28 max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #0a0a12, #151520)",
            color: "#fff",
          }}
        >
          <h2
            className="text-5xl sm:text-6xl font-black mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to <em className={styles.gradientText} style={{ fontStyle: "italic", fontWeight: 400 }}>ride?</em>
          </h2>
          <p
            className="text-base mb-10 max-w-md mx-auto"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-dm)", fontWeight: 300 }}
          >
            The desert is calling. Answer it.
          </p>
          <button className={styles.glowBtnDark} style={{ fontFamily: "var(--font-dm)" }}>
            Find a dealer
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer
        className="text-center py-10"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.06)",
          fontFamily: "var(--font-dm)",
        }}
      >
        <p className="text-[11px] tracking-[3px] uppercase" style={{ color: "rgba(0,0,0,0.25)" }}>
          Yamaha Ténéré 700 &middot; Interactive Showcase &middot; 689cc CP2 &middot; Built for Adventure
        </p>
      </footer>
    </div>
  );
}
