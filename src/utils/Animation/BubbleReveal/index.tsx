"use client";
import { motion } from "framer-motion";

interface BubbleRevealProps {
  src: string;
  alt?: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export default function BubbleReveal({
  src,
  alt = "",
  className = "",
  delay = 0,
  duration = 0.8,
}: BubbleRevealProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      initial={{ opacity: 0, scale: 0.1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration, ease: "easeOut", delay }}
    />
  );
}
