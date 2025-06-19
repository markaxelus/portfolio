export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  dateAndType: string;
  description: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "uveec",
    title: "Uveec",
    category: "Front-End",
    imageUrl: "/uveec.png",
    dateAndType: "Uvic Environmental Engineering Club",
    description: "",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
  },
  {
    id: 2,
    slug: "relay",
    title: "Relay",
    category: "Full-Stack / Product Design",
    imageUrl: "/relay.jpg",
    dateAndType: "Ongoing — Personal",
    description: "",
    stack: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
  },
  {
    id: 3,
    slug: "synapse",
    title: "Synapse",
    category: "Full-Stack / Product Design",
    imageUrl: "/synapse.jpg",
    dateAndType: "2024 — Hackathon",
    description: "",
    stack: ["TypeScript", "Node.js", "Express", "AWS", "LangChain", "Mermaid.js", "Lambda", "Serverless"],
  },
  {
    id: 4,
    slug: "portfolio",
    title: "Portfolio",
    category: "UI/UX Design",
    imageUrl: "/synapse.jpg",
    dateAndType: "2025 — Personal",
    description: "",
    stack: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
  },
  {
    id: 5,
    slug: "basicauth",
    title: "BasicAuth",
    category: "Full-Stack",
    imageUrl: "/basicauth.jpg",
    dateAndType: "2024 — Personal",
    description: "",
    stack: ["React", "Express", "MongoDB", "JWT"],
  },
  {
    id: 6,
    slug: "ecoeats",
    title: "EcoEats",
    category: "Front-End / Product Design",
    imageUrl: "/ecoeats.jpg",
    dateAndType: "2024 — Personal",
    description: "",
    stack: ["HTML", "CSS", "Javascript"],
  },
];
