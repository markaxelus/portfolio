import React from 'react'
import { socials } from "../data/Socials"
import Image from "next/image"
import Link from "next/link"
import Contact from "./Contact"

const Footer = () => {
  return (
    <div id="contact" className="flex justify-center items-center px-4">
      {/* Footer Container */}
      <div className="flex flex-col w-full max-w-[90%] md:max-w-[60%] border-2 rounded-xl py-10 md:py-20 px-4 md:px-44">
        {/* Quote & Contact Container */}
        <div className="flex flex-col md:flex-row justify-between w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-8 md:gap-24">
            <h1 className="text-2xl md:text-4xl font-semibold">
              Where <span className="text-blue-400">functionality</span> & <br className="block md:hidden" />
              <span className="text-pink-400"> aesthetics</span> meet ✨
            </h1>
            <div className="pl-0 md:pl-24">
              <h1 className="text-xl md:text-3xl font-semibold leading-tight">
                Contact <br /> Me 📬
              </h1>
              <p className="text-base md:text-lg text-gray-400">Say Hello! 👋</p>
              <Contact />
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-4 mt-8 md:mt-0 md:ml-44">
            <h1 className="text-xl md:text-3xl text-orange-400 font-semibold pt-8 md:pt-16">
              Follow Me 😎
            </h1>
            <div className="flex flex-col gap-2">
              {socials.map((social, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative w-6 h-6 md:w-8 md:h-8">
                    <Image
                      src={social.icon}
                      alt={social.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Link href={social.link} target="_blank" className="text-lg md:text-xl font-medium">
                    {social.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Name Banner */}
        <div className="relative mt-12 md:mt-20 w-full text-center">
          {/* Using CSS clamp for responsive text size */}
          <h1 className="font-bold leading-none whitespace-nowrap overflow-visible text-clip text-[clamp(2rem,8vw,7.5em)]">
            MARK AXELUS
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Footer
