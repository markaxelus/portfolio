import React from "react";
import { Project, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectHeading from "@/components/Project/ProjectHeading";
import ProjectSection from "@/components/Project/ProjectSection";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: ProjectDetailProps) => {
  const { slug } = await params;
  const findProject = projects.find(
    (project: Project) => project.slug === slug
  );
  if (!findProject) return notFound();

  const projLink = findProject.link;
  const { content } = findProject;

  return (
    <main className="pt-[52px] w-full max-w-[1700px] mx-auto min-h-screen px-4 md:px-[30px] flex flex-col">
      <ProjectHeading project={findProject} />

      <section className="flex flex-col ">
        <ProjectSection
          title="overview."
          projectLink={projLink}
          content={content.overview.text}
          images={content.overview.images}
        />
        <ProjectSection
          title="process."
          content={content.process.text}
          images={content.process.images}
        />
        <ProjectSection
          title="result."
          content={content.result.text}
          images={content.result.images}
        />
        <ProjectSection
          title="reflection."
          content={content.reflection.text}
          images={content.reflection.images}
        />
      </section>
    </main>
  );
};

export default Page;
