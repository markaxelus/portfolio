"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Project, projects } from "@/data/projects";
import ShowMore from "@/components/Buttons/ShowMore";

interface WorksProps {
  headingText: string;
  headingClassName: string;
}

const index = ({ headingText, headingClassName}: WorksProps) => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const mousePos = useRef({ x:0, y:0 })
  const currentPos = useRef({ x:0, y:0 })
  const previewRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (previewRef.current && hoveredProject) {
        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.025;
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.025;
        previewRef.current.style.transform = `
          translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)
          translate(-50%, -50%)
        `
      }
      frameId = requestAnimationFrame(animate)
    }
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hoveredProject]);

  /* Handlers */
  const handleMouseMove = (e: React.MouseEvent, proj: Project) => {
    mousePos.current = { x:e.clientX, y:e.clientY };
    if (hoveredProject?.id !== proj.id) {
      setHoveredProject(proj);
    }
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  }

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
      <div className="relative pt-12">
        {projects.map((project: Project) => (
          <Link
            key={project.id}
            href={`/works/${project.slug}`}
            onMouseMove={(e) => handleMouseMove(e, project)}
            onMouseLeave={handleMouseLeave}
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
            </div>
          </Link>
        ))}

        {/* Hover Image */}
        <img 
          ref={previewRef}
          src={hoveredProject?.imageUrl}
          alt={hoveredProject?.title}
          className={`
            pointer-events-none
            fixed top-0 left-0
            w-100 h-70 shadow-md
            rounded-xl
            transition-opacity duration-500 ease-out
            will-change-transform
            z-50
            ${hoveredProject ? 'opacity-90 scale-100' : 'opacity-0 scale-1'}
          `}
        />

      </div>
    </section>
  );
};

export default index;
