import React from 'react'
import ShowMore from "@/components/Buttons/ShowMore"
import { Workflow, workflow } from "@/data/workflow"
import { User2 } from "lucide-react"

const index = () => {
  return (
    <section className="max-w-[1600px] w-full mx-auto px-[20px] md:px-[30px] lg:px-0 gap-12 md:gap-6 pb-[120px] ">
      {/* Heading Section */}
      <div className="flex justify-between">
        <h1 className="text-[48px] tracking-[-0.03em] font-medium">
          flow.
        </h1>
      </div>

      {/* Flow-Containers */}
      <div className="flex flex-col md:flex-row gap-8 pt-[48px] justify-center items-center">
        {workflow.map((flow: Workflow, index) => {
          const Icon = flow.icon ?? User2;
          const color = ["#00BAD5", "#9D95FF", "#FEC5FB", "#FF8709"][index];
          return (
            <div
              key={index}
              className=" flex-1 rounded-2xl p-6 pt-[150px] pr-[40px] pl-[24px] max-w-[400px] shadow-md bg-[rgb(245,245,245)]
              transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="rounded-xl p-4 tracking-[-0.04em] max-w-[600px]">
                <Icon className="w-10 h-10 mb-2 text-black " style={{ color }}/>
                <h3 className="text-xl  mb-2 text-black font-bold" style={{ color }}>{flow.title}</h3>
                <p className="text-gray-700 text-sm font-medium">{flow.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default index
