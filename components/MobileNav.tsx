"use client";

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import { CiMenuFries } from "react-icons/ci"


const MobileNav = () => {
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
        {
            name: "contact",
            path: "/contact",
            icon: "/icons/contact.png",
        },
        
    ];
    const pathname = usePathname();
  return (
    <Sheet >
        <SheetTrigger className="flex justify-center items-center">
            <CiMenuFries className="text-[32px] text-accent"/>
        </SheetTrigger>
        <SheetContent 
        aria-describedby={undefined}
        className="flex flex-col"
        >
            <SheetTitle></SheetTitle>
            {/* logo */}
            <div className="mt-32 mb-40 text-center text-2xl">
                <Link href='/'>
                    <h1 className="text-5xl font-semibold capitalize">
                        mark<span className="text-accent ">.</span>
                    </h1>
                </Link>
            </div>
            {/* nav */}
            <nav 
            className="flex flex-col justify-center items-center gap-8" 
            aria-label="Mobile navigation"
            >    
                {navLinks.map((link,index) => {
                    return(
                        <Link href={link.path}
                              key={index}
                              className={`text-xl capitalize hover:text-accent transition-all ${link.path === pathname && 
                                'text-primary border-b-2 border-accent'}`}>
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav