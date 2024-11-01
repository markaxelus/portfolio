"use client";
import Link from 'next/link'
import { usePathname } from "next/navigation"

import styles from './Navbar.module.css';

const navLinks = [
  {
    name: "home",
    path: "/"
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "projects",
    path: "/project",
  },
]

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex ">
      {navLinks.map((link,index) => {
          return(
            <Link href={link.path} key={index} className={`flex justify-center items-center w-56 h-32 border-x ${styles.navLink}
                                                            ${link.path === pathname && "bg-primary text-mainbg"}`}> 
              {link.name}
            </Link>  // Using key is for performance and correct rendering
          );
        })}
    </nav>
  )
}

export default Navbar