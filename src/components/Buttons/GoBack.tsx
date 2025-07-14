"use client";

import Link from "next/link";
import React from "react";

const GoBack = () => {
  return (
    <section className="w-full flex items-center justify-center gap-8">
      <Link
        href="/works"
        className="
            text-[46px] md:text-[96px] lg:text-[184px] 
            font-semibold leading-none tracking-[-0.09em]
            text-center
        "
      >
        OTHER WORKS
      </Link>
      <span className="text-[46px] md:text-[96px] lg:text-[184px] font-semibold leading-none tracking-[-0.09em] lg:mb-[30px] md:mb-[20px] mb-[10px]">
        →
      </span>
    </section>
  );
};

export default GoBack;
