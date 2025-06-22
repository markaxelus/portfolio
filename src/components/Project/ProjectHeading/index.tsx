import React from "react";
import { Project } from "@/data/projects";
import Image from "next/image";

interface ProjectHeadingProps {
  project: Project;
}

const ProjectHeading: React.FC<ProjectHeadingProps> = ({ project }) => {
  const { metadata, imageUrl, title, club } = project;
  const [field, projName, year, focus] = metadata;

  return (
    <header className="relative w-full flex flex-col justify-between items-end gap-16  pb-[80px] border-b border-[rgb(245,245,245)] dark:border-neutral-800">
      {/* Metadata */}
      <div className="flex flex-col">
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">FIELD:</span>
          <span className="text-black dark:text-white uppercase">{field}</span>
        </div>
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">PROJECT:</span>
          <span className="text-black dark:text-white uppercase">{projName}</span>
        </div>
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">YEAR:</span>
          <span className="text-black dark:text-white uppercase">{year}</span>
        </div>
        <div className="flex text-[24px] gap-3">
          <span className="text-[#b3b3b3]">FOCUS:</span>
          <span className="text-black dark:text-white uppercase">{focus}</span>
        </div>
      </div>

      {/* Image and Title */}
      <div className="flex items-center gap-8 w-full">
        <div className="flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            width={900}
            height={800}
            className="w-full max-w-[900px] h-auto object-cover"
          />
        </div>
        <h1 className="text-[110px] font-bold tracking-[-0.06em] leading-[1] break-words">
          {club ?? title}
        </h1>
      </div>
    </header>
  );
};

export default ProjectHeading;