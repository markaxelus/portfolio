"use client";
import React from "react";
import { usePathname } from "next/navigation";
import ShowMore from "@/components/Buttons/ShowMore";
import ScrollReveal from "@/utils/Animation/ScrollReveal";
import Resume from "@/components/Buttons/Resume";

const AboutSection = () => {
  const pathname = usePathname();
  const onAboutPage = pathname === "/about";

  return (
    <section className="flex flex-col w-full gap-20 pt-[70px] pb-[100px] bg-white">
      <div className="px-[20px] md:px-[30px] lg:px-[80px] flex flex-col gap-20">
        {/* Heading */}
        <ScrollReveal direction="up">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-[24px] md:text-[48px] tracking-[-0.03em] font-medium">
              about.
            </h1>
            <div className="flex items-center gap-4 w-[150px]">
              {!onAboutPage && <ShowMore href="/about" />}
              <Resume href="/resume.pdf" 
                  className="bg-[rgb(245,245,245)]
                    w-[150px] h-[51px]
                    tracking-[-0.04em]
                    flex items-center justify-center
                    font-[500] gap-2" />
            </div>
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal direction="up">
          <div className="xl:max-w-[55%] max-w-none">
            <p className="text-[28px] md:text-[40px] lg:text-[50px] indent-[2em] font-medium tracking-[-0.06em] leading-tight">
              I enjoy solving real-world problems through code and collaborating
              with people to build thoughtful, user-focused solutions.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Image & Text */}
      <ScrollReveal direction="up">
        <div className="flex flex-col md:flex-row items-stretch h-[100vh]">
          {/* Image */}
          <div className="w-full md:w-2/3 h-full overflow-hidden">
            <img
              src="/image.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/3 flex items-center justify-center p-8 md:p-12">
            <p className="text-[28px] md:text-[40px] lg:text-[50px] font-medium tracking-[-0.06em] leading-tight">
              placeholder
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};

export default AboutSection;
