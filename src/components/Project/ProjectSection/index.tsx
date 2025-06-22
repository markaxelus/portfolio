import React from "react";
import Link from "next/link";

type ProjectSectionProps = {
  title: string;
  content: string;
  projectLink?: string;
};

const ProjectSection = ({
  title,
  content,
  projectLink,
}: ProjectSectionProps) => {
  return (
    <section className="relative w-full py-[40px] border-b border-[rgb(245,245,245)] dark:border-neutral-800">
      <div className="flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-8 max-w-[70%]">
          <h2 className="text-[24px] md:text-[48px] font-[500] tracking-[-0.03em]">
            {title}
          </h2>
          <p className="text-[18px] md:text-[24px] font-[400] text-neutral-800 dark:text-neutral-400">
            {content}
          </p>
        </div>

        {title === "overview." && projectLink && (
          <div className="flex items-center">
            <Link
              href={projectLink}
              target="_blank"
              className="bg-[rgb(245,245,245)] dark:bg-neutral-800 dark:text-white w-[203px] h-[71px] tracking-[-0.04em] flex items-center justify-center font-medium text-[20px]"
            >
              Take a Look!
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectSection;
