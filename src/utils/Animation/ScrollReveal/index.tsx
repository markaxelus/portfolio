"use client"
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down';
  distance?: number;
  duration?: number;
  delay?: number;
}

const index = ({children, direction="up", distance=50, duration=0.6, delay=0}: ScrollRevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 })
  
  const variants = {
    hidden : {
      opacity: 0,
      y: direction === 'up' ? distance : -distance
    },
    visible : {
      opacity: 0,
      y: 0,
    }
  }

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? distance : -distance }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      variants={variants}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export default index