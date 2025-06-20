import React from "react";
import EmailCopy from "@/utils/EmailCopy";
import Social from "@/components/Social";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import StaggerText from "@/utils/Animation/StaggerText";
import ScrollReveal from "@/utils/Animation/ScrollReveal";
import BubbleReveal from "@/utils/Animation/BubbleReveal";

const index = () => {
  return (
    <main className="relative w-full md:min-h-screen bg-white">
      <div
        className="
          max-w-[1600px] w-full mx-auto
          md:h-[90vh]
          pt-[80px] pb-[40px] md:pb-0
          px-[20px] md:px-[30px] lg:px-0
          flex flex-col md:justify-between 
          gap-12 md:gap-6
          
      "
      >
        {/* Top Row */}
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-6">
          {/* Name Block */}
          <div className="flex flex-col ">
            <StaggerText
              text="MARK"
              className="text-[76px] md:text-[116px] lg:text-[174px] font-semibold leading-none tracking-[-0.09em]"
              distance={100}
              delay={0}
              letterDelay={0.07}
            />
            <StaggerText
              text="AXELUS"
              className="text-[76px] md:text-[116px] lg:text-[174px] font-semibold leading-none tracking-[-0.09em]"
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
              lg:w-[200px] lg:h-[200px]"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <ScrollReveal direction="up">
          <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-12">
            <div className="flex flex-col gap-2 items-center">
              <EmailCopy email="mrkaxelus@gmail.com" />

              <div className="flex flex-row gap-4 justify-center md:justify-start md:pl-4 w-full">
                <Social name="Github" href="https://github.com/markaxelus" icon={FaGithub} />
                <Social name="LinkedIn" href="https://www.linkedin.com/in/markaxelus/" icon={FaLinkedin} />
                <Social name="Twitter" href="" icon={FaTwitter} />
              </div>
            </div>

            <p className="tracking-[-0.09em] md:indent-[4rem] text-xl md:text-[40px] max-w-[643px] font-medium text-center md:text-start">
              Exploring ideas through design and code — curious, always learning,
              and love to build things. Let's{" "}
              <span className="italic font-semibold">connect!</span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default index;
