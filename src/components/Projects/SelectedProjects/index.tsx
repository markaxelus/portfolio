import React from "react";
import Link from "next/link";
import { Project, projects } from "@/data/projects";

interface SelectedProjectsProps {
  headingText: string;
  headingClassName: string;
}

const index = ({ headingText, headingClassName }: SelectedProjectsProps) => {
  return (
    <section
      className="max-w-[1600px] w-full mx-auto
          h-[100vh] 
          px-[20px] md:px-[30px] lg:px-0
          flex flex-col md:justify-between 
          gap-12 md:gap-6"
    >
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
    </section>
  );
};

export default index;
