import React from 'react'
import Works from "@/components/Works"
import ScrollReveal from '@/utils/Animation/ScrollReveal'
import Footer from "@/components/Footer"

const page = () => {
  return (
    <>
      <main className="relative z-10 bg-white pt-[150px]">
        <ScrollReveal direction='up'>
          <Works 
            headingText='WORK'
            headingClassName='text-[76px] md:text-[116px] lg:text-[174px] 
                            font-semibold leading-none tracking-[-0.09em]
                            text-center md:text-start'
          />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  )
}

export default page