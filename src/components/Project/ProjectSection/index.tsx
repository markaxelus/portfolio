import React from "react";
import Link from "next/link";
import Image from "next/image";

/* Work Page Section Heading */
type SectionHeadingProps = {
  title: string;
  projectLink?: string;
};

const SectionHeading = ({ title, projectLink }: SectionHeadingProps) => {
  return (
    <section className="relative w-full ">
      {/* Section Heading */}
      <div className="flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-8 max-w-[70%]">
          <h2 className="text-[24px] md:text-[48px] font-[500] tracking-[-0.03em]">
            {title} 
          </h2>
        </div>

        {title === "overview." && projectLink && (
          <div className="flex items-center">
            <Link
              href={projectLink}
              target="_blank"
              className="bg-[rgb(245,245,245)] dark:bg-neutral-800 dark:text-white w-[203px] h-[71px] tracking-[-0.04em] flex items-center justify-center font-medium text-[20px]"
            >
              Take a Look!
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

/* Work Page Section Content */
type SectionContentProps = {
  content: string;
};

const SectionContent = ({ content }: SectionContentProps) => {
  return (
    <div className="py-[40px] flex justify-end">
      <div className="max-w-[60%]">
        <p className="text-[20px] md:text-[28px] font-[500] text-neutral-800 dark:text-white leading-[1.1] whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  );
};

type ImageLayout = "large-top" | "large-bottom" | "grid-4";

export type SectionImages = {
  layout: ImageLayout;
  large?: string; // URL for the large image
  small?: string[]; // Up to 4 small image URLs
};

interface ProjectSectionProps {
  title: string;
  content: string;
  projectLink?: string;
  images?: SectionImages;
}

const renderImages = (images: SectionImages) => {
  const { layout, large, small = [] } = images;

  if (layout === "grid-4") {
    // 2x2 grid of small images
    return (
      <div className="grid grid-cols-2 gap-4 w-full mt-8">
        {small.slice(0, 4).map((src, idx) => (
          <div key={idx} className="w-full h-full relative aspect-square">
            <Image
              src={src}
              alt={`grid-${idx}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  // Layouts with one large image + 2 small images
  const smallImgs = small.slice(0, 2);
  const largeImg = large ?? smallImgs[0];

  return (
    <div className="grid grid-cols-2 gap-4 w-full mt-8">
      {layout === "large-top" && (
        <div className="col-span-2 w-full relative aspect-[4/2]">
          <Image src={largeImg} alt="large" fill className="object-cover" />
        </div>
      )}

      {smallImgs.map((src, idx) => (
        <div key={idx} className="w-full relative aspect-square">
          <Image src={src} alt={`small-${idx}`} fill className="object-cover" />
        </div>
      ))}

      {layout === "large-bottom" && (
        <div className="col-span-2 w-full relative aspect-[4/2]">
          <Image src={largeImg} alt="large" fill className="object-cover" />
        </div>
      )}
    </div>
  );
};

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  content,
  projectLink,
  images,
}) => {
  return (
    <section className="relative w-full py-[40px] border-b border-[rgb(245,245,245)] dark:border-neutral-800">
      <SectionHeading title={title} projectLink={projectLink} />
      <SectionContent content={content} />
      {images && renderImages(images)}
    </section>
  );
};

export default ProjectSection;

export type { ImageLayout };
