import React from "react";
import { ArrowUpRight } from "lucide-react";

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
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <span>Resume</span>
      <ArrowUpRight className="w-4 h-4" />
    </a>
  );
};

export default Resume;
