"use client";
import React, { useState } from "react";
import { Copy } from "lucide-react";

type EmailCopyProps = {
  email: string;
  className?: string;
};

const EmailCopy = ({ email, className }: EmailCopyProps) => {
  const [copied, setCopied] = useState(false)
  const handleCopy = async() => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.dispatchEvent(new CustomEvent("cursor:copied"));
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={`gap-2 tracking-[-0.09em] text-[20px] md:text-[25px] font-medium antialiased ${className}`}
    >
      <button
        onClick={handleCopy}
        data-cursor="copy"
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


