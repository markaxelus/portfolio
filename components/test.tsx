"use client";
import React from "react";

export default function Test() {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Test Grid</h1>
      <div className="grid grid-cols-12 auto-rows-[200px] gap-4">
        {/* Row 1 => 3 items, each col-span-4 => total 12 columns */}
        <div className="col-span-4 bg-red-300 flex items-center justify-center">1</div>
        <div className="col-span-4 bg-green-300 flex items-center justify-center">2</div>
        <div className="col-span-4 bg-blue-300 flex items-center justify-center">3</div>

        {/* Row 2 => 4 items, each col-span-3 => total 12 columns */}
        <div className="col-span-3 bg-yellow-300 flex items-center justify-center">4</div>
        <div className="col-span-3 bg-purple-300 flex items-center justify-center">5</div>
        <div className="col-span-3 bg-pink-300 flex items-center justify-center">6</div>
        <div className="col-span-3 bg-teal-300 flex items-center justify-center">7</div>
      </div>
    </div>
  );
}
