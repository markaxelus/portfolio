export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  projectType: string;
  imageUrl?: string;
  date: number;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "relay",
    title: "Relay",
    category: "Full-Stack / Product Design",
    projectType: "Personal Project",
    imageUrl: "/relay.jpg",
    date: 2025,
    description: "",
    stack: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
  },
  {
    id: 2,
    slug: "synapse",
    title: "Synapse",
    category: "Full-Stack / Product Design",
    projectType: "Hackathon",
    imageUrl: "",
    date: 2025,
    description: "",
    stack: ["TypeScript", "Node.js", "Express", "AWS", "LangChain", "Mermaid.js", "Lambda", "Serverless"],
  },
  {
    id: 3,
    slug: "portfolio",
    title: "Portfolio",
    category: "UI/UX Design",
    projectType: "Hackathon",
    imageUrl: "",
    date: 2025,
    description: "",
    stack: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
  },
  {
    id: 4,
    slug: "basicauth",
    title: "BasicAuth",
    category: "Full-Stack",
    projectType: "Personal Project",
    imageUrl: "/basicauth",
    date: 2024,
    description: "",
    stack: ["React", "Express", "MongoDB", "JWT"],
  },
  {
    id: 5,
    slug: "ecoeats",
    title: "EcoEats",
    category: "Front-End / Product Design",
    projectType: "Hackathon",
    imageUrl: "/ecoeats.jpg",
    date: 2024,
    description: "",
    stack: ["HTML", "CSS", "Javascript"],
  },
];
