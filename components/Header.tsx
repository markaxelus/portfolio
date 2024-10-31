import Link from 'next/link'
import { Button } from './ui/button'  

// Components
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-primary capitalize">
        <div className="container mx-auto flex justify-between items-center">
            <Link href='/'>
                <h1 className='text-4xl font-semibold'>
                    mark<span className='text-accent'> .</span>
                </h1>
            </Link>

        {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-8">
                <Navbar />
                <Link href="/contact">
                    <Button className="bg-red-400 capitalize">
                        contact me
                    </Button>
                </Link>
            </div>
            
        {/* Mobile Nav */}
            <div className='xl:hidden'>
                mobile
            </div>

        </div>
    </header>
  )
}

export default Header