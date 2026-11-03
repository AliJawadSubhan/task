"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StatCounter } from "./StatCounter";
import PillButtonContent from "@/components/ui/PillButtonContent";

const SERVICES = [
  {
    index: "01",
    label: "AIRPORT TRANSFERS",
    badge: "Airport Travel",
    title: "Arrive in Comfort. Travel in Style.",
    description:
      "Enjoy a seamless journey to or from the airport with private transportation planned around your schedule.",
    src: "/services/airport-transfer.jpg",
  },
  {
    index: "02",
    label: "CITY TO CITY",
    badge: "Point to Point",
    title: "A Better Way Between Cities.",
    description:
      "Travel between destinations in privacy and comfort, with a journey arranged around your timeline.",
    src: "/services/city-to-city.jpg",
  },
  {
    index: "03",
    label: "INTER CITY",
    badge: "Inter City",
    title: "Seamless Travel Across Every Mile.",
    description:
      "From suburb to city center, our inter-city service ensures you travel without compromise.",
    src: "/services/inter-city.jpg",
  },
  {
    index: "04",
    label: "HOURLY CHAUFFEUR",
    badge: "Hourly",
    title: "Your Time, Your Terms.",
    description:
      "Book a dedicated chauffeur by the hour for meetings, events, or wherever the day takes you.",
    src: "/services/hourly-chauffer.jpg",
  },
  {
    index: "05",
    label: "CORPORATE CHAUFFEUR",
    badge: "Corporate",
    title: "Executive Travel, Refined.",
    description:
      "Reliable, discreet, and professional — our corporate chauffeur service keeps your business moving.",
    src: "/services/co-operate-chauffer.jpg",
  },
];

const STATS = [
  { value: "24/7", label: "Customer Support" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Chauffeurs & Vehicles" },
  { value: "10+", label: "Years of Experience" },
];

function ServiceCard({
  item,
  cardRef,
  imgRef,
}: {
  item: (typeof SERVICES)[number];
  cardRef: (el: HTMLElement | null) => void;
  imgRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <article
      ref={cardRef}
      className="relative h-[450px] w-[340px] flex-none overflow-hidden rounded-3xl md:w-[734px]"
    >
      {/* Oversized container gives the image room to shift without gaps */}
      <div
        ref={imgRef}
        className="absolute will-change-transform"
        style={{ inset: "-80px -120px" }}
      >
        <Image
          src={item.src}
          alt={item.title}
          fill
          unoptimized
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center justify-between">
          <span
            className="rounded-md px-3 py-1.5 text-[11px] tracking-[0.25em] text-white/90"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {item.index} / {item.label}
          </span>
          <span className="rounded-sm border border-white/60 px-2 py-0.5 text-[11px] text-white">
            {item.badge}
          </span>
        </div>

        <h3 className="mt-6 text-[22px] font-normal leading-tight tracking-[-0.03em]">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[640px] text-[15px] font-light tracking-[-0.02em] text-white/90">
          {item.description}
        </p>

        <button className="group mt-5 relative overflow-hidden whitespace-nowrap inline-flex items-center justify-between gap-4 rounded-full border border-white/50 px-4 py-3 text-xs tracking-[0.2em] text-white cursor-pointer">
          <PillButtonContent fill="white">
            EXPLORE SERVICE
          </PillButtonContent>
        </button>
      </div>
    </article>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pinnedContentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [distance, setDistance] = useState(0);
  const [pinHeight, setPinHeight] = useState(650);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const updatePinned = () => setIsPinned(mq.matches);
    updatePinned();
    mq.addEventListener("change", updatePinned);

    const measure = () => {
      if (trackRef.current) {
        setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
      if (pinnedContentRef.current) {
        setPinHeight(pinnedContentRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => undefined);

    return () => {
      mq.removeEventListener("change", updatePinned);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  useEffect(() => {
    let rafId: number;
    const updateParallax = () => {
      // Use scrollYProgress.get() — accurate 0→1 through the entire pinned section
      const vProgress = scrollYProgress.get();
      const vOffset = (vProgress - 0.5) * 80;

      cardRefs.current.forEach((card, i) => {
        const img = imgRefs.current[i];
        if (!card || !img) return;
        const cRect = card.getBoundingClientRect();
        const cardCenterX = cRect.left + cRect.width / 2;
        const hOffset = Math.max(-100, Math.min(100, (cardCenterX - window.innerWidth / 2) * -0.18));
        img.style.transform = `translateX(${hOffset}px)`;
      });

      rafId = requestAnimationFrame(updateParallax);
    };
    rafId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(rafId);
  }, [scrollYProgress]);

  return (
    <section
      className="-mx-4 text-white"
      style={{ background: "linear-gradient(235.26deg, #595959 0%, #1F1F1F 17.5%)" }}
    >
      <div
        ref={sectionRef}
        className="relative"
        style={isPinned ? { height: `calc(${pinHeight}px + ${distance}px)` } : undefined}
      >
        <div
          ref={pinnedContentRef}
          className={isPinned ? "sticky top-0 overflow-hidden" : undefined}
        >
          <div className="relative mb-6 flex flex-col items-start justify-between gap-6 px-10 pt-14 md:flex-row md:items-end">
            <div>
              <span className="ml-2 block text-[13px] font-normal tracking-[0.35em] text-neutral-300">
                OUR SERVICES
              </span>
              <h2 className="mt-5 text-[50px] leading-[121%] tracking-[-0.06em]">
                <span className="block whitespace-nowrap font-extralight">Premium Chauffeur Services</span>
                <span className="block whitespace-nowrap font-medium">for Every Occasion.</span>
              </h2>
            </div>

            <p className="relative z-10 mb-1 max-w-[480px] text-[14px] font-light leading-[200%] tracking-[-0.02em] text-neutral-300">
              From airport transfers to executive travel, explore our luxury chauffeur services
              designed around your comfort, convenience, and schedule.
            </p>

            <div className="pointer-events-none absolute right-16 top-0 h-[260px] w-[260px] opacity-40 md:h-[320px] md:w-[320px]">
              <Image src="/uts-mark.png" alt="" fill className="object-contain brightness-0 invert" aria-hidden />
            </div>
          </div>

          <div
            className={
              isPinned
                ? "flex h-[450px] items-center overflow-hidden"
                : "overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            }
          >
            <motion.div
              ref={trackRef}
              style={isPinned ? { x } : undefined}
              className="flex w-max gap-10 px-10"
            >
              {SERVICES.map((item, i) => (
                <ServiceCard
                  key={item.index}
                  item={item}
                  cardRef={(el) => { cardRefs.current[i] = el; }}
                  imgRef={(el) => { imgRefs.current[i] = el; }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-16 pb-14 pt-10">
        <div className="flex flex-wrap justify-between gap-10 px-10 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <StatCounter
                value={stat.value}
                className="font-sans text-[44px] font-semibold leading-none tracking-[-0.04em] text-white"
              />
              <div className="mt-2 text-base font-medium text-neutral-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
