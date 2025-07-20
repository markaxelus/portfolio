import React from "react";
import { Project } from "@/data/projects";
import Image from "next/image";

interface ProjectHeadingProps {
  project: Project;
}

const ProjectHeading: React.FC<ProjectHeadingProps> = ({ project }) => {
  const { metadata, imageUrl, title, club } = project;
  const { focus, project: projName, year, tools } = metadata;

  return (
    <header className="relative w-full flex flex-col justify-between items-end gap-16  pb-[80px] border-b border-[rgb(245,245,245)] dark:border-neutral-800">
      {/* Metadata */}
      <div className="flex flex-col">
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">FIELD:</span>
          <span className="text-black dark:text-white uppercase">{focus}</span>
        </div>
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">PROJECT:</span>
          <span className="text-black dark:text-white uppercase">
            {projName}
          </span>
        </div>
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">YEAR:</span>
          <span className="text-black dark:text-white uppercase">{year}</span>
        </div>
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">TOOLS:</span>
          <span className="text-black dark:text-white uppercase break-words max-w-[550px]">
            {tools}
          </span>
        </div>
      </div>

      {/* Image and Title */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6 lg:gap-8 w-full">
        <div className="flex-shrink-0 w-full lg:w-auto relative">
          <Image
            src={imageUrl}
            alt={title}
            width={900}
            height={800}
            className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[900px] h-auto object-cover mx-auto lg:mx-0"
          />
          {/* Title overlay on mobile */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px] font-bold tracking-[-0.06em] leading-[1] break-words w-full lg:hidden text-center mt-4">
            {club ?? title}
          </h1>
        </div>
        {/* Title for desktop */}
        <h1 className="hidden lg:block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[110px] font-bold tracking-[-0.06em] leading-[1] break-words w-full lg:w-auto">
          {club ?? title}
        </h1>
      </div>
    </header>
  );
};

export default ProjectHeading;
