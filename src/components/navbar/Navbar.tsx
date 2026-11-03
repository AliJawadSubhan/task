"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { OriginButton } from "@/components/ui/origin-button";
import PillButtonContent from "@/components/ui/PillButtonContent";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Stories", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";
  const links = onHome
    ? NAV_LINKS
    : [{ label: "Home", href: "/" }, ...NAV_LINKS.slice(1).map((l) => ({ ...l, href: `/${l.href}` }))];

  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [ctaHovered, setCtaHovered] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;

    const sampleTheme = () => {
      raf = 0;
      const headerEl = headerRef.current;
      if (!headerEl) return;
      const navMid = headerEl.getBoundingClientRect().height / 2;
      let best: HTMLElement | null = null;
      const candidates = document.querySelectorAll<HTMLElement>("[data-navbar-theme]");
      for (const el of candidates) {
        if (headerEl.contains(el)) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= navMid && bottom >= navMid) best = el;
      }
      const next = best?.dataset.navbarTheme === "light" ? "light" : "dark";
      setTheme((prev) => (prev === next ? prev : next));
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (!raf) raf = requestAnimationFrame(sampleTheme);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <header
      ref={headerRef}
      className={[
        "fixed top-3 left-4 right-4 z-50 rounded-full transition-all duration-500",
        isDark
          ? scrolled
            ? "backdrop-blur bg-white/10 border border-white/10 shadow-sm"
            : "backdrop-blur-[2px] bg-white/5 border border-white/5"
          : scrolled
            ? "backdrop-blur bg-white/70 border border-black/10 shadow-sm"
            : "backdrop-blur-[2px] bg-white/30 border border-black/5",
      ].join(" ")}
    >
      <nav className="w-full px-7 py-1 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center leading-tight">
          <Image
            src="/logo.png"
            alt="United Travel Services"
            width={200}
            height={70}
            className={`h-[44px] w-auto object-contain transition-[filter] duration-300 ${
              isDark ? "" : "invert"
            }`}
            priority
          />
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map(({ label, href, hasDropdown }) => (
            <li key={label}>
              <a
                href={href}
                className={`group flex items-center gap-1 text-[12px] font-medium tracking-[0.12em] uppercase transition-all duration-200 ${
                  isDark
                    ? "text-white/60 hover:text-white hover:tracking-[0.16em]"
                    : "text-black/60 hover:text-black hover:tracking-[0.16em]"
                }`}
              >
                {label}
                {hasDropdown && (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="opacity-70 transition-transform duration-200 group-hover:translate-y-px" aria-hidden="true">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/book")}
          className="group hidden md:inline-flex relative overflow-hidden whitespace-nowrap items-center justify-between gap-4 text-[10px] font-medium tracking-[0.18em] uppercase px-5 py-2.5 rounded-full cursor-pointer"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            background: isDark ? "#F9F9F9" : "#1a1a1a",
            color: isDark ? "#1a1a1a" : "#F9F9F9",
            border: `1px solid ${ctaHovered ? (isDark ? "#F9F9F9" : "#1a1a1a") : "transparent"}`,
            transition: "background 500ms, color 500ms, border-color 300ms",
          }}
        >
          <PillButtonContent fill={isDark ? "black" : "white"}>
            Book Your Chauffeur
          </PillButtonContent>
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
          <span className={`block w-5 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
          <span className={`block w-5 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
          <span className={`block w-3 h-px transition-colors duration-300 ${isDark ? "bg-white/60" : "bg-black/60"}`} />
        </button>
      </nav>
    </header>
  );
}
