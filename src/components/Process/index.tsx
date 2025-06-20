import React from 'react'
import { Workflow, workflow } from "@/data/workflow"
import ScrollReveal from "@/utils/Animation/ScrollReveal";
import ImageReveal from "@/utils/Animation/ImageReveal";


const index = () => {
  return (
    
    <div className="relative w-full bg-white
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-px before:bg-[rgb(245,245,245)]
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[rgb(245,245,245)]">
      
      <section className="max-w-[1600px] w-full mx-auto px-[20px] md:px-[30px] lg:px-0 py-[20px]">

        {/* Heading */}
        <ScrollReveal direction="up" >
          <div className="flex  md:justify-start mb-8 md:mb-16">
            <h1 className="text-[24px] md:text-[48px] tracking-[-0.03em] font-medium">
              process.
            </h1>
          </div>
        </ScrollReveal>

        {/* Alternating Workflow Steps */}
        <div>
          {workflow.map((step: Workflow, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-stretch
                  ${index % 2 === 1 ? "md:flex-row-reverse" : ""}
                `}
            >
              {/* Image placeholder */}
              <div className="w-full md:w-1/2">
                <div className="w-full aspect-[4/3]">
                  <ImageReveal
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover block"
                    direction="up"
                  />
                </div>
              </div>


              {/* Text content */}
              <div className="w-full md:w-1/2">
                <ScrollReveal
                  direction="up"
                  delay={0.1}
                  className="w-full h-full"
                  motionClassName="flex items-center justify-center p-4 md:p-8"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-[24px] md:text-[40px] leading-tight font-medium tracking-[-0.05em]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[12px] md:text-sm text-neutral-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
    
  )
}

export default index
