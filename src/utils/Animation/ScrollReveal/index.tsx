// utils/Animation/ScrollReveal.tsx
"use client";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
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
  const initialY = direction === "up" ? distance : -distance;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}   
      transition={{
        y: {
          type: "tween",
          duration: duration,
          ease: "easeOut"
        },
        opacity: {
          duration: duration * 1.5,      
          ease: "easeInOut"              
        },
        delay
      }}
    >
      {children}
    </motion.div>
  );
}
