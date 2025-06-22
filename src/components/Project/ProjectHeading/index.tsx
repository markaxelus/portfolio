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
    <header className="w-full flex flex-col justify-between gap-16 items-start md:items-end">
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

      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full md:w-auto">
        <div className="w-full md:w-[900px] flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            width={900}
            height={800}
            className="w-full h-auto object-cover "
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