"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import DotsNav from "@/components/ui/DotsNav";

const TABS = ["All", "First Class", "Business Class", "Economy Saloon", "MPV", "First Class Van", "Business Class Van", "Standard Van"];

const FLEET = [
  {
    id: "first-class",
    categories: ["First Class"],
    name: "Mercedes-Benz S-Class or similar",
    description: "The pinnacle of luxury chauffeur travel — effortless elegance and superior comfort for every occasion.",
    image: "/images/fleet/first-class-mercedes-s-class.webp",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From £110" },
      { label: "Hourly hire (min 4 hr)", value: "From £60" },
      { label: "Waiting Charges", value: "From £40 per hr" },
    ],
  },
  {
    id: "business-class",
    categories: ["Business Class"],
    name: "Mercedes-Benz E-Class or similar",
    description: "Premium business travel in refined comfort, perfect for corporate clients and professional journeys.",
    image: "/images/fleet/business-class-mercedes-e-class.webp",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From £85" },
      { label: "Hourly hire (min 4 hr)", value: "From £45" },
      { label: "Waiting Charges", value: "From £30 per hr" },
    ],
  },
  {
    id: "economy-saloon",
    categories: ["Economy Saloon"],
    name: "VW Passat / Kia Niro or similar",
    description: "A comfortable and reliable saloon ideal for everyday executive transfers and airport runs.",
    image: "/images/fleet/economy-saloon-vw-passat.webp",
    seats: 4,
    luggage: 3,
    pricing: [
      { label: "Heathrow", value: "From £65" },
      { label: "Hourly hire (min 4 hr)", value: "From £35" },
      { label: "Waiting Charges", value: "From £25 per hr" },
    ],
  },
  {
    id: "mpv",
    categories: ["MPV"],
    name: "VW Sharan / Ford Galaxy or similar",
    description: "Versatile multi-purpose vehicle combining flexibility and comfort for groups of up to 7 passengers.",
    image: "/images/fleet/mpv-vw-sharan.webp",
    seats: 7,
    luggage: 5,
    pricing: [
      { label: "Heathrow", value: "From £100" },
      { label: "Hourly hire (min 4 hr)", value: "From £55" },
      { label: "Waiting Charges", value: "From £35 per hr" },
    ],
  },
  {
    id: "first-class-van",
    categories: ["First Class Van", "First Class"],
    name: "Mercedes-Benz V-Class or similar",
    description: "Spacious first-class van travel for groups seeking luxury, privacy, and ample luggage capacity.",
    image: "/images/fleet/first-class-van-mercedes-v-class.webp",
    seats: 6,
    luggage: 6,
    pricing: [
      { label: "Heathrow", value: "From £130" },
      { label: "Hourly hire (min 4 hr)", value: "From £70" },
      { label: "Waiting Charges", value: "From £45 per hr" },
    ],
  },
  {
    id: "business-class-van",
    categories: ["Business Class Van", "Business Class"],
    name: "Mercedes-Benz Vito or similar",
    description: "Large group transfers in a well-appointed van — ideal for families, teams, and events.",
    image: "/images/fleet/mercedes-vito.webp",
    seats: 9,
    luggage: 8,
    pricing: [
      { label: "Heathrow", value: "From £150" },
      { label: "Hourly hire (min 4 hr)", value: "From £80" },
      { label: "Waiting Charges", value: "From £50 per hr" },
    ],
  },
  {
    id: "standard-van",
    categories: ["Standard Van"],
    name: "Hyundai i800 / VW Transporter or similar",
    description: "Reliable and spacious standard van for larger groups and extended luggage requirements.",
    image: "/images/fleet/standard-van-hyundai-i800.webp",
    seats: 8,
    luggage: 8,
    pricing: [
      { label: "Heathrow", value: "From £120" },
      { label: "Hourly hire (min 4 hr)", value: "From £65" },
      { label: "Waiting Charges", value: "From £40 per hr" },
    ],
  },
];

const AMENITIES = [
  { label: "Wifi Available", icon: "/images/card icons/wifi-available.png" },
  { label: "GPS Tracking", icon: "/images/card icons/gps-tracking.png" },
  { label: "Water Available", icon: "/images/card icons/water-available.png" },
  { label: "Child Seat Available", icon: "/images/card icons/child-seat-available.png" },
];

