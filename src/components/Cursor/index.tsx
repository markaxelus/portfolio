"use client"
import React, { useState, useEffect } from 'react'

type CursorState = {
  x: number;
  y: number;
  isClickable: boolean;
  isVisible: boolean;
  isHovering: boolean;
  isCopyButton: boolean;
  copyFeedback: boolean;
}

const Cursor = () => {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isVisible: true,
    isClickable: false,
    isHovering: false,
    isCopyButton: false,
    copyFeedback: false,
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
      const isCopyButton = target.closest('[data-cursor="copy"]') !== null;
      /* console.log("Hovered Element:", target);
      console.log("tagName:", target.tagName);
      console.log("isClickable:", isClickable); */

      setCursor((prev) => ({
        ...prev,
        isHovering: true,
        isClickable,
        isCopyButton,
      }))
    }

    const handleMouseOut = () => {
      setCursor((prev) => ({
        ...prev,
        isHovering: false,
        isClickable: false,
        isCopyButton: false,
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

    const handleWindowEnter = () => {
      setCursor ((prev) => ({
        ...prev,
        isVisible: true
      }))
    }

    const handleCopied = () => {
      setCursor((prev) => ({ ...prev, copyFeedback: true }));
      setTimeout(() => {
        setCursor((prev) => ({ ...prev, copyFeedback: false }));
      }, 1000);
    }

    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener('mouseout', handleWindowLeave);
    document.addEventListener('mouseenter', handleWindowEnter);
    window.addEventListener('cursor:copied', handleCopied);
    document.body.style.cursor = "none";
    
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener('mouseout', handleWindowLeave);
      document.removeEventListener('mouseenter', handleWindowEnter);
      window.removeEventListener('cursor:copied', handleCopied);
      document.body.style.cursor = "auto";
    }
    
  },[])
  
  const isCursorVisible = !cursor.isCopyButton && cursor.isVisible;
  const showCopyBubble = (cursor.isCopyButton || cursor.copyFeedback) && cursor.isVisible;

  return (
    <>
      <div
        className='fixed pointer-events-none z-[9999] w-8 h-8 rounded-full'
        style={{
          left: `${cursor.x}px`,
          top: `${cursor.y}px`,
          backgroundColor: "#ffffff",
          transform: `translate(-50%,-50%) scale(${
            cursor.isClickable && isCursorVisible ? 2.5 : 1
          })`,
          opacity: isCursorVisible ? 1 : 0,
          mixBlendMode: "difference",
          transition: 
            "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-out",
          willChange: "transform, opacity"
        }}
      />

      {/* Copy Button */}
      <div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center px-10 py-5 rounded-full font-semibold text-lg will-change-transform"
        style={{
          left: `${cursor.x}px`,
          top: `${cursor.y}px`,
          transform: `translate(-50%,-50%) scale(${showCopyBubble ? 1 : 0})`,
          opacity: showCopyBubble ? 1 : 0,
          width: '140px',
          transition: 
          "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s ease-out, min-width 0.25s ease-out, padding 0.25s ease-out",
          willChange: "transform, opacity",
          backgroundColor: "#000000",
          color: "#ffffff",
        }}
      >
        {cursor.copyFeedback ? "Copied!" : "Copy"}
      </div>
      
    </>
  )
}

export default Cursor