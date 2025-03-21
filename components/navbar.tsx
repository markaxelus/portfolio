import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const navbar = () => {
  return (
    <>
      <nav className=''>
        <ul>
          <li>
            <Link href='#top'>#Home</Link>
          </li>
          <li>
            <Link href='#projects'>#Projects</Link>
          </li>
          <li>
            <Link href='#about'>#About</Link>
          </li>
          <li>
            <Link href='#contact'>#Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default navbar