import React from 'react'
import ShowMore from "@/components/Buttons/ShowMore"
const index = () => {
  return (
    <section className="max-w-[1600px] w-full mx-auto h-screen px-[20px] md:px-[30px] lg:px-0 gap-12 md:gap-6">
      {/* Heading Section */}
      <div className="flex justify-between">
        <h1 className={`text-[48px] tracking-[-0.03em] font-medium`}>
          flow.
        </h1>
        <ShowMore />
      </div>

      {/* Flow-Containers */}
      <div>
        <div>
          
        </div>
      </div>
    </section>
  )
}

export default index