"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/utils/Animation/ScrollReveal'

const index = () => {

  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navLinks = [
    { name: "WORKS", href: "/works"},
    { name: "ABOUT", href: "/about"},
    { name: "CONTACT", href: "/contact"},
  ]
  const navIconStyling = `absolute inset-0 m-auto h-6 w-6 transform transition-all duration-300 cursor-pointer`
  return (
    <ScrollReveal direction='down'>
      <nav className=' h-[81px] bg-white'>
        <div className='flex px-[30px] py-[24px]'>
          {/* Name Heading */}
          <div className="text-3xl font-bold">
            <Link href='/'>
              MARK
            </Link>
          </div>

          <div className="flex-1" />

          {/* Right-Side Navigation */}
          <div className="flex items-center gap-8">
            {/* NavLinks */}
            <AnimatePresence>
              {isNavOpen && (
                <motion.div
                  className="flex gap-8"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {navLinks.map(link => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className='font-[500] text-[15px] tracking-[-0.04em]'
                    >
                      {link.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="relative w-8 h-8 grid place-items-center"
            >
              {/* Menu Icon */}
              <Menu
                className={`${navIconStyling}
                  ${isNavOpen ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
                `}
              />

              {/* X Icon */}
              <X
                className={`${navIconStyling}
                  ${isNavOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-45 scale-0 opacity-0'}
                `}
              />
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="relative pr-[30px]"
                
            >
              <Moon
                className={`${navIconStyling}
                  ${isDarkMode ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
                `}
              />

              <Sun
                className={`${navIconStyling}
                  ${isDarkMode ? 'rotate-0 scale-100 opacity-100' : 'rotate-45 scale-0 opacity-0'}
                `}
              />

            </button>
          </div>
        </div>
      </nav>
    </ScrollReveal>
  )
}

export default index