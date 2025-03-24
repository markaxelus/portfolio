"use client";
import React from 'react';
import Image from 'next/image';
import { projectList } from '../data/projectList';
import { BlurFade } from './magicui/blur-fade';

const Projects = () => {
  return (
      <div id="projects" className="px-6 py-16 bg-white">
        <div className='max-w-6xl w-full mx-auto  '>
          <h2 className="text-[2.5em] font-bold mb-8">
            My Works <span className='text-xl'>｡𖦹°‧</span>
          </h2>
        </div>
          <BlurFade 
            delay={0.01}
            inView
          >
            <div className="grid grid-cols-12 grid-flow-row-dense auto-rows-[200px] gap-4 max-w-6xl mx-auto">
              {projectList.map((project, index) => {

                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden shadow-md group`}
                    style={{ gridColumn: `span ${project.colSpan} ` }}
                  >
                    {/* Background Image */}
                    <Image
                      src={project.img}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />

                    {/* Frosted Glass Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center
                                    bg-white/80 backdrop-blur-md opacity-0 group-hover:opacity-100
                                    transition-opacity duration-500">
                      <h3 className="text-xl font-bold text-black">{project.name}</h3>
                      <p className="text-sm text-black">{project.tag}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </BlurFade>
      </div>
  );
};

export default Projects;
