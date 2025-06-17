import React from 'react'
import { Project, projects } from "@/data/projects"
import { notFound } from 'next/navigation'

type ProjectDetailProps = {
    params : { slug: string }
}

const page = async ({ params }: ProjectDetailProps) => {
  const findProject = projects.find((project: Project) => project.slug === params.slug)
  if (!findProject) return notFound

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

    </main>
    
  )
  
}

export default page