export function FleetSection() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [activeTab, setActiveTab] = useState("All");

  const visible = activeTab === "All" ? FLEET : FLEET.filter((c) => c.categories.includes(activeTab));

  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false, page: 0, pages: 1 });

  const updateEdge = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    const max = el.scrollWidth - el.clientWidth;
    const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
    const page = max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (pages - 1));
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, page, pages });
  };

  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0 });
    updateEdge();
    window.addEventListener("resize", updateEdge);
    return () => window.removeEventListener("resize", updateEdge);
  }, [activeTab]);

  const pausedRef = useRef(false);
  const animRef = useRef(0);
  const holdUntilRef = useRef(0);

  const glideTo = (target: number, duration = 900) => {
    const el = trackRef.current;
    if (!el) return;
    cancelAnimationFrame(animRef.current);
    const from = el.scrollLeft;
    const t0 = performance.now();
    el.style.scrollSnapType = "none";
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      el.scrollLeft = from + (target - from) * e;
      if (p < 1) animRef.current = requestAnimationFrame(tick);
      else el.style.scrollSnapType = "";
    };
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el || pausedRef.current || Date.now() < holdUntilRef.current) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 2) return;
      if (el.scrollLeft >= max - 2) glideTo(0, 1200);
      else slide(1);
    }, 3000);
    return () => clearInterval(id);
  }, [activeTab]);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0") : el.clientWidth;
    const max = el.scrollWidth - el.clientWidth;
    glideTo(Math.max(0, Math.min(max, el.scrollLeft + dir * step)));
  };

  return (
    <section
      id="fleet"
      data-navbar-theme="light"
      ref={ref}
      className={`bg-white px-8 py-16 transition-all duration-700 ease-out ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="mx-auto max-w-[1680px]">
      {/* Header */}
      <div className="mb-14 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <span className="ml-3 block text-xs font-medium tracking-[0.3em] text-neutral-400">
            OUR FLEET
          </span>
          <h2 className="mt-4 text-[58px] leading-[121%] tracking-[-0.06em] text-neutral-900">
            <span className="block whitespace-nowrap font-extralight">Discover Our Collection</span>
            <span className="block font-normal">of Luxury Vehicles.</span>
          </h2>
        </div>
        <p className="max-w-xl text-[16px] font-light leading-[200%] tracking-[-0.03em] text-neutral-500">
          Explore our carefully selected fleet of premium vehicles, designed to deliver exceptional comfort, style, and sophistication for every journey.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-8 flex items-center gap-2 flex-wrap">
        {TABS.map((tab) => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`group relative overflow-hidden rounded-full px-5 py-2 text-[12px] font-medium tracking-wide border cursor-pointer transition-[border-color] duration-300 ${
                active
                  ? "bg-black text-white border-black"
                  : "bg-white text-black border-black/20 hover:border-white"
              }`}
            >
              {!active && (
                <span
                  aria-hidden
                  className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black rounded-full opacity-0 group-hover:w-[300px] group-hover:h-[300px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none"
                />
              )}
              <span className={`relative z-[1] transition-colors duration-500 ${!active ? "group-hover:text-white" : ""}`}>
                {tab}
              </span>
            </button>
          );
        })}
      </div>

      {/* Carousel */}
      <div className="relative">
        {(["prev", "next"] as const).map((d) => {
          const disabled = d === "prev" ? edge.start : edge.end;
          return (
            <button
              key={d}
              type="button"
              aria-label={d === "prev" ? "Previous vehicles" : "Next vehicles"}
              onClick={() => { holdUntilRef.current = Date.now() + 6000; slide(d === "prev" ? -1 : 1); }}
              disabled={disabled}
              className={`absolute top-[110px] z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition hover:bg-black hover:text-white disabled:pointer-events-none disabled:opacity-0 ${
                d === "prev" ? "left-[-18px]" : "right-[-18px]"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={d === "prev" ? "rotate-180" : ""}>
                <path d="M4 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}

        <div
          key={activeTab}
          ref={trackRef}
          onScroll={updateEdge}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((car, i) => (
            <motion.div
              key={`${car.id}-${activeTab}`}
              className="snap-start shrink-0 basis-[calc((100%-60px)/4)] h-[440px] fleet-card group rounded-[20px] overflow-hidden flex flex-col cursor-pointer transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl"
              initial={{ opacity: 0, x: 24, y: 24 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 24, y: 24 }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Car image */}
              <div className="relative h-[40%] w-full overflow-hidden shrink-0" style={{ background: "#f0f0f0" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-in-out group-hover:scale-105"
                  draggable={false}
                />
              </div>

              {/* Content block */}
              <div className="flex flex-col flex-1 min-h-0 px-5 py-5 overflow-hidden" style={{ background: "#EFEFEF" }}>
                {/* Name + seat/luggage */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[17px] font-bold text-black transition-colors duration-300 group-hover:text-neutral-700">{car.name}</h3>
                  <div className="flex items-center gap-3 text-black/40">
                    <span className="flex items-center gap-1 text-[12px]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                      {car.seats}
                    </span>
                    <span className="flex items-center gap-1 text-[12px]">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                      </svg>
                      {car.luggage}
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {AMENITIES.map((a) => (
                    <div key={a.label} className="flex flex-col items-center gap-1.5 text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.icon} alt={a.label} className="w-5 h-5 object-contain" draggable={false} />
                      <span className="text-[10px] leading-tight text-black/40">{a.label}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-black/10 mb-4" />

                {/* Pricing */}
                <div className="flex flex-col gap-2">
                  {car.pricing.map((p) => (
                    <div key={p.label} className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-black">{p.label}</span>
                      <span className="text-[12px] text-black/60">{p.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DotsNav count={edge.pages} activeIndex={edge.page} className="mt-8" />
      </div>
    </section>
  );
}
