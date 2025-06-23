import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";


export type NavLink = { name: string; href: string };

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, links }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[90] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-down full screen */}
          <motion.aside
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white dark:bg-black z-[100] p-8 flex flex-col gap-10 overflow-y-auto md:hidden"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl font-bold text-black dark:text-white "
                onClick={onClose}
              >
                MARK
              </Link>
              <X
                className="w-8 h-8 text-black dark:text-white cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="flex flex-col gap-8 items-center justify-center h-[50%]">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-3xl font-semibold text-center text-black dark:text-white tracking-[-0.04em]"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MobileNav;
