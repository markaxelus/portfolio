import React from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import styles from "./styles/Hero.module.css";
import { SpinningText } from "@/components/magicui/spinning-text";


const Hero = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between px-24 py-28 bg-gray-100">
      {/* Container to match the centered content */}
      <div className="max-w-6xl w-full mx-auto flex flex-col justify-between h-full">
        {/* Top Section - Name and Blobs */}
        <div className="flex justify-between">
          <div>
            <h1 className={`${styles.h1} text-[7.5em] font-medium leading-[1.1] [text-shadow:rgba(255,0,180,0.2)_-11.06px_3.75333px]`}>
              <span className={styles.slideLeft}>𝓜𝓪𝓻𝓴</span><br/>
              <span className={styles.slideRight}>𝓐𝔁𝓮𝓵𝓾𝓼</span>
            </h1>
            
            {/* <div className={`${styles.blobCont}`} >
              <div className={`${styles.blob} ${styles.yellow}`}></div>
              <div className={`${styles.blob} ${styles.red}`}></div>
              <div className={`${styles.blob} ${styles.green}`}></div>
            </div>  */}

          </div>
          <div className="relative flex justify-center items-center">
            {/* Image Container */}
            <div className="rounded-full w-[450px] h-[450px] overflow-hidden flex-shrink-0 shadow-lg">
              <Image 
                src="/profile.jpg" 
                alt="profile-photo" 
                width={450}
                height={450} 
                className="object-cover w-full h-full"
              />
            </div>

            {/* Spinning Text Container */}
            <div className="absolute flex justify-center items-center w-[600px] h-[600px]">
              <SpinningText 
                className="rounded-full flex items-center justify-center"
                duration={20}
                radius={24} 
              >
                explore • learn • create • collaborate • debug • improve • repeat •

              </SpinningText>
            </div>
          </div>
        </div>

        {/* Bottom Section - Role & Navigation */}
        <div className="flex justify-between items-end w-full ">
          {/* Left Side: Role & Location */}
          <div className={`${styles.slideUp} flex flex-col gap-2`}>
            <span className="text-5xl font-bold">Full Stack Developer</span>
            <p className="text-sm text-gray-600">
              Discover → Design → Build → Test → Deploy → Promote
            </p>
            <p className="text-sm text-gray-400">Victoria, British Columbia</p>
          </div>
          {/* Right Side: Navigation */}
          <div className="h-full flex text-xl">
            <Navbar />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;