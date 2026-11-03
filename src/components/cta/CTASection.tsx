"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import PillButtonContent from "@/components/ui/PillButtonContent";

export function CTASection() {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section className="w-full bg-white px-4 md:px-8 pt-[6.25vw] pb-[6.25vw]">
      <div
        ref={ref}
        className={`relative w-full min-h-[480px] md:h-[38.5417vw] rounded-[1.6667vw] overflow-hidden flex items-center bg-gray-800 bg-cover bg-center p-6 md:p-[4.1667vw] transition-all duration-700 ease-out ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ backgroundImage: "url('/images/Cinematic photograph.png')" }}
      >
        {/* Light left-to-right gradient so text reads against the image */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(235,235,235,0.6) 0%, rgba(235,235,235,0.45) 35%, rgba(235,235,235,0.15) 65%, rgba(235,235,235,0) 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl md:max-w-[40vw] text-black pl-[2.0833vw]">
          <p
            className="uppercase text-black mb-[1.0417vw]"
            style={{
              fontWeight: 600,
              fontSize: "clamp(9px, 0.6771vw, 13px)",
              lineHeight: "1",
              letterSpacing: "0.18em",
            }}
          >
            The Next Journey Starts With You
          </p>

          <h2
            className="uppercase text-black mb-[1.25vw]"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3.3333vw, 64px)",
              lineHeight: "1.06",
              letterSpacing: "-0.04em",
            }}
          >
            Your Journey.<br />Our Priority.
          </h2>

          <p
            className="text-black/70 mb-[2.0833vw] max-w-xl"
            style={{
              fontWeight: 400,
              fontSize: "clamp(13px, 1.0417vw, 18px)",
              lineHeight: "1.6",
            }}
          >
            Make your next journey more comfortable with professional chauffeur services tailored to your travel needs.
          </p>

          <button
            className="group relative overflow-hidden whitespace-nowrap inline-flex items-center justify-between gap-4 w-fit px-8 py-5 text-[16px] font-light tracking-[0.15em] text-white uppercase rounded-full bg-[#111111] cursor-pointer"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              border: `1px solid ${btnHovered ? "#111111" : "transparent"}`,
              transition: "border-color 300ms",
            }}
          >
            <PillButtonContent fill="white">
              Book Your Chauffeur
            </PillButtonContent>
          </button>
        </div>
      </div>
    </section>
  );
}
