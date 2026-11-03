"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TESTIMONIALS = [
  { name: "Sophie Bennett", trip: "Anniversary escape · Santorini", image: "/testimonial-1.jpg", review: "Every transfer, reservation and tiny detail appeared exactly when we needed it. We felt completely looked after without ever feeling over-scheduled." },
  { name: "Marcus Chen", trip: "Family journey · Japan", image: "/testimonial-2.jpg", review: "The itinerary gave our family access to a side of Kyoto we would never have found alone. Elegant, effortless and genuinely personal from start to finish." },
  { name: "Amelia Rhodes", trip: "City break · Paris", image: "/testimonial-3.jpg", review: "They understood our style immediately. The hotel, private guide and last-minute theatre seats were all exceptional — a rare kind of service." },
  { name: "Daniel Okafor", trip: "Coastal retreat · Bali", image: "/testimonial-4.jpg", review: "Our trip flowed beautifully from the moment we landed. It felt spontaneous and relaxed, while every practical detail had clearly been considered." },
];

function Stars() {
  return <div className="flex gap-1 text-[#a77843]" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <span key={index}>★</span>)}</div>;
}

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % TESTIMONIALS.length), 4600);
    return () => window.clearInterval(timer);
  }, []);

  const visible = useMemo(() => [
    (active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    active,
    (active + 1) % TESTIMONIALS.length,
  ], [active]);

  return (
    <section id="testimonials" data-navbar-theme="light" className="overflow-hidden bg-[#f4f1eb] px-5 py-24 text-[#191919] md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-16 grid gap-7 md:grid-cols-2 md:items-end">
          <div>
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/45">Guest stories</p>
            <h2 className="max-w-2xl text-[clamp(42px,5.2vw,78px)] font-light leading-[.98] tracking-[-0.055em]">Journeys remembered<br/><span className="font-semibold">for all the right reasons.</span></h2>
          </div>
          <p className="max-w-lg text-[15px] font-light leading-8 text-black/55 md:justify-self-end">Care is best felt in the details. These are a few words from travellers who trusted us to shape time away that felt entirely their own.</p>
        </div>

        <div className="relative pt-10 md:pt-16">
          <div className="grid min-h-[390px] grid-cols-1 items-center gap-5 md:grid-cols-3 md:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((testimonialIndex, position) => {
                const testimonial = TESTIMONIALS[testimonialIndex];
                const isActive = position === 1;
                return (
                  <motion.article
                    layout
                    key={`${testimonialIndex}-${position}`}
                    initial={{ opacity: 0, x: position === 0 ? -60 : 60, y: 30 }}
                    animate={{ opacity: isActive ? 1 : .62, x: 0, y: isActive ? -34 : 24, scale: isActive ? 1.025 : .965 }}
                    exit={{ opacity: 0, x: position === 0 ? -60 : 60, y: 30 }}
                    transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}
                    className={`${position !== 1 ? "hidden md:flex" : "flex"} relative min-h-[330px] flex-col justify-between rounded-[24px] border border-black/[.08] bg-white p-7 shadow-[0_24px_70px_rgba(33,24,14,.08)] md:p-9`}
                  >
                    <div>
                      <div className="mb-9 flex items-start justify-between gap-5">
                        <div className="flex items-center gap-4">
                          <Image src={testimonial.image} alt="" width={58} height={58} className="h-[58px] w-[58px] rounded-full object-cover" />
                          <div><h3 className="text-[17px] font-medium">{testimonial.name}</h3><p className="mt-1 text-[11px] uppercase tracking-[.13em] text-black/40">{testimonial.trip}</p></div>
                        </div>
                        <Stars />
                      </div>
                      <p className="text-[clamp(17px,1.35vw,22px)] font-light leading-[1.65] tracking-[-0.025em] text-black/75">“{testimonial.review}”</p>
                    </div>
                    <div className="mt-8 flex items-end justify-between border-t border-black/[.08] pt-5"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-black/35">Verified traveller</span><span className="font-serif text-4xl leading-none text-[#a77843]">”</span></div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {TESTIMONIALS.map((testimonial, index) => <button key={testimonial.name} type="button" onClick={() => setActive(index)} aria-label={`Show testimonial ${index + 1}`} className={`h-2 rounded-full transition-all duration-500 ${active === index ? "w-9 bg-[#a77843]" : "w-2 bg-black/20 hover:bg-black/40"}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
