import React from 'react'
import Works from "@/components/Works"
import ShowMore from "@/components/Buttons/ShowMore"

const page = () => {
  return (
    <main className="pt-[150px] pb-[100px] ">
      <Works 
        headingText='WORK'
        headingClassName='text-[76px] md:text-[116px] lg:text-[174px] 
                        font-semibold leading-none tracking-[-0.09em]
                        text-center md:text-start'
      />

    </main>
  )
}

export default page