"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  PlaneIcon,
  SwapIcon,
  ScaleIcon,
  ClockIcon,
  DotsVerticalIcon,
  CalendarIcon,
  StarIcon,
} from "./icons";
import { OriginButton } from "@/components/ui/origin-button";

const TABS = [
  { label: "Airport Transfer", icon: PlaneIcon },
  { label: "City to City", icon: SwapIcon },
  { label: "Cooperate Chauffeur", icon: ScaleIcon },
  { label: "Hourly Basis", icon: ClockIcon },
  { label: "Intercity", icon: DotsVerticalIcon },
];

export function BookingPanel() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className="relative z-20 overflow-hidden rounded-2xl border border-white/20 px-10 pb-5 pt-5 text-white backdrop-blur-xl backdrop-saturate-150"
      style={{
        background: "rgba(20,20,20,0.35)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* gradient border: bright shine hugging the top-left and bottom-right edges only */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-2xl"
        style={{
          padding: "1px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.15) 18%, rgba(255,255,255,0) 42%, rgba(255,255,255,0) 58%, rgba(255,255,255,0.15) 82%, rgba(255,255,255,0.9) 100%)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {/* soft outer glow echoing the two lit corners */}
      <div
        className="pointer-events-none absolute -left-10 -top-10 z-0 h-28 w-28 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",
          filter: "blur(6px)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 z-0 h-28 w-28 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2.5">
          {TABS.map((tab, index) => {
            const isActive = index === activeTab;
            return (
              <motion.button
                key={tab.label}
                onClick={() => setActiveTab(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-2 whitespace-nowrap rounded-full px-[18px] py-3 text-sm font-light tracking-[-0.01em] text-white transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="booking-tab-active"
                    className="absolute inset-0 overflow-hidden rounded-full border border-white/40 bg-white/10 backdrop-blur-md backdrop-saturate-150"
                    style={{
                      boxShadow:
                        "inset 0 1px 1px rgba(255,255,255,0.5), inset 0 -1px 2px rgba(255,255,255,0.1), 0 4px 18px rgba(0,0,0,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0))",
                      }}
                    />
                  </motion.span>
                )}
                <tab.icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex">
            {["/testimonial-1.jpg", "/testimonial-2.jpg", "/testimonial-3.jpg"].map((src) => (
              <span
                key={src}
                className="relative -ml-2.5 h-8 w-8 overflow-hidden rounded-full border-2 border-white/80 first:ml-0"
              >
                <Image src={src} alt="Happy client" fill className="object-cover" />
              </span>
            ))}
            <span className="relative -ml-2.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/80 bg-neutral-900 text-[10px] font-light text-white">
              9+
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-light tracking-[-0.01em] text-white">
            <StarIcon className="h-4 w-4 text-amber-400" /> 4.9 Rating across the UK
          </span>
        </div>
      </div>

      <div className="relative z-10 my-4 h-px bg-white/15" />

      <div className="relative z-10 grid grid-cols-1 items-end gap-5 sm:grid-cols-2 lg:grid-cols-6">
        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-light font-sans tracking-[-0.01em]">Pickup Location</label>
          <input
            type="text"
            placeholder="Street, Hotel or Airport"
            className="border-b border-white/25 bg-transparent py-1.5 text-sm text-white placeholder-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-light font-sans tracking-[-0.01em]">Drop off Location</label>
          <input
            type="text"
            placeholder="Destination Address"
            className="border-b border-white/25 bg-transparent py-1.5 text-sm text-white placeholder-white/50 outline-none"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-light font-sans tracking-[-0.01em]">Pickup Date</label>
          <div className="flex items-center justify-between border-b border-white/25 py-1.5">
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
            />
            <CalendarIcon className="h-4 w-4 text-white/50" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-light font-sans tracking-[-0.01em]">Pickup Time</label>
          <div className="flex items-center justify-between border-b border-white/25 py-1.5">
            <input
              type="text"
              placeholder="--:-- --"
              className="w-full bg-transparent text-sm text-white placeholder-white/50 outline-none"
            />
            <ClockIcon className="h-4 w-4 text-white/50" />
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <label className="text-[13px] font-light font-sans tracking-[-0.01em]">Passenger</label>
          <select className="border-b border-white/25 bg-transparent py-1.5 text-sm text-white outline-none [&>option]:text-neutral-900">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>

        <OriginButton
          className="h-fit gap-2 whitespace-nowrap rounded-full border border-white bg-white px-7 py-4 text-sm font-semibold text-neutral-900"
          fillColor="#111111"
          fillTextColor="#ffffff"
          showHoverBorder
        >
          Find My Chauffeur ↗
        </OriginButton>
      </div>
    </div>
  );
}
