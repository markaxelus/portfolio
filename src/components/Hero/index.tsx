import React from "react";
import EmailCopy from "@/utils/EmailCopy";
import Social from "@/components/Social";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import StaggerText from "@/utils/Animation/StaggerText";
import ScrollReveal from "@/utils/Animation/ScrollReveal";
import BubbleReveal from "@/utils/Animation/BubbleReveal";
import Resume from "@/components/Buttons/Resume";

const HeroSection = () => {
  return (
    <main className="relative w-full md:min-h-screen bg-white dark:bg-black">
      <div
        className="
          max-w-[2200px] w-full mx-auto
          md:h-[90vh]
          pt-[80px] pb-[40px] md:pb-0
          px-[20px] md:px-[80px] 
          flex flex-col 
          gap-12 md:gap-24
          xl:justify-between
      "
      >
        {/* Top Row */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
          {/* Name Block */}
          <div className="flex flex-col ">
            <StaggerText
              text="MARK"
              className="text-[76px] md:text-[116px] lg:text-[200px] font-semibold leading-none tracking-[-0.09em]"
              distance={100}
              delay={0}
              letterDelay={0.07}
            />
            <StaggerText
              text="AXELUS"
              className="text-[76px] md:text-[116px] lg:text-[200px] font-semibold leading-none tracking-[-0.09em]"
              distance={100}
              delay={0.2}
              letterDelay={0.07}
            />
          </div>

          {/* Profile Image */}
          <div className="shrink-0 md:h-full pl-2">
            <BubbleReveal
              src="/profile.png"
              alt="Profile"
              className="rounded-full w-[150px] h-[150px] 
              object-cover object-[30%] 
              lg:w-[300px] lg:h-[300px]"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <ScrollReveal direction="up">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-12">
            <div className="flex flex-col gap-2 items-center">
              <EmailCopy email="mrkaxelus@gmail.com" />
              
              {/* Resume */}
              <div className="flex flex-row justify-center md:justify-start  w-full">
                <Resume href="/resume.pdf" 
                  className="bg-[rgb(245,245,245)] dark:bg-neutral-800 dark:text-white
                    w-full h-[51px]
                    tracking-[-0.04em]
                    text-[18px]  
                    flex items-center justify-center
                    font-[500] gap-2" />
              </div>

              <div className="flex flex-row gap-4 justify-center md:justify-start  pt-3 w-full">
                <Social name="Github" href="https://github.com/markaxelus" icon={FaGithub} />
                <Social name="LinkedIn" href="https://www.linkedin.com/in/markaxelus/" icon={FaLinkedin} />
                <Social name="Twitter" href="" icon={FaTwitter} />
              </div>
            </div>

            <p className="tracking-[-0.09em] md:indent-[4rem] text-xl md:text-[40px] max-w-[643px] font-medium text-center md:text-start">
              Exploring ideas through design and code — curious, always learning,
              and love to build things. Let&apos;s{" "}
              <span className="italic font-bold tracking-[-0.04em]">connect!</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default HeroSection;
