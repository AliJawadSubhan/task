"use client";

import Image, { type ImageProps } from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type ParallaxImageProps = Omit<ImageProps, "fill"> & {
  /** Max translation in px the image shifts opposite the cursor. */
  strength?: number;
  /** How far the image zooms in on hover (1 = no zoom). */
  hoverScale?: number;
  containerClassName?: string;
};

export function ParallaxImage({
  strength = 16,
  hoverScale = 1.08,
  containerClassName,
  className,
  style,
  ...imageProps
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 18, mass: 0.3 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * -2 * strength);
    y.set(py * -2 * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={containerClassName ?? "absolute inset-0 overflow-hidden"}
    >
      <motion.div
        className="absolute -inset-[10%]"
        style={{ x: springX, y: springY }}
        whileHover={{ scale: hoverScale }}
        transition={{ scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
      >
        <Image fill className={className} style={style} {...imageProps} />
      </motion.div>
    </div>
  );
}
