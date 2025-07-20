"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/utils/Animation/ScrollReveal";
import useDarkMode from "@/utils/useDarkMode";
import MobileNav from "@/components/MobileNav";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isDarkMode, toggle } = useDarkMode();
  const navLinks = [
    { name: "WORKS", href: "/works" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];
  const navIconStyling = `absolute inset-0 m-auto h-6 w-6 transform transition-all duration-300 cursor-pointer`;
  return (
    <ScrollReveal direction="down">
      <nav className=" h-[81px] bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="flex px-[30px] py-[24px]">
          {/* Name Heading */}
          <div className="text-3xl font-bold text-black dark:text-white">
            <Link href="/">MARK</Link>
          </div>

          <div className="flex-1" />

          {/* Right-Side Navigation */}
          <div className="flex items-center gap-8">
            {/* NavLinks */}
            <AnimatePresence>
              {isNavOpen && (
                <motion.div
                  className="hidden md:flex gap-8"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="font-[500] text-[15px] tracking-[-0.04em] text-black dark:text-white"
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
                  ${
                    isNavOpen
                      ? "rotate-45 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }
                `}
              />

              {/* X Icon */}
              <X
                className={`${navIconStyling}
                  ${
                    isNavOpen
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-45 scale-0 opacity-0"
                  }
                `}
              />
            </button>

            <button onClick={toggle} className="relative pr-[30px]">
              <Moon
                className={`${navIconStyling}
                  ${
                    isDarkMode
                      ? "rotate-45 scale-0 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }
                `}
              />

              <Sun
                className={`${navIconStyling}
                  ${
                    isDarkMode
                      ? "rotate-0 scale-100 opacity-100"
                      : "rotate-45 scale-0 opacity-0"
                  }
                `}
              />
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        links={navLinks}
      />
    </ScrollReveal>
  );
};

export default Navbar;
