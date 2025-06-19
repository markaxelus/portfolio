"use client"
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const index = () => {
  const { scrollYProgress } = useScroll();

  const reveal = useTransform(scrollYProgress, [0.4,1], [0, 1], {
    clamp: true,
  });

  const y = useTransform(reveal, [0, 1], ["500%", "0%"])
  return (
    <motion.footer
      style={{ y }}
      className="
        fixed bottom-0 left-0 right-0 h-screen bg-black text-white z-50
      "
    >
      <div className="">
        test
      </div>
    </motion.footer>
  )
}

export default index