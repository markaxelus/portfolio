"use client";
import React from "react";
import { usePathname } from "next/navigation";
import ShowMore from "@/components/Buttons/ShowMore";
import ScrollReveal from "@/utils/Animation/ScrollReveal";
import Image from "next/image";

const AboutPreviewSection = () => {
  const pathname = usePathname();
  const onAboutPage = pathname === "/about";

  const techStack = [
    {
      name: "Next.js",
      imgDark: "/stackIcons/next-dark.png",
      imgLight: "/stackIcons/next-light.png",
    },
    {
      name: "TypeScript",
      imgDark: "/stackIcons/ts-dark.png",
      imgLight: "/stackIcons/ts-light.png",
    },
    {
      name: "TailwindCSS",
      imgDark: "/stackIcons/tailwind-dark.png",
      imgLight: "/stackIcons/tailwind-light.png",
    },
    {
      name: "PostgreSQL",
      imgDark: "/stackIcons/postgres-dark.png",
      imgLight: "/stackIcons/postgres-light.png",
    },
    {
      name: "Node",
      imgDark: "/stackIcons/node-dark.png",
      imgLight: "/stackIcons/node-light.png",
    },
    {
      name: "Express",
      imgDark: "/stackIcons/express-dark.png",
      imgLight: "/stackIcons/express-light.png",
    },
    {
      name: "MongoDB",
      imgDark: "/stackIcons/mongo-dark.png",
      imgLight: "/stackIcons/mongo-light.png",
    },
    {
      name: "AWS",
      imgDark: "/stackIcons/aws-dark.png",
      imgLight: "/stackIcons/aws-light.png",
    },
    {
      name: "Python",
      imgDark: "/stackIcons/python-dark.png",
      imgLight: "/stackIcons/python-light.png",
    },
  ] as const;

  return (
    <section className="flex flex-col justify-start w-full max-w-[2200px] mx-auto px-[20px] md:px-[80px] gap-20 pt-[20px] pb-[100px] bg-white dark:bg-black">
      {/* Main Heading */}
      <div className="max-w-[2200px] w-full mx-auto">
        <ScrollReveal direction="up">
          <div className="flex justify-between items-center ">
            <h1 className="text-[24px] md:text-[48px] tracking-[-0.03em] font-medium">
              about.
            </h1>
            {!onAboutPage && <ShowMore href="/about" buttonLabel="Show More" />}
          </div>
        </ScrollReveal>
      </div>

      {/* About Section */}
      <div className="max-w-[2200px] w-full mx-auto flex flex-col gap-10 md:gap-20">
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
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-18">
          <ScrollReveal direction="up">
            <div className="flex-shrink-0">
              <Image
                src="/image.png"
                alt="profile"
                width={953}
                height={953}
                className="w-[953px] max-h-[350px] md:max-h-[953px] object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Tech Stack Grid */}
          <ScrollReveal direction="up">
            <div className="flex flex-col flex-1 gap-10 w-full">
              <div className="flex justify-between items-center w-full ">
                <h1 className="text-[24px] md:text-[44px] tracking-[-0.03em] font-medium">
                  tech.
                </h1>
              </div>

              <div className="grid grid-cols-3 gap-6 md:gap-10 ">
                {techStack.map(({ name, imgDark, imgLight }) => (
                  <div
                    key={name}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Dark theme (light icon) */}
                    <Image
                      src={imgLight}
                      alt={`${name} logo light`}
                      width={50}
                      height={50}
                      className="w-[40px] h-[40px] object-contain mb-2 hidden dark:block"
                    />
                    {/* Light theme (dark icon) */}
                    <Image
                      src={imgDark}
                      alt={`${name} logo dark`}
                      width={50}
                      height={50}
                      className="w-[40px] h-[40px] object-contain mb-2 block dark:hidden"
                    />
                    <p className="text-[16px] md:text-[20px] tracking-[-0.04em] font-medium leading-tight">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
