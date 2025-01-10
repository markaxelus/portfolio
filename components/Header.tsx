import Link from 'next/link'
import { Button } from './ui/button'  

// Components
import Navbar from './Navbar'
import MobileNav from './MobileNav'

import styles from "./Navbar.module.css"
const Header = () => (
    <header className=" py-4 xl:py-0  text-primary capitalize border-b ">
        <div className="mx-auto container flex justify-between items-center ">
            <Link href='/' className=''>
                <div className="w-full flex items-center">
                    <h1 className="text-5xl font-semibold ">
                        mark<span className="text-accent ">.</span>
                    </h1>
                </div>
            </Link>

            {/* Desktop Nav & Contact Me*/}
            <div className="hidden xl:flex items-center justify-center">
                <Navbar />
            </div>

            <Link href="/contact" className={`hidden xl:flex text-lg gap-2 items-center justify-center border rounded-full w-44 h-12  ${styles.navLink}`}>
                <img src='/icons/email.png' className={`${styles.email} `} />contact me
            </Link>

            {/* Mobile Nav */}
            <div className='xl:hidden'>
                <MobileNav />
            </div>

        </div>
    </header>
)

export default Header