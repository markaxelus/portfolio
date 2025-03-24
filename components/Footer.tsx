import React from 'react'
import { socials } from "../data/Socials"
import Image from "next/image"
import Link from "next/link"
import Contact from "./Contact"

const Footer = () => {
  return (
    <div id="contact" className='flex justify-center items-center'>
        {/* Footer Container */}
        <div className='flex justify-between w-full max-w-[75%] border-2 rounded-xl min-h-screen px-8 pt-20'>
            {/* Quote Container */}
            <div>
                <h1 className='text-4xl font-semibold'>
                    Where <span className='text-blue-400'>functionality</span> & <br/>
                    <span className='text-pink-400'> aesthetics</span> meet
                </h1>
            </div>

            {/* Socials */}
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl text-orange-400 font-semibold'>
                    Follow Me
                </h1>
                <div className='flex flex-col gap-2'>
                    {socials.map((social, index) => (
                        <div 
                            key={index}
                            className='flex items-center gap-3'
                        >
                            <div className='relative w-8 h-8'>
                                <Image
                                    src={social.icon}
                                    alt={social.name}
                                    fill
                                    className='object-contain '
                                />
                            </div>
                            <Link href={social.link} target="_blank" className='text-xl font-medium'>{social.name}</Link>

                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Me */}
            <Contact />
                
            

        </div>
    </div>
  )
}

export default Footer