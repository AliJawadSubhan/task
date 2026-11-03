"use client";

import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    src: "/hero_img_4.webp",
    alt: "Chauffeur opening car door at hotel entrance",
    heading1: "Executive Chauffeur",
    heading2: "Services Across the UK",
    body: "We believe luxury is more than just reaching your destination — it's about the journey itself. Our chauffeurs are trained professionals dedicated to providing a seamless, comfortable, and refined experience from start to finish.",
    inset: "0%",
    position: "100% 35%",
  },
  {
    src: "/hero_img_2.webp",
    alt: "Chauffeur in central London",
    heading1: "Premium Chauffeur",
    heading2: "Services in London",
    body: "From the heart of London to the surrounding counties, our executive fleet and professional drivers ensure every journey is handled with the highest standard of care and discretion.",
  },
  {
    src: "/hero_img_3.webp",
    alt: "Chauffeur loading luggage at the airport",
    heading1: "Stress-Free Airport",
    heading2: "Transfers, Every Time",
    body: "Arrive relaxed and on time. Our meet-and-greet airport transfers are monitored against live flight data so your chauffeur is always ready when you are — no waiting, no rushing.",
  },
];

const SLIDE_MS = 5000;

function PinIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>;
}
function CompassIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9 4.9-2.1Z" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
function ClockIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function UsersIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M3.5 19c.5-4 2.5-6 5.5-6s5 2 5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 6.5a2.5 2.5 0 0 1 0 5M17 14c2 .5 3.2 2.2 3.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function Chevron() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="m3 4.5 3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

type SelectOption = { value: string; label: string; meta: string };

const DESTINATIONS: SelectOption[] = [
  { value: "paris", label: "Paris, France", meta: "City escape" },
  { value: "santorini", label: "Santorini, Greece", meta: "Island retreat" },
  { value: "kyoto", label: "Kyoto, Japan", meta: "Culture & heritage" },
  { value: "dubai", label: "Dubai, UAE", meta: "Luxury city break" },
  { value: "bali", label: "Bali, Indonesia", meta: "Wellness & beaches" },
  { value: "maldives", label: "Maldives", meta: "Private-island escape" },
  { value: "istanbul", label: "Istanbul, Türkiye", meta: "Food & culture" },
  { value: "london", label: "London, United Kingdom", meta: "Classic city stay" },
];

const TRAVEL_SERVICES: SelectOption[] = [
  { value: "visa", label: "Visa Services", meta: "Guidance & documentation" },
  { value: "flights", label: "Flight Ticket Booking", meta: "Economy, business & first" },
  { value: "hotels", label: "Hotel Booking", meta: "Handpicked stays worldwide" },
  { value: "cars", label: "Car Rental", meta: "Self-drive & chauffeur options" },
  { value: "holiday", label: "Complete Holiday Package", meta: "Flights, stays & experiences" },
  { value: "insurance", label: "Travel Insurance", meta: "Flexible trip protection" },
];

const TRAVELLERS: SelectOption[] = [
  { value: "1", label: "1 traveller", meta: "Solo journey" },
  { value: "2", label: "2 travellers", meta: "Couple or companions" },
  { value: "3", label: "3 travellers", meta: "Small group" },
  { value: "4", label: "4 travellers", meta: "Family journey" },
  { value: "5+", label: "5+ travellers", meta: "Group travel" },
];

function SearchableSelect({ label, options, value, onChange, icon, searchLabel, searchable = true }: { label: string; options: SelectOption[]; value: string; onChange: (value: string) => void; icon: ReactNode; searchLabel?: string; searchable?: boolean }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);
  const filtered = useMemo(() => options.filter((option) => `${option.label} ${option.meta}`.toLowerCase().includes(query.toLowerCase())), [options, query]);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={rootRef} className="relative min-w-0 border-b border-white/10 md:border-b-0 md:border-r md:border-white/10">
      <button type="button" onClick={() => { setOpen((current) => !current); setQuery(""); }} aria-expanded={open} className="flex min-h-[66px] w-full items-center gap-3 px-5 text-left">
        <span className="shrink-0 text-white/70">{icon}</span>
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <small className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">{label}</small>
          <span className={`truncate text-[13px] font-light ${selected ? "text-white" : "text-white/75"}`}>{selected?.label ?? `Choose ${label.toLowerCase()}`}</span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-white/45"><Chevron /></motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .985 }} transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-[calc(100%+12px)] left-2 right-2 z-[80] min-w-[280px] overflow-hidden rounded-2xl border border-white/15 bg-[#17171a]/95 p-2 shadow-[0_-28px_80px_rgba(0,0,0,.48)] backdrop-blur-2xl md:left-0 md:right-auto md:w-[340px]">
            {searchable && <div className="relative mb-2">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35" width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6"/><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={searchLabel} className="h-11 w-full rounded-xl border border-white/10 bg-white/[.06] pl-11 pr-4 text-[12px] text-white outline-none transition placeholder:text-white/30 focus:border-white/25 focus:bg-white/[.09]" />
            </div>}
            <div className="max-h-[252px] space-y-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-color:rgba(255,255,255,.2)_transparent] [scrollbar-width:thin]">
              {filtered.map((option) => (
                <button key={option.value} type="button" onClick={() => { onChange(option.value); setOpen(false); }} className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${value === option.value ? "bg-white text-black" : "text-white hover:bg-white/10"}`}>
                  <span><span className="block text-[13px] font-medium">{option.label}</span><span className={`mt-1 block text-[10px] ${value === option.value ? "text-black/45" : "text-white/35"}`}>{option.meta}</span></span>
                  <span className={`grid h-5 w-5 place-items-center rounded-full border ${value === option.value ? "border-black bg-black text-white" : "border-white/20 text-transparent group-hover:text-white/40"}`}>✓</span>
                </button>
              ))}
              {filtered.length === 0 && <p className="px-4 py-7 text-center text-[12px] text-white/40">No matching options found.</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <input type="hidden" name={label.toLowerCase()} value={value} />
    </div>
  );
}

function CalendarPicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(null);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const rootRef = useRef<HTMLDivElement>(null);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const leadingDays = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const chooseDay = (day: number) => {
    setSelected(new Date(year, monthIndex, day));
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative min-w-0 border-b border-white/10 md:border-b-0 md:border-r md:border-white/10">
      <button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} className="flex min-h-[66px] w-full items-center gap-3 px-5 text-left">
        <span className="shrink-0 text-white/70"><ClockIcon /></span>
        <span className="flex min-w-0 flex-1 flex-col gap-1"><small className="text-[9px] font-medium uppercase tracking-[0.18em] text-white/35">When</small><span className={`truncate text-[13px] font-light ${selected ? "text-white" : "text-white/75"}`}>{selected ? selected.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Choose travel date"}</span></span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-white/45"><Chevron /></motion.span>
      </button>

      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: -10, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: .985 }} transition={{ duration: .22, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-[calc(100%+12px)] left-2 right-2 z-[80] min-w-[300px] rounded-2xl border border-white/15 bg-[#17171a]/95 p-4 shadow-[0_-28px_80px_rgba(0,0,0,.48)] backdrop-blur-2xl md:left-1/2 md:right-auto md:w-[330px] md:-translate-x-1/2">
          <div className="mb-4 flex items-center justify-between">
            <div><p className="text-[10px] uppercase tracking-[.2em] text-white/35">Select date</p><p className="mt-1 text-[15px] font-medium text-white">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p></div>
            <div className="flex gap-1"><button type="button" aria-label="Previous month" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white">←</button><button type="button" aria-label="Next month" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:bg-white/10 hover:text-white">→</button></div>
          </div>
          <div className="grid grid-cols-7 text-center text-[9px] font-medium uppercase tracking-[.12em] text-white/30">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <span key={day} className="py-2">{day.slice(0, 1)}</span>)}</div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: leadingDays }, (_, index) => <span key={`blank-${index}`} />)}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const date = new Date(year, monthIndex, day);
              const disabled = date < today;
              const isSelected = selected?.toDateString() === date.toDateString();
              const isToday = today.toDateString() === date.toDateString();
              return <button key={day} type="button" disabled={disabled} onClick={() => chooseDay(day)} className={`grid aspect-square place-items-center rounded-full text-[12px] transition ${isSelected ? "bg-white font-semibold text-black" : isToday ? "border border-white/50 text-white" : disabled ? "cursor-not-allowed text-white/15" : "text-white/70 hover:bg-white/10 hover:text-white"}`}>{day}</button>;
            })}
          </div>
        </motion.div>}
      </AnimatePresence>
      <input type="hidden" name="date" value={selected?.toISOString() ?? ""} />
    </div>
  );
}

function BookingSearch() {
  const [destination, setDestination] = useState("");
  const [service, setService] = useState("holiday");
  const [travellers, setTravellers] = useState("2");
  const [status, setStatus] = useState("Search trips");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Searching…");
    window.setTimeout(() => setStatus("12 journeys found"), 800);
  };

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl border border-white/25 bg-[#29282d]/80 p-2.5 text-white shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-2xl backdrop-saturate-150"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr_1fr_1fr_auto] md:items-center">
        <SearchableSelect label="Destination" options={DESTINATIONS} value={destination} onChange={setDestination} icon={<PinIcon />} searchLabel="Search cities, islands or countries…" />
        <SearchableSelect label="Travel service" options={TRAVEL_SERVICES} value={service} onChange={setService} icon={<CompassIcon />} searchLabel="Search travel services…" />
        <CalendarPicker />
        <SearchableSelect label="Travellers" options={TRAVELLERS} value={travellers} onChange={setTravellers} icon={<UsersIcon />} searchable={false} />
        <button type="submit" className="mx-1.5 my-1.5 min-h-[54px] rounded-full bg-white px-7 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1a1a1a] transition duration-300 hover:scale-[1.03] hover:bg-white/90 md:min-w-[146px]">{status}</button>
      </div>
    </motion.form>
  );
}

export function HeroSection() {
  const [index, setIndex] = useState(0);
  useEffect(() => { const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS); return () => clearInterval(id); }, []);
  const slide = SLIDES[index];

  return (
    <section data-navbar-theme="dark" className="relative -mx-2 -mt-2 min-h-[calc(100vh-16px)] overflow-hidden rounded-[clamp(14px,1.5vw,20px)]">
      <div className="absolute inset-0 bg-black">
        {SLIDES.map((item, slideIndex) => <div key={item.src} className="absolute" style={{ inset: `-${item.inset ?? "10%"}`, opacity: slideIndex === index ? 1 : 0, transition: "opacity 1.2s ease-in-out" }}><Image src={item.src} alt={item.alt} fill priority sizes="120vw" className="object-cover" style={{ objectPosition: item.position ?? "center 40%" }} /></div>)}
      </div>
      <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,0,0,.48) 0%,rgba(0,0,0,.33) 32%,rgba(0,0,0,.43) 56%,rgba(0,0,0,.82) 100%)" }} />
      <div className="relative z-10 flex min-h-[calc(100vh-16px)] flex-col px-6 pb-10 pt-24 sm:px-10 sm:pt-[118px] lg:px-16">
        <div className="flex flex-1 items-center py-12 md:py-16">
          <AnimatePresence mode="wait">
            <motion.div key={index} className="grid w-full gap-8 lg:grid-cols-[1.14fr_.86fr] lg:items-center lg:gap-20" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: .8, ease: [0.25, .46, .45, .94] }}>
              <h1><span className="block text-[clamp(42px,5vw,72px)] font-extralight leading-[1.08] tracking-[-0.06em] text-white sm:whitespace-nowrap">{slide.heading1}</span><span className="block text-[clamp(42px,5vw,72px)] font-semibold leading-[1.08] tracking-[-0.06em] text-white sm:whitespace-nowrap">{slide.heading2}</span></h1>
              <div className="border-l border-white/35 pl-6 lg:justify-self-end lg:pl-9"><p className="max-w-xl text-[14px] font-light leading-[1.9] tracking-[-0.02em] text-white/85 sm:text-[16px]">{slide.body}</p></div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-auto"><BookingSearch /></div>
      </div>
    </section>
  );
}
