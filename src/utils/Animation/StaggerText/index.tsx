// utils/Animation/AnimatedText.tsx
"use client";

import { motion } from "framer-motion";

interface StaggerTextProps {
  text: string;
  className?: string;
  distance?: number;     
  stiffness?: number;    
  damping?: number;      
  delay?: number;        
  letterDelay?: number;  
}

export default function AnimatedText({
  text,
  className = "",
  distance = 80,
  stiffness = 300,
  damping = 20,
  delay = 0,
  letterDelay = 0.05,
}: StaggerTextProps) {
  return (
    <div className="flex flex-wrap">
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: distance, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness,
            damping,
            delay: delay + i * letterDelay,
          }}
          className={className}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}
