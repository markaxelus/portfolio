import React from "react";
import { Project, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectHeading from "@/components/Project/ProjectHeading";
import ProjectSection from "@/components/Project/ProjectSection";

interface ProjectDetailProps {
  params: { slug: string };
}

const Page = async ({ params }: ProjectDetailProps) => {
  const { slug } = params;
  const findProject = projects.find(
    (project: Project) => project.slug === slug
  );
  if (!findProject) return notFound();
  
  const projLink = findProject.link;
  return (
    <main className="pt-[52px] w-full max-w-[1700px] mx-auto min-h-screen px-4 md:px-[30px] flex flex-col">
      <ProjectHeading project={findProject} />

      <section className="flex flex-col ">
        <ProjectSection title="overview." projectLink={projLink} />
        <ProjectSection title="challenges." />
        <ProjectSection title="result." />
        <ProjectSection title="reflection." />
      </section>
    </main>
  );
};

export default Page;
