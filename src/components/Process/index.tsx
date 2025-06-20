import React from 'react'
import { Workflow, workflow } from "@/data/workflow"
import ScrollReveal from "@/utils/Animation/ScrollReveal";


const index = () => {
  return (
    
    <div className="relative w-full 
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-[rgb(245,245,245)]
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[rgb(245,245,245)]">
      
      <section className="max-w-[1600px] w-full mx-auto px-[20px] md:px-[30px] lg:px-0 py-[80px]">

        {/* Heading */}
        <ScrollReveal direction="up" >
          <div className="flex justify-center md:justify-start  mb-16">
            <h1 className="text-[48px] tracking-[-0.03em] font-medium">process.</h1>
          </div>
        </ScrollReveal>

        {/* Alternating Workflow Steps */}
        <div>
          {workflow.map((step: Workflow, index) => (
            <ScrollReveal key={index} direction="up">
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center md:items-start even:flex-row-reverse
                    ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
                  `}
              >
                {/* Image placeholder */}
                <div className="w-full md:w-1/2">
                  <div className="w-full h-[60vh] md:h-[65vh] ">
                    <img
                      src={`${step.img}`}
                      alt={step.title}
                  className="w-full h-full object-cover block"
                    />
                  </div>
                </div>


                {/* Text content */}
                <div className="w-full md:w-1/2 flex items-center justify-center h-[65vh] px-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-[40px] font-medium tracking-[-0.05em]">{step.title}</h3>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </section>
    </div>
    
  )
}

export default index
