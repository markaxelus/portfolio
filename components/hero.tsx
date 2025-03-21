import React from "react";
import Navbar from "@/components/navbar";
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between px-24 py-16">
      {/* Container to match the centered content */}
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-between h-full">

        {/* Top Section - Name */}
        <div className="flex justify-between">
          <h1 className="text-[8em] font-medium leading-[1.1] [text-shadow:rgba(255,0,180,0.2)_-11.06px_3.75333px]">
            Mark <br /> Axelus
          </h1>
          <div className="rounded-full w-[400px] h-[400px] overflow-hidden border-4 border-gray-200">
            <Image 
              src='/image.png' 
              alt="profile-photo" 
              width={400} 
              height={400} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Section - Role & Navigation */}
        <div className="flex justify-between items-end w-full">
          {/* Left Side: Role & Location */}
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-bold">Full Stack Developer</span>
            <p className="text-sm text-gray-600">
              Discover → Design → Build → Test → Deploy → Promote
            </p>
            <p className="text-sm text-gray-400">Victoria, British Columbia</p>
          </div>

          {/* Right Side: Navigation */}
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Hero;

