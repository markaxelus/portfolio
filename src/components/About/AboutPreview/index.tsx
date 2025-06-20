"use client";
import React from "react";
import { usePathname } from "next/navigation";
import ShowMore from "@/components/Buttons/ShowMore";
import ScrollReveal from "@/utils/Animation/ScrollReveal";

const index = () => {
  const pathname = usePathname();
  const onAboutPage = pathname === "/about";

  return (
    <section className="flex flex-col justify-start max-w-[1600px] w-full mx-auto px-[20px] md:px-[30px] gap-20 pt-[20px] pb-[100px]">
      {/* Main Heading */}
      <div className="">
        <ScrollReveal direction="up">
          <div className="flex justify-between items-center ">
            <h1 className="text-[24px] md:text-[48px] tracking-[-0.03em] font-medium">
              about.
            </h1>
            {!onAboutPage && <ShowMore href="/about" />}
          </div>
        </ScrollReveal>
      </div>

      {/* About Section */}

      <div className="flex flex-col gap-10 md:gap-20">
        {/* Info */}
        <ScrollReveal direction="up">
          <div className="md:max-w-[60%]">
            <p className="text-[28px] md:text-[40px] lg:text-[50px] font-medium tracking-[-0.06em] leading-tight">
              I enjoy solving real-world problems through code and collaborating
              with people to build thoughtful, user-focused solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Image */}
        <ScrollReveal direction="up">
          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-18">
            <div className="flex-shrink-0">
              <img
                src="/image.png"
                alt="profile"
                className="w-[553px] max-h-[450px] md:max-h-[553px] object-cover"
              />
            </div>
            <p className="text-[16px] md:text-[20px] tracking-[-0.04em] text-center md:text-left max-w-sm font-medium leading-tight">
              I focus on creating clean, accessible, and maintainable designs
              through thoughtful planning and iteration. I value clarity and
              purpose in both code and visuals, and continuously learn through
              hands-on work.{" "}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default index;
