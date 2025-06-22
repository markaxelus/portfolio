import React from "react";
import { Project, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectHeading from "@/components/Project/ProjectHeading";
export const dynamic = "force-dynamic";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: ProjectDetailProps) => {
  const { slug } = await params;
  const findProject = projects.find(
    (project: Project) => project.slug === slug
  );
  if (!findProject) return notFound();

  return (
    <main className="pt-[52px] w-full max-w-[2300px] mx-auto min-h-screen px-4 md:px-[30px] flex flex-col">
      <ProjectHeading project={findProject} />

      <section className="mt-16 prose dark:prose-dark">
        
      </section>
    </main>
  );
};

export default Page;