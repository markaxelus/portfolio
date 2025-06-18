"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Project, projects } from "@/data/projects";
import ShowMore from "@/components/Buttons/ShowMore";

interface WorksProps {
  headingText: string;
  headingClassName: string;
}

const Works: React.FC<WorksProps> = ({ headingText, headingClassName }) => {
  // Hover state
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  // Track if current image has fully loaded
  const [imgReady, setImgReady] = useState(false);

  // Preload all images on mount
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.imageUrl;
    });
  }, []);

  // Mouse-follow refs
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Smooth follow loop
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      if (wrapperRef.current && hoveredProject) {
        currentPos.current.x += (mousePos.current.x - currentPos.current.x) * 0.025;
        currentPos.current.y += (mousePos.current.y - currentPos.current.y) * 0.025;
        wrapperRef.current.style.transform =
          `translate3d(${currentPos.current.x}px, ${
            currentPos.current.y
          }px, 0) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hoveredProject]);

  const handleMouseMove = (e: React.MouseEvent, proj: Project) => {
    const { clientX: x, clientY: y } = e;
    mousePos.current = { x, y };
    if (hoveredProject?.id !== proj.id) {
      // reset load state & snap position
      setImgReady(false);
      currentPos.current.x = x;
      currentPos.current.y = y;
      setHoveredProject(proj);
    }
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    setImgReady(false);
  };

  return (
    <section className="max-w-[1600px] w-full mx-auto h-screen px-[20px] md:px-[30px] lg:px-0 gap-12 md:gap-6">
      <div className="flex justify-between">
        <h1 className={`text-center ${headingClassName}`}>{headingText}</h1>
        <ShowMore />
      </div>

      <div className="relative pt-12">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/works/${project.slug}`}
            onMouseMove={(e) => handleMouseMove(e, project)}
            onMouseLeave={handleMouseLeave}
            className="group block border-b border-[rgb(229,231,245)] py-8 overflow-hidden"
          >
            <div className="flex justify-between px-[96px] py-[60px] min-h-[160px] tracking-[-0.04em]">
              <div className="flex gap-3">
                <span className="pt-3.5 text-gray-400 font-semibold">0{project.id}</span>
                <div className="leading-snug">
                  <h3 className="text-[48px] tracking-[-0.04em]">{project.title}</h3>
                  <span className="text-gray-500 tracking-[-0.06em]">
                    {project.dateAndType}
                  </span>
                </div>
              </div>
              <div className="flex flex-col justify-start items-end text-right">
                <span className="text-[28px] tracking-[-0.04em]">{project.category}</span>
                <span className="text-[16px] tracking-[-0.04em] text-gray-400 break-words max-w-[400px] leading-5">
                  {project.stack.join(", ")}
                </span>
              </div>
            </div>
          </Link>
        ))}

        {/* Wrapper for manual follow */}
        <div
          ref={wrapperRef}
          className="pointer-events-none fixed top-0 left-0 z-50 will-change-transform"
          style={{ transform: 'translate3d(-9999px,-9999px,0)' }}
        >
          <AnimatePresence mode="wait">
            {hoveredProject && (
              <motion.img
                key={hoveredProject.id}
                src={hoveredProject.imageUrl}
                alt={hoveredProject.title}
                loading="eager"
                onLoad={() => setImgReady(true)}
                initial={{ opacity: 0, scale: 1, y: 20 }}
                animate={imgReady ? { opacity: 0.9, scale: 1, y: 0 } : { opacity: 0, scale: 1, y: 20 }}
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.13, ease: 'easeOut' }}
                className="w-100 h-70 shadow-md rounded-xl"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Works;
