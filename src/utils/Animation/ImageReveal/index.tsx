"use client";
import React, { useState, useEffect } from "react";
import NextImage from "next/image";
import ScrollReveal from "../ScrollReveal";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "up" | "down";
  distance?: number;
  duration?: number;
  delay?: number;
  placeholderClassName?: string;
}

export default function ImageReveal({
  src,
  alt,
  className = "",
  direction = "up",
  distance = 200,
  duration = 0.6,
  delay = 0,
  placeholderClassName = "bg-gray-200 animate-pulse",
}: ImageRevealProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImageLoaded(true);
    };

    img.onerror = () => {
      setImageError(true);
    };

    img.src = src;
  }, [src]);

  // Show placeholder while loading
  if (!imageLoaded && !imageError) {
    return (
      <div className={`${className} ${placeholderClassName}`}>
        <div className="w-full h-full" />
      </div>
    );
  }

  // Show error state if image failed to load
  if (imageError) {
    return (
      <div
        className={`${className} bg-gray-100 flex items-center justify-center`}
      >
        <span className="text-gray-400 text-sm">Image failed to load</span>
      </div>
    );
  }

  // Show image with ScrollReveal animation once loaded
  return (
    <ScrollReveal
      direction={direction}
      distance={distance}
      duration={duration}
      delay={delay}
      className="w-full h-full"
    >
      <div className="relative w-full h-full">
        <NextImage
          src={src}
          alt={alt}
          className={className}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </ScrollReveal>
  );
}
