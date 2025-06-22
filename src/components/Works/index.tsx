"use client"
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion";
import { Project, projects } from "@/data/projects";
import ShowMore from "@/components/Buttons/ShowMore";
import ScrollReveal from "@/utils/Animation/ScrollReveal";
import { createPortal } from 'react-dom';
import NextImage from "next/image";


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
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const onWorksPage = pathname === "/works";
  const list = onWorksPage ? projects : projects.slice(0, 4);

  // Create wrapper div in body once
  useEffect(() => {
    const node = document.createElement('div');
    node.className = "pointer-events-none fixed top-0 left-0 z-50 will-change-transform";
    node.style.transform = 'translate3d(-9999px,-9999px,0)';
    document.body.appendChild(node);
    wrapperRef.current = node;
    return () => {
      document.body.removeChild(node);
    };
  }, []);

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
    <section className="max-w-[1600px] w-full mx-auto min-h-screen px-[20px] md:px-[30px] lg:px-0 gap-12 md:gap-6 py-[20px] bg-white dark:bg-black">

      {/* Heading & ShowMore */}
      <div className="flex justify-between items-center">
        <h1 className={`text-[24px] md:text-[48px] tracking-[-0.03em] font-medium ${headingClassName}`}>
          {headingText}
        </h1>
        {!onWorksPage && <ShowMore href="/works" />}
      </div>

      {/* For sm-md screen size */}
      <div className="relative pt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {(onWorksPage ? list : list.slice(0, 4)).map((project, idx) => (
            <ScrollReveal key={project.id} direction="up" delay={idx * 0.1}>
              <Link
                href={`/works/${project.slug}`}
                onMouseMove={(e) => handleMouseMove(e, project)}
                onMouseLeave={handleMouseLeave}
                className="block overflow-hidden"
              >
                {/* Project Image */}
                <NextImage
                  src={project.imageUrl}
                  alt={project.title}
                  width={800}
                  height={480}
                  className="w-full h-auto object-cover aspect-[5/3]"
                />

                {/* Title and Date */}
                <div className="flex justify-between items-baseline mt-2">
                  <h3 className="text-lg font-semibold uppercase">{project.title}</h3>
                  <span className="text-[12px] text-neutral-400">
                    {project.dateAndType}
                  </span>
                </div>

                {/* Stack */}
                <p className="text-[13px] text-neutral-500 leading-snug w-[250px]">
                  {project.stack.join(", ")}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* for lg+ screen size */}
        <div className="hidden lg:block">
          {list.map((project, idx) => (
            <ScrollReveal key={project.id} direction="up" delay={idx * 0.1}>
              <Link
                href={`/works/${project.slug}`}
                onMouseMove={(e) => handleMouseMove(e, project)}
                onMouseLeave={handleMouseLeave}
                className="group block border-b border-[rgb(229,231,245)] dark:border-neutral-800 py-8 overflow-hidden"
              >
                <div className="flex justify-between px-[96px] py-[60px] min-h-[160px] tracking-[-0.04em]">
                  <div className="flex gap-3">
                    <span className="pt-3.5 text-gray-400 font-semibold">
                      0{project.id}
                    </span>
                    <div className="leading-snug">
                      <h3 className="text-[48px] tracking-[-0.08em] uppercase">
                        {project.title}
                      </h3>
                      <span className="text-neutral-400 tracking-[-0.06em]">
                        {project.dateAndType}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-start items-end text-right">
                    <span className="text-[28px] font-medium tracking-[-0.04em]">
                      {project.category}
                    </span>
                    <span className="text-[16px] tracking-[-0.04em] text-gray-400 break-words max-w-[400px] leading-5">
                      {project.stack.join(", ")}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {wrapperRef.current && createPortal(
          <AnimatePresence mode="wait">
            {hoveredProject && (
              <motion.img
                key={hoveredProject.id}
                src={hoveredProject.imageUrl}
                alt={hoveredProject.title}
                loading="eager"
                onLoad={() => setImgReady(true)}
                initial={{ opacity: 0, scale: 1, y: 20 }}
                animate={
                  imgReady
                    ? { opacity: 0.9, scale: 1, y: 0 }
                    : { opacity: 0, scale: 1, y: 20 }
                }
                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-100 h-60 shadow-md rounded-xl"
              />
            )}
          </AnimatePresence>,
          wrapperRef.current
        )}
      </div>
    </section>
  );
};

export default Works;