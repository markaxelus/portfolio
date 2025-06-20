"use client"
import { useRef } from 'react'
import { m, motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down';
  distance?: number;
  duration?: number;
  delay?: number;
}

const index = ({children, direction="up", distance=50, duration=0.6, delay=0}: ScrollRevealProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin:"-100px" })
  
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
      initial='hidden'
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}

export default index