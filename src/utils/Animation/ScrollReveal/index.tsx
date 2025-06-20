"use client";
import { ReactNode, useRef } from "react";
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
  // 1) Create a ref and observe it
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // 2) Compute our initial offset
  const initialY = direction === "up" ? distance : -distance;

  // 3) Render a clipping container + motion div
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={false}                 // no SSR mismatch
        animate={
          inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: initialY }
        }
        transition={{
          y: { type: "tween", duration, ease: "easeOut", delay },
          opacity: { duration: duration * 1.2, ease: "easeInOut", delay },
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
