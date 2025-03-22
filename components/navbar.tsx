"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from "./styles/Navbar.module.css"


const navbar = () => {
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const sectionIds = ['top', 'projects', 'about', 'contact'];
    const sections = sectionIds 
                      .map(id => document.getElementById(id))
                      .filter((el): el is HTMLElement  => el !== null);
    
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6}
    );

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section))
    }
  }, [])

  return (
    <>
      <nav className={`flex pt-5 text-gray-400 ${styles.nav}`}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${activeSection === 'top' ? styles.active : ''}`}>
          <Link href="#top" onClick={() => setActiveSection('top')}>#Home</Link>
        </li>
        <li className={`${styles.navItem} ${activeSection === 'projects' ? styles.active : ''}`}>
          <Link href="#projects" onClick={() => setActiveSection('projects')}>#Projects</Link>
        </li>
        <li className={`${styles.navItem} ${activeSection === 'about' ? styles.active : ''}`}>
          <Link href="#about" onClick={() => setActiveSection('about')}>#About</Link>
        </li>
        <li className={`${styles.navItem} ${activeSection === 'contact' ? styles.active : ''}`}>
          <Link href="#contact" onClick={() => setActiveSection('contact')}>#Contact</Link>
        </li>
      </ul>
    </nav>
    </>
  )
}

export default navbar