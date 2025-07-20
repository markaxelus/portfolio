"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

type EmailCopyProps = {
  email: string;
  className?: string;
};

const EmailCopy = ({ email, className }: EmailCopyProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.dispatchEvent(new CustomEvent("cursor:copied"));
      setTimeout(() => setCopied(false), 900);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={`gap-2 tracking-[-0.09em] text-[30px] md:text-[35px] font-medium antialiased ${className}`}
    >
      <button
        onClick={handleCopy}
        data-cursor="copy"
        data-copied={copied}
        className="flex cursor-pointer text-inherit items-center gap-2"
        aria-label="Copy email"
        title="Copy email"
      >
        <span>{email}</span>

        {/* Icon container for smooth transition */}
        <span className="relative w-5 h-5 grid place-items-center">
          {/* Copy icon */}
          <Copy
            className={`absolute inset-0 m-auto w-5 h-5 transform transition-all duration-300
              ${
                copied
                  ? "rotate-45 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }
            `}
          />

          {/* Check icon */}
          <Check
            className={`absolute inset-0 m-auto w-5 h-5 transform transition-all duration-300
              ${
                copied
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-45 scale-0 opacity-0"
              }
            `}
          />
        </span>
      </button>
    </div>
  );
};

export default EmailCopy;
