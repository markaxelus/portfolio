import React from "react";
import { Project, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectHeading from "@/components/Project/ProjectHeading";
import ProjectSection from "@/components/Project/ProjectSection";
import GoBack from "@/components/Buttons/GoBack";
import Footer from "@/components/Footer";

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
    <>
      <main className="relative z-10 bg-white dark:bg-black pt-[52px] w-full min-h-screen">
        <div className="max-w-[1700px] mx-auto px-4 md:px-[30px] flex flex-col">
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
              title="challenge."
              content={content.challenge.text}
              images={content.challenge.images}
            />
            <ProjectSection
              title="reflection."
              content={content.reflection.text}
              images={content.reflection.images}
            />
          </section>
          
          <GoBack />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Page;
