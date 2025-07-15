"use client"
import React, { useRef, useState, useEffect } from 'react'

type CursorState = {
  x: number;
  y: number;
  isClickable: boolean;
  isVisible: boolean;
  isHovering: boolean;
}

const index = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: true,
    isClickable: false,
    isHovering: false,
  })

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setCursor((prev) => ({
          ...prev,
          x: e.clientX,
          y: e.clientY,
        }))
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = Boolean(
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer")
      );
      /* console.log("Hovered Element:", target);
      console.log("tagName:", target.tagName);
      console.log("isClickable:", isClickable); */

      setCursor((prev) => ({
        ...prev,
        isHovering: true,
        isClickable,
      }))
    }

    const handleMouseOut = () => {
      setCursor((prev) => ({
        ...prev,
        isHovering: false,
        isClickable: false,
      }))
    }

    const handleWindowLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setCursor ((prev) => ({
          ...prev,
          isVisible: false
        }))
      }
    }

    const handleWindowEnter = (e: MouseEvent) => {
      setCursor ((prev) => ({
        ...prev,
        isVisible: true
      }))
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener('mouseout', handleWindowLeave)
    document.addEventListener('mouseenter', handleWindowEnter)

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.addEventListener('mouseenter', handleWindowEnter)

    }
    
  },[])
  
  const isCursorVisible = cursor.isVisible;

  return (
    <>
      <div
        className='fixed pointer-events-none z-[9999] w-8 h-8 rounded-full'
        style={{
          left: `${cursor.x}px`,
          top: `${cursor.y}px`,
          backgroundColor: "#ffffff",
          transform: `translate(-50%,-50%) scale(${
            cursor.isClickable && isCursorVisible ? 1.5 : 1
          })`,
          opacity: isCursorVisible ? 1 : 0,
          mixBlendMode: "difference",
          transition: 
            "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-out",
          willChange: "transform, opacity"
        }}
      />

      
    </>
  )
}

export default index