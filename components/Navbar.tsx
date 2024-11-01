"use client";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Image from 'next/image';

import styles from './Navbar.module.css';

const navLinks = [
  {
    name: "home",
    path: "/",
    icon: "/icons/home.png",
  },
  {
    name: "about",
    path: "/about",
    icon: "/icons/about.png",
  },
  {
    name: "projects",
    path: "/projects",
    icon: "/icons/projects.png",
  },
  
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex">
      {navLinks.map((link, index) => {
        const isActive = link.path === pathname;
        return (
          <Link
            href={link.path}
            key={index}
            className={`flex justify-center items-center w-56 h-32 gap-2 text-xl border-x ${styles.navLink} ${isActive ? styles.activeLink : ""} ${isActive ? "bg-primary text-mainbg" : ""}`}
          >
            <Image
              src={link.icon}
              alt={`${link.name} icon`}
              width={17} 
              height={17}
              className={styles.icons}
            />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navbar;
