import React from "react";
import { Download } from "lucide-react";

type ResumeProps = {
  href?: string;  // make href optional now that we know the path
};

const Resume = ({ href = "/resume.pdf" }: ResumeProps) => {
  return (
    <div className="flex items-center">
      <a
        href={href}
        download="My-Name-Resume.pdf"       
        target="_blank"                    
        rel="noopener noreferrer"         
        className="
          bg-[rgb(245,245,245)]
          w-[133px] h-[51px]
          tracking-[-0.04em]
          flex items-center justify-center
          font-medium gap-2
        "
      >
        <Download className="w-5 h-5" />
        <span>Resume</span>
      </a>
    </div>
  );
};

export default Resume;
