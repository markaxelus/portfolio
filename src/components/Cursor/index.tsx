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

    document.addEventListener("mousemove", moveCursor)

    
    
    
  },[])
  
  const isCursorVisible = cursor.isVisible;

  return (
    <>
      <div
        className='fixed pointer-events-none z-[9999] w-8 h-8 rounded-full'
        style={{
          left: `${cursor.x}px`,
          top: `${cursor.y}px`,
          backgroundColor: "#000000",
          transform: `translate(-50%,-50%)`,
          opacity: isCursorVisible ? 1 : 0,
        }}
      />

      
    </>
  )
}

export default index