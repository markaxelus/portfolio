"use client"
import React from 'react'
import Link from 'next/link';

const index = () => {
  return (
    <footer
      className="
        h-screen bg-black text-white sticky bottom-0 -z-10
        py-[60px] 
      "
    >
      <div className="max-w-[1600px] w-full h-full mx-auto
          px-[20px] md:px-[30px] 
          gap-12 md:gap-6
          flex flex-col justify-between
          ">
        {/* Top Container */}
        <div className="flex justify-end gap-[26px]">
          <Link href="https://www.linkedin.com/in/markaxelus/" target='_blank'>LinkedIn</Link>
          <Link href="https://github.com/markaxelus" target='_blank'>Github</Link>
          <Link href="https://www.instagram.com/mrkaxelus/" target='_blank'>Instagram</Link>
        </div>
        {/* Middle container */}
        <div className="flex flex-col gap-[40px]">
          <p className="
              text-[32px] md:text-[40px] tracking-[-2.4px] px-[2.4px] py-[2.4px] mx-[2.4px] my-[2.4px]
              leading-tight font-[500]
              bg-[linear-gradient(to_right,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,0.3)_95%,rgba(255,255,255,0)_100%)]
              md:bg-[linear-gradient(to_right,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,0.3)_90%,rgba(255,255,255,0)_100%)]
              lg:bg-[linear-gradient(to_right,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_40%,rgba(255,255,255,0.3)_55%,rgba(255,255,255,0)_100%)]
              bg-clip-text text-transparent
              w-full max-w-[800px] md:max-w-[500px] lg:max-w-[1200px]
          ">
            Open to new ideas, new teams, and new challenges. <br />
            Big or small, every idea starts with a chat!
          </p>
          <div className="relative flex items-center flex-col-reverse md:flex-row gap-10 md:gap-15 md:w-fit">
            <div className="flex items-center justify-center bg-white text-black w-full md:w-auto py-[20px] px-[36px]">
              <Link href="/contact" className='font-[500]'>
                Get in Touch
              </Link>
            </div>
            
            <div className="flex md:items-center gap-4 ">
              <span className="relative flex h-3 w-3 ">
                <span className="animate-custom-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 scale-[2]"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-white text-[16px] font-[500] ">Available For Work</span>
            </div>
          </div>

        </div>

        {/* Bottom Container */}
        <div className="flex justify-between ">
          {/* Left Container: Email, Location */}
          <div className="flex flex-col ">
            <span className="font-[400] text-[14px] md:text-[16px]">mrkaxelus@gmail.com</span>
            <span className="font-[400] text-[14px] md:text-[16px]">Victoria, BC</span>
          </div>

          {/* Right Container: Rights */}
          <div className="flex flex-col  ">
            <span className="text-[14px] md:text-[16px]">All rights reserved, <br/> MARK©2025</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default index