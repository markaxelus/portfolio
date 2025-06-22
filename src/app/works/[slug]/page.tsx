import React from 'react'
import { Project, projects } from "@/data/projects"
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'; 

interface ProjectDetailProps{
    params : Promise<{ slug: string }>
}

const page =  async ({ params }: ProjectDetailProps) => {
  const { slug } = await params;
  const findProject = projects.find((project: Project) => project.slug === slug)
  if (!findProject) return notFound();

  return (
    <main className="pt-[200px] 
          max-w-[1600px] w-full mx-auto
          md:px-[100px] lg:px-0
          flex ">

      {/* Top Container */}
      <div className="">
        <h1 className="">
          {findProject.title}
        </h1>
      </div>

      {/* Project Details */}


      {/*  */}

    </main>
    
  )
  
}

export default page