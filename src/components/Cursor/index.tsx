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

    
    


  })
  
  return (
    <div>

    </div>
  )
}

export default index