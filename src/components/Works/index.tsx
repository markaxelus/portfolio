"use client"
import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { Project, projects } from "@/data/projects";
import ShowMore from "@/components/Buttons/ShowMore";

interface WorksProps {
  headingText: string;
  headingClassName: string;
}

const index = ({ headingText, headingClassName}: WorksProps) => {
  const [hoverInfo, setHoverInfo] = useState<{
    project: Project;
    x: number;
    y: number;
  } | null>(null);

  return (
    <section
      className="max-w-[1600px] w-full mx-auto
          h-[100vh] 
          px-[20px] md:px-[30px] lg:px-0
          
          gap-12 md:gap-6"
    >
      {/* Heading */}
      <div className="flex justify-between ">
        <h1 className={`text-center ${headingClassName}`}>{headingText}</h1>
        <ShowMore />
      </div>

      {/* Display Section */}
      <div className="pt-12">
        {projects.map((project: Project) => (
          <Link
            key={project.id}
            href={`/works/${project.slug}`}
            onMouseMove={(e) => setHoverInfo({ project : project, x : e.clientX, y : e.clientY })}
            onMouseLeave={() => setHoverInfo(null)}
            className="group relative block border-[rgb(229, 231, 245)] border-b py-8 overflow-hidden"
          >
            <div className="flex justify-between px-[96px] py-[60px]  min-h-[160px] tracking-[-0.04em]">
              {/* Left Container: id, title, date */}
              <div className=" flex gap-3 ">
                <span className="pt-3.5 text-gray-400 font-semibold">0{project.id}</span>
                <div className="leading-snug">
                  <h3 className="text-[48px] tracking-[-0.04em]">
                    {project.title}
                  </h3>
                  <span className="text-gray-500 tracking-[-0.06em]">{project.dateAndType}</span>
                </div>
              </div>

              {/* Right Container: category, stack */}
              <div className="flex flex-col justify-start items-end text-right">
                <span className="text-[28px] tracking-[-0.04em]">
                  {project.category}
                </span>
                <span className="text-[16px] tracking-[-0.04em] text-gray-400 break-words max-w-[400px] leading-5">
                  {project.stack.join(", ")}
                </span>
              </div>

              {/* Hover Img */}
              {hoverInfo && (
                <img 
                  src={hoverInfo.project.imageUrl}  
                  alt={hoverInfo.project.title}
                  className="
                    pointer-events-none
                    fixed
                    w-100
                    h-70
                    rounded-lg
                    shadow-sm
                    opacity-95
                    transition-all duration-1000 ease-out
                    transform
                    -translate-x-1/2 -translate-y-1/2
                  "
                  style={{
                    top: hoverInfo.y,
                    left: hoverInfo.x,
                  }}
                />
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default index;
