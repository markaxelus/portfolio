import React from "react";
import { Download } from "lucide-react";

type ResumeProps = {
  href?: string;
  className?: string;
};

const Resume = ({
  href = "/MarkAxelus_Resume.pdf",
  className,
}: ResumeProps) => {
  return (
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
  );
};

export default Resume;
