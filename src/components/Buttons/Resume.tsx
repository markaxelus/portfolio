import React from "react";
import { Download } from "lucide-react";

type ResumeProps = {
  href?: string;  
  className?: string;
};

const Resume = ({ href = "/resume.pdf", className  }: ResumeProps) => {
  return (
    <div className="flex items-center w-full">
      <a
        href={href}
        download="MarkAxelus_Resume.pdf"       
        target="_blank"                    
        rel="noopener noreferrer"         
        className={className}
      >
        <span>Resume</span>
        <Download className="w-4 h-4" />
      </a>
    </div>
  );
};

export default Resume;
