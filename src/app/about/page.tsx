import React from "react";
import AboutFull from "@/components/About/AboutFull";
import StaggerText from "@/utils/Animation/SlideUp";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <>
      <main className="relative z-10 bg-white">
        <div className="w-full flex flex-col items-start justify-start gap-6 px-[20px] md:px-[100px] h-auto pt-[100px]">
          {/* Name Block */}
          <div className="flex flex-col items-center w-full">
            <StaggerText
              text="MARK"
              className="text-[76px] md:text-[116px] italic lg:text-[250px] font-semibold leading-none tracking-[-0.09em]"
              distance={100}
              delay={0}
              letterDelay={0.07}
            />
            <StaggerText
              text="AXELUS"
              className="text-[76px] md:text-[116px] italic lg:text-[250px] font-semibold leading-none tracking-[-0.09em]"
              distance={100}
              delay={0.2}
              letterDelay={0.07}
            />
          </div>

          {/* About Section */}
          <div className="w-full bg-red-200">
            <AboutFull />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default page;
