import React from "react";
import Link from "next/link";
import { Project, projects } from "@/data/projects";

interface WorksProps {
  headingText: string;
  headingClassName: string;
}

const index = ({ headingText, headingClassName }: WorksProps) => {
  return (
    <section
      className="max-w-[1600px] w-full mx-auto
          h-[100vh] 
          px-[20px] md:px-[30px] lg:px-0
          
          gap-12 md:gap-6"
    >
      {/* Heading */}
      <div className="flex justify-between">
        <h1 className={`${headingClassName}`}>{headingText}</h1>
        <Link href='/works'
          className="bg-[rgb(245,245,245)] w-[133px] h-[51px] "  
        >
          <button className=" w-full h-full tracking-[-0.04em] font-medium">
            Show more
          </button>
        </Link>
      </div>

      {/* Display Section */}
      <div className="pt-12">
        {projects.map((project: Project) => (
          <Link 
            key={project.id}
            href={`/works/${project.slug}`}
            className="group relative block border-[rgb(229, 231, 245)] border-b py-8 overflow-hidden"
          >
            <div className="">
              <span className="">0{project.id}</span>
              <h3 className="">{project.title}</h3>
              <span className="">{project.category}</span>
            </div>

          </Link>
        ))}
      </div>
    </section>
  );
};

export default index;
