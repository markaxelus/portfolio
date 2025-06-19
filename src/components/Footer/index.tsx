"use client"
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link';

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
        py-[60px] 
      "
    >
      <div className="max-w-[1600px] w-full h-full mx-auto
          px-[20px] md:px-[30px] lg:px-0
          gap-12 md:gap-6
          flex flex-col justify-between
          ">
        {/* Top Container */}
        <div className="flex justify-end gap-[26px]">
          <Link href="https://www.linkedin.com/in/markaxelus/">LinkedIn</Link>
          <Link href="https://github.com/markaxelus">Github</Link>
          <Link href="https://www.instagram.com/mrkaxelus/">Instagram</Link>
        </div>
        {/* Middle container */}
        <div className="">
          <p className="
              text-[48px] tracking-[-2.4px] px-[2.4px] py-[2.4px] mx-[2.4px] my-[2.4px]
              leading-tight font-[500]
              bg-[linear-gradient(to_right,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,0.3)_65%,rgba(255,255,255,0)_100%)]
              bg-clip-text text-transparent
              w-full max-w-[1200px]
          ">
            Open to new ideas, new teams, and new challenges. <br />
            Big or small, every idea starts with a chat!
          </p>
          <div className="relative flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-custom-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 scale-[2]"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-white text-sm">Available For Work</span>
          </div>

        </div>

        {/* Bottom Container */}
        <div className="">
          test
        </div>
      </div>
    </motion.footer>
  )
}

export default index