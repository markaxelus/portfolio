import Link from 'next/link'
import { Button } from './ui/button'  

// Components
import Navbar from './Navbar'

import styles from "./Navbar.module.css"
const Header = () => (
    <header className="py-4 xl:py-0 text-primary capitalize border-b ">
        <div className="container mx-auto flex justify-between items-center">
            <Link href='/'>
                <div className="flex items-center">
                    <h1 className="text-5xl font-semibold">
                        mark<span className="text-accent">.</span>
                    </h1>
                </div>
            </Link>

            {/* Desktop Nav & Contact Me*/}
            <div className="hidden xl:flex items-center justify-center ">
                <Navbar />
            </div>

            <Link href="/contact" className={`hidden xl:flex text-xl gap-2 items-center justify-center border rounded-full w-44 h-12  ${styles.navLink}`}>
                <img src='/icons/email.png' className={`${styles.email} `} />contact me
            </Link>

            {/* Mobile Nav */}
            <div className='xl:hidden'>
                mobile
            </div>

        </div>
    </header>
)

export default Header