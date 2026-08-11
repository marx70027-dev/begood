"use client";

import { motion } from "framer-motion";
import SpotlightReveal from "@/components/ui/spotlight-reveal";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const SPECS = [
  { label: "Engine", value: "689cc CP2 Parallel-Twin" },
  { label: "Power", value: "72 hp" },
  { label: "Torque", value: "68 Nm (50 lb-ft)" },
  { label: "Transmission", value: "6-Speed" },
  { label: "Weight", value: "204 kg (450 lbs)" },
  { label: "Seat Height", value: "875 mm (34.4 in)" },
  { label: "Fuel Tank", value: "16 L (4.2 gal)" },
  { label: "Ground Clearance", value: "240 mm (9.5 in)" },
];

const FUN_FACTS = [
  {
    title: "Rally-Inspired Headlight",
    text: "The distinctive 4-LED headlight setup is directly styled after Yamaha's Dakar Rally race bikes — form meets function.",
  },
  {
    title: 'What\'s in a Name?',
    text: '"Ténéré" comes from a vast desert region in the south-central Sahara. Yamaha has used it since the 1980s for its desert-proven dual-sport bikes.',
  },
  {
    title: '"Keep It Simple" Philosophy',
    text: "Unlike modern adventure bikes loaded with electronics, the T7 was built intentionally simple: raw throttle, long-travel suspension, pure mechanical feel.",
  },
  {
    title: "Indestructible Engine",
    text: "The CP2 engine is the same parallel-twin used in the MT-07 — famous worldwide for being virtually bulletproof and ultra-reliable.",
  },
  {
    title: "Off-Road Built",
    text: "21-inch front / 18-inch rear wheels — the gold standard sizing for serious off-road dirt bike tires.",
  },
];

const STANDOUT_FEATURES = [
  {
    title: "Switchable ABS",
    text: "Disable the rear ABS (or full ABS) at the press of a button for dirt, ice, or loose gravel.",
  },
  {
    title: "USD Forks",
    text: "Heavy-duty 43mm fully adjustable upside-down front forks — built to absorb rocks, bumps, and jumps.",
  },
  {
    title: "Rally Cockpit",
    text: "Upright riding position designed for standing on the footpegs with total control on rugged trails.",
  },
];

export default function ShowcasePage() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: "#0a0a0f",
        color: "#ffffff",
      }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16 border-b"
        style={{
          background: "rgba(10, 10, 15, 0.92)",
          backdropFilter: "blur(12px)",
          borderColor: "rgba(0, 230, 255, 0.15)",
        }}
      >
        <span
          className="text-lg font-bold tracking-widest uppercase"
          style={{ fontFamily: "'Arial Black', Arial, sans-serif", color: "#00e6ff" }}
        >
          T7 Showcase
        </span>
        <span
          className="text-xs tracking-wider uppercase"
          style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Arial, sans-serif" }}
        >
          Yamaha Ténéré 700
        </span>
      </nav>

      {/* HERO */}
      <section className="pt-28 pb-16 px-[5%] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block text-xs tracking-[4px] uppercase px-4 py-1.5 rounded-full mb-6"
            style={{
              background: "rgba(0, 230, 255, 0.1)",
              border: "1px solid rgba(0, 230, 255, 0.3)",
              color: "#00e6ff",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Adventure Redefined
          </span>
          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-4"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            Yamaha Ténéré{" "}
            <span style={{ color: "#00e6ff" }}>700</span>
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Arial, sans-serif" }}
          >
            Born from the Sahara. Built for everywhere else. Hover over the image
            below to reveal the Raven Black colorway beneath the Competition White.
          </p>
        </motion.div>
      </section>

      {/* SPOTLIGHT REVEAL */}
      <section className="px-[5%] pb-20 max-w-[1100px] mx-auto">
        <SpotlightReveal
          baseSrc="/black_motorcycle.jpg"
          revealSrc="/white_motorcycle.jpg"
          radius={50}
          lerpFactor={0.15}
          hudColor="rgba(0, 230, 255, 0.8)"
          hudLabel="RALLY LIVERY"
        />
        <p
          className="text-center mt-4 text-xs tracking-wider uppercase"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Arial, sans-serif" }}
        >
          Move your cursor / drag to reveal the alternate colorway
        </p>
      </section>

      {/* SPECS GRID */}
      <section className="px-[5%] pb-20 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span
            className="text-xs tracking-[4px] uppercase block mb-2"
            style={{ color: "#00e6ff", fontFamily: "Arial, sans-serif" }}
          >
            Technical Data
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            Key Specifications
          </h2>
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
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="text-xs tracking-wider uppercase block mb-2"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Arial, sans-serif" }}
              >
                {spec.label}
              </span>
              <span
                className="text-lg font-bold block"
                style={{ fontFamily: "'Arial Black', Arial, sans-serif", color: "#ffffff" }}
              >
                {spec.value}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FUN FACTS */}
      <section className="px-[5%] pb-20 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span
            className="text-xs tracking-[4px] uppercase block mb-2"
            style={{ color: "#00e6ff", fontFamily: "Arial, sans-serif" }}
          >
            Did You Know?
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            5 Fun Facts
          </h2>
        </motion.div>

        <div className="space-y-4">
          {FUN_FACTS.map((fact, i) => (
            <motion.div
              key={fact.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-5 rounded-xl p-6"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                className="text-2xl font-bold shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(0, 230, 255, 0.1)",
                  color: "#00e6ff",
                  fontFamily: "'Arial Black', Arial, sans-serif",
                }}
              >
                {i + 1}
              </span>
              <div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
                >
                  {fact.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Arial, sans-serif" }}
                >
                  {fact.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STANDOUT FEATURES */}
      <section className="px-[5%] pb-24 max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span
            className="text-xs tracking-[4px] uppercase block mb-2"
            style={{ color: "#00e6ff", fontFamily: "Arial, sans-serif" }}
          >
            What Sets It Apart
          </span>
          <h2
            className="text-3xl sm:text-4xl font-bold"
            style={{ fontFamily: "'Arial Black', Arial, sans-serif" }}
          >
            Standout Features
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {STANDOUT_FEATURES.map((feat, i) => (
            <motion.div
              key={feat.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(0, 230, 255, 0.04)",
                border: "1px solid rgba(0, 230, 255, 0.15)",
              }}
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "'Arial Black', Arial, sans-serif", color: "#00e6ff" }}
              >
                {feat.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.55)", fontFamily: "Arial, sans-serif" }}
              >
                {feat.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="text-center py-6 border-t"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
          Yamaha Ténéré 700 Interactive Showcase &middot; 689cc CP2 &middot; 72 hp &middot; Built for Adventure
        </p>
      </footer>
    </div>
  );
}
