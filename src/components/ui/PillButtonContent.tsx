"use client";

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className ?? ""}`}
    >
      <path
        d="M1 11L11 1M11 1H3M11 1V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PillButtonContent({
  children,
  fill = "black",
}: {
  children: React.ReactNode;
  fill?: "black" | "white";
}) {
  const fillBg = fill === "black" ? "bg-black" : "bg-white";
  const hoverText = fill === "black" ? "group-hover:text-white" : "group-hover:text-black";

  return (
    <>
      <span
        aria-hidden="true"
        className={`absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${fillBg} rounded-full opacity-0 group-hover:w-[480px] group-hover:h-[480px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none`}
      />
      <Arrow
        className={`absolute z-[1] left-[1.1em] opacity-0 -translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:translate-x-0 ${hoverText}`}
      />
      <span className={`relative z-[1] transition-all duration-500 ease-out group-hover:translate-x-[0.9em] ${hoverText}`}>
        {children}
      </span>
      <Arrow
        className={`relative z-[1] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-0 group-hover:translate-x-3 ${hoverText}`}
      />
    </>
  );
}
