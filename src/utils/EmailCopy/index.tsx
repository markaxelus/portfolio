"use client";
import React from "react";
import { Copy } from "lucide-react";

type EmailCopyProps = {
  email: string;
  className?: string;
};

const EmailCopy = ({ email, className }: EmailCopyProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(email);
  };

  return (
    <div
      className={`gap-2 tracking-[-0.09em] text-[20px] md:text-[25px] font-medium antialiased ${className}`}
    >
      <button
        onClick={handleCopy}
        className="flex cursor-pointer text-inherit p-1 items-center gap-2"
        aria-label="Copy email"
        title="Copy email"
      >
        <span>{email}</span>
        <Copy className="w-5 h-5 place-items-center" />
      </button>
    </div>
  );
};

export default EmailCopy;
