import React from 'react'
import Footer from '@/components/Footer'
import StaggerText from '@/utils/Animation/StaggerText'
import EmailCopy from '@/utils/EmailCopy'
import ScrollReveal from '@/utils/Animation/ScrollReveal'

const page = () => {
  return (
    <div
      className=" 
           min-h-screen
           pt-[180px]
           flex flex-col
           gap-12 md:gap-34"
    >
      <ScrollReveal direction='up'>
        <div className="flex flex-col bg-white px-[20px] md:px-[80px] mb-24 md:mb-32">
          <StaggerText
            text="SHOOT   A"
            className="text-[76px] md:text-[116px] lg:text-[200px] font-bold leading-none tracking-[-0.09em] whitespace-pre"
            distance={100}
            delay={0}
            letterDelay={0.07}
          />
          <StaggerText
            text="MESSAGE"
            className="text-[76px] md:text-[116px] lg:text-[200px] font-bold leading-none tracking-[-0.09em]"
            distance={100}
            delay={0.2}
            letterDelay={0.07}
          />
        </div>

        {/* Form Section */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 bg-white px-[20px] md:px-[80px] pb-[180px]">
          {/* Left Column: Email */}
          <div className="w-full md:w-1/3">
            <EmailCopy email="mrkaxelus@gmail.com" className="text-[25px] md:text-[35px] font-medium antialiased" />
          </div>

          {/* Right Column: Form */}
          <div className="w-full md:w-2/3">
            <form className="flex flex-col gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-neutral-100 p-4 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="bg-neutral-100 p-4  placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition"
              />
              <textarea
                placeholder="Your Masterpiece Starts Here"
                rows={6}
                className="bg-neutral-100 p-4  placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-300 resize-none transition"
              />
              <button
                type="submit"
                className="bg-neutral-900 text-white p-4  font-medium hover:bg-neutral-800 transition-colors"
              >
                Send It!
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
      {/* New Footer */}
      <Footer />
    </div>
  )
}

export default page