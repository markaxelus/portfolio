"use client";
import { useState, useEffect, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  direction?: "up" | "down";
  distance?: number;
  duration?: number;
  delay?: number;
}

export default function ScrollReveal({
  children,
  direction = "up",
  distance = 50,
  duration = 0.6,
  delay = 0,
}: Props) {
  // 1) Track when we hit the client
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2) If we’re still SSR, just render the children un‐wrapped
  if (!mounted) {
    return <>{children}</>;
  }

  // 3) Once mounted, use Framer
  const initialY = direction === "up" ? distance : -distance;
  const ref = (useInView as any).ref; // if  have per‐element in‐view, otherwise drop this

  return (
    <motion.div
      ref={ref as any}
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{
        y: { type: "tween", duration, ease: "easeOut" },
        opacity: { duration: duration * 1.5, ease: "easeInOut" },
        delay,
      }}
      className="overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
