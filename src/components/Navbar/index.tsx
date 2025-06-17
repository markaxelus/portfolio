"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { Sun, Moon, Menu, X } from "lucide-react"

const index = () => {

  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navLinks = [
    { name: "WORKS", href: "/works"},
    { name: "ABOUT", href: "/about"},
    { name: "CONTACT", href: "/contact"},
  ]

  return (
    <nav className='fixed top-0 left-0 w-full z-50 h-[81px] border-solid border-b border-b-[rgb(245,245,245)]'>
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
          {isNavOpen &&
            navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              className='font-medium text-[15px] '
            >
              {link.name}
            </Link>
          ))}

          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="relative w-8 h-8 grid place-items-center"
          >
            {/* Menu Icon */}
            <Menu
              className={`absolute inset-0 m-auto h-6 w-6 transform transition-all duration-300 cursor-pointer
                ${isNavOpen ? 'rotate-45 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
              `}
            />

            {/* X Icon */}
            <X
              className={`absolute inset-0 m-auto h-6 w-6 transform transition-all duration-300 cursor-pointer
                ${isNavOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-45 scale-0 opacity-0'}
              `}
            />
          </button>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className=
              {isDarkMode ? `cursor-pointer`
                      : ``
              }
          >
            {isDarkMode ? (
              <Sun className='h-6 w-6 cursor-pointer'/>
            ) : (
              <Moon className='h-6 w-6 cursor-pointer'/> 
            )}

          </button>
        </div>
      </div>
    </nav>
  )
}

export default index