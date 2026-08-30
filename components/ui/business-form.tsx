"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "Austria", "Switzerland", "France", "Italy", "Spain",
  "Netherlands", "Croatia", "Serbia", "Bosnia and Herzegovina",
  "Slovenia", "Montenegro", "Other",
];

const BUSINESS_TYPES = [
  "Restaurant / Cafe", "Retail / Shop", "Beauty Salon / Barbershop",
  "Fitness / Gym", "Legal Services / Law Firm", "Medical Practice",
  "Construction / Trades", "IT / Technology", "Marketing / Agency",
  "Photography / Videography", "Education / Courses", "E-commerce / Online Store",
  "Real Estate", "Tourism / Hospitality", "Other",
];

interface FormData {
  phone: string;
  country: string;
  businessType: string;
  message: string;
  honey: string;
}

const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;

const headingFont = "'Bodoni MT Black', 'Bodoni MT', 'Didot', 'Georgia', serif";

const FAQ = [
  { q: "How much does a website cost?", a: "A professional website starts from €1,000. The final price depends on complexity, number of pages, and features you need. Contact us for a personalized quote." },
  { q: "How long does it take to build a website?", a: "Most websites take 2–4 weeks depending on complexity. We'll give you a clear timeline after reviewing your needs." },
  { q: "Do I need to provide content and images?", a: "It helps if you do, but we can also write content and source professional images for you. We'll guide you through the whole process." },
  { q: "Will my website be mobile-friendly?", a: "Absolutely. Every website we build is fully responsive and looks great on phones, tablets, and desktops." },
  { q: "Do you offer hosting and maintenance?", a: "Yes — hosting and maintenance are included in the price. SSL, backups, updates, and support are all covered at no extra cost." },
  { q: "Can I update the website myself after it's built?", a: "Yes. We build on modern platforms with easy-to-use admin panels. We also provide a quick training session so you can manage your content confidently." },
  { q: "What if I'm not happy with the design?", a: "We include up to 3 rounds of revisions. We work closely with you to make sure the final result matches your vision." },
  { q: "Do you build online stores?", a: "Yes. We can build full e-commerce functionality — product pages, cart, checkout, payment integration, and order management." },
];

export default function BusinessForm() {
  const [form, setForm] = useState<FormData>({
    phone: "", country: "",
    businessType: "", message: "", honey: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const formStartTime = useRef(Date.now());
  const lastSubmitTime = useRef(0);

  useEffect(() => {
    formStartTime.current = Date.now();
  }, []);

  const validate = useCallback((): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!PHONE_REGEX.test(form.phone.trim())) e.phone = "Invalid phone format";
    if (!form.country) e.country = "Please select a country";
    if (!form.businessType) e.businessType = "Please select a business type";
    if (form.message.length > 1000) e.message = "Message is too long (max 1000 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.honey) return;

    const now = Date.now();
    const elapsed = now - formStartTime.current;
    if (elapsed < 3000) return;

    if (now - lastSubmitTime.current < 5000) return;

    if (submitCount >= 5) return;

    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");
    lastSubmitTime.current = now;
    setSubmitCount((c) => c + 1);

    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: form.phone.trim(),
        country: form.country,
        businessType: form.businessType,
        message: form.message.trim(),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        setSubmitted(true);
      })
      .catch(() => {
        setSubmitError("Something went wrong. Please try again.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-black flex items-center justify-center p-6"
      >
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">✅</div>
          <h2
            className="text-3xl font-black text-white mb-4"
            style={{ fontFamily: headingFont }}
          >
            Thank You!
          </h2>
          <p className="text-white/60 text-lg">
            Your request has been received. We will contact you within
            24 hours by phone or message.
          </p>
          <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4 text-left">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Your Details</p>
            <p className="text-white text-sm">📱 {form.phone}</p>
            <p className="text-white text-sm">🌍 {form.country}</p>
            <p className="text-white text-sm">💼 {form.businessType}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <span className="inline-block bg-white text-black text-xs font-black tracking-[2px] uppercase px-3 py-1.5 rounded mb-4">
            weblirev.com
          </span>
          <h1
            className="text-4xl md:text-5xl font-black text-white mb-3"
            style={{ fontFamily: headingFont }}
          >
            Let&apos;s Build Your <span className="text-white/60">Website</span>
          </h1>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Fill out the form below and we&apos;ll get back to you with a tailored offer for your business.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2
            className="text-2xl font-black text-white mb-5 text-center"
            style={{ fontFamily: headingFont }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-white/[0.03] transition-colors"
                >
                  <span className="text-white text-sm font-bold pr-4">{item.q}</span>
                  <span className="text-white/40 text-xl flex-shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
          autoComplete="off"
          noValidate
        >
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              value={form.honey}
              onChange={(e) => update("honey", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 555 123 4567"
              maxLength={25}
              className={`w-full bg-white/[0.06] border ${errors.phone ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Country <span className="text-red-400">*</span>
            </label>
            <select
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              className={`w-full bg-white/[0.06] border ${errors.country ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer [&>option]:bg-black [&>option]:text-white`}
            >
              <option value="">Select your country...</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
          </div>

          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Business Type <span className="text-red-400">*</span>
            </label>
            <select
              value={form.businessType}
              onChange={(e) => update("businessType", e.target.value)}
              className={`w-full bg-white/[0.06] border ${errors.businessType ? "border-red-400" : "border-white/10"} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors cursor-pointer [&>option]:bg-black [&>option]:text-white`}
            >
              <option value="">What do you need a website for?</option>
              {BUSINESS_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType}</p>}
          </div>

          <div>
            <label className="block text-white/80 text-sm font-bold mb-2">
              Additional Message (optional)
            </label>
            <textarea
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Describe what you want on your website..."
              maxLength={1000}
              rows={3}
              className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors resize-none"
            />
            <p className="text-white/20 text-xs text-right mt-1">{form.message.length}/1000</p>
          </div>

          {submitError && <p className="text-red-400 text-sm text-center">{submitError}</p>}

          <button
            type="submit"
            disabled={submitting || submitCount >= 5}
            className="w-full bg-white text-black font-black text-lg py-4 rounded-xl hover:bg-white/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
          >
            {submitting ? "Sending..." : submitCount >= 5 ? "Too many attempts" : "Submit Request"}
          </button>

          <p className="text-white/20 text-xs text-center">
            Your data is secure and used only for contacting you.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
