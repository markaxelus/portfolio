import React from "react";
import EmailCopy from "@/utils/EmailCopy";

const index = () => {
  return (
    <main className="relative w-full h-screen ">
      <div
        className="
          max-w-[1600px] w-full mx-auto
          h-[100vh]
          pt-[140px] pb-[80px] 
          px-[20px] md:px-[30px] lg:px-0
          flex flex-col md:justify-between 
          gap-24 md:gap-6
          
      "
      >
        {/* Top Row */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-6">
          {/* Name Block */}

          <h1
            className="w-full text-[76px] md:text-[116px] lg:text-[174px] 
                        font-semibold leading-none tracking-[-0.09em]"
          >
            MARK <br /> AXELUS
          </h1>

          {/* Profile Image */}
          <div className="shrink-0 md:h-full pl-2">
            <img
              src="/profile.png"
              alt="Profile"
              className="rounded-full w-[150px] h-[150px] 
              object-cover object-[30%] 
              lg:w-[200px] lg:h-[200px]"
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-12">
          <EmailCopy email="mrkaxelus@gmail.com" />

          <p className="tracking-[-0.09em] indent-[4rem] text-xl md:text-[40px] max-w-[643px] font-medium">
            Exploring ideas through design and code — curious, always learning,
            and love to build things. Let's{" "}
            <span className="italic font-semibold">connect!</span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default index;
