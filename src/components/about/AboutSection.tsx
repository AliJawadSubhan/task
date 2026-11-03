"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const CARDS = [
  {
    src: "/about/car-sunglasses.jpg",
    position: "center 20%",
    offset: false,
    title: "Arrive in Style",
    desc: "Every journey begins with your comfort in mind — from the first mile to the last.",
  },
  {
    src: "/about/suit-walk.jpg",
    position: "center 10%",
    offset: true,
    title: "Professional Chauffeurs",
    desc: "Experienced, discreet, and dedicated to delivering an exceptional experience.",
  },
  {
    src: "/about/suv-exit.jpg",
    position: "center 10%",
    offset: false,
    title: "Premium Fleet",
    desc: "Luxury vehicles maintained to the highest standard for your comfort.",
  },
  {
    src: "/about/audi-grille.jpg",
    position: "center 45%",
    offset: true,
    title: "Always Available",
    desc: "24/7 service across the UK — wherever your journey takes you.",
  },
];

export function AboutSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isAnyHovered = hoveredIdx !== null;
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (
    <section className="overflow-hidden pt-2 pb-10 md:pb-16" style={{ backgroundColor: "#ffffff" }}>
      <style>{`
        @keyframes uts-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .uts-marquee-track {
          animation: uts-marquee 32s linear infinite;
        }
      `}</style>

      {/* Heading */}
      <div className="mb-14 flex flex-col items-start justify-between gap-8 px-10 md:flex-row md:items-end">
        <div>
          <span className="ml-3 block text-xs font-medium tracking-[0.3em] text-neutral-400">
            ABOUT UTS
          </span>
          <h2 className="mt-4 text-[58px] leading-[121%] tracking-[-0.06em] text-neutral-900">
            <span className="block whitespace-nowrap font-extralight">More than a journey.</span>
            <span className="block font-normal">An experience.</span>
          </h2>
        </div>
        <p className="max-w-xl text-[16px] font-light leading-[200%] tracking-[-0.03em] text-neutral-500">
          We believe luxury is more than just reaching your destination. It&apos;s about
          enjoying every moment of the journey. Our premium chauffeur services are designed to
          provide exceptional comfort, reliability
        </p>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden" style={{ height: 566 }}>
        <div className="uts-marquee-track flex w-max items-start gap-6">
          {[...CARDS, ...CARDS].map((item, i) => {
            const realIdx = i % CARDS.length;
            const isHovered = hoveredIdx === realIdx;

            // On any hover: cards that were down go up, cards that were up go down
            const yOffset = isAnyHovered
              ? item.offset ? 0 : 86
              : item.offset ? 86 : 0;

            return (
              <div
                key={i}
                className="relative w-[300px] flex-none cursor-pointer md:w-[360px]"
                style={{ height: 480 + 86, perspective: "1200px" }}
                onMouseEnter={() => {
                  if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
                  setHoveredIdx(realIdx);
                }}
                onMouseLeave={() => {
                  leaveTimer.current = setTimeout(() => { setHoveredIdx(null); leaveTimer.current = null; }, 120);
                }}
              >
                {/* Visual wrapper — 480px tall, translates within the 566px hit area so the cursor
                    can never escape the hit area during the up/down animation */}
                <div
                  style={{
                    width: "100%",
                    height: 480,
                    transform: `translateY(${yOffset}px)`,
                    transition: "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                    willChange: "transform",
                  }}
                >
                {/* 3-D flip wrapper */}
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: isHovered ? "rotateY(180deg)" : "rotateY(0deg)",
                    transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {/* Front — image */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-3xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt="United Travel Services"
                      fill
                      unoptimized
                      className="object-cover"
                      style={{ objectPosition: item.position }}
                    />
                  </div>

                  {/* Back — blurred image + content */}
                  <div
                    className="absolute inset-0 overflow-hidden rounded-3xl"
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                      style={{
                        objectPosition: item.position,
                        filter: "blur(14px)",
                        transform: isHovered ? "scale(1.24)" : "scale(1.12)",
                        transition: "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) 0.35s",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="absolute inset-0 flex flex-col items-start justify-end p-8 text-white">
                      <h3 className="text-[22px] font-normal leading-tight tracking-[-0.03em]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[14px] font-light leading-relaxed text-white/80">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
