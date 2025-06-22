export type Project = {
  id: number;
  slug: string;
  title: string;
  club?: string;
  category: string;
  imageUrl: string;
  dateAndType: string;
  description: string;
  stack: string[];
  link?: string
  metadata: [
    field: string,
    project: string,
    year: string,
    focus: string,
    tools: string,
  ];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "uveec",
    title: "Uveec",
    club: "UVic Environmental Engineering Club",
    category: "Front-End",
    imageUrl: "/uveec.png",
    dateAndType: "2024 — Club",
    description: "",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    link: "https://uveec.ca",
    metadata: [
      "Front-End",
      "Website",
      "2024",
      "Front-End Development",
      "Next.js, TypeScript, TailwindCSS",
    ],
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
    metadata: [
      "Full-Stack / Product Design",
      "Relay",
      "Ongoing",
      "Full-Stack Development & Product Design",
      "Next.js, PostgreSQL, Prisma, TailwindCSS",
    ],
  },
  {
    id: 4,
    slug: "synapse",
    title: "Synapse",
    category: "Full-Stack / Product Design",
    imageUrl: "/synapse.jpg",
    dateAndType: "2024 — Hackathon",
    description: "",
    stack: [
      "TypeScript",
      "Node.js",
      "Express",
      "AWS",
      "LangChain",
      "Mermaid.js",
      "Lambda",
      "Serverless",
    ],
    metadata: [
      "Full-Stack / Product Design",
      "Synapse",
      "2024",
      "AI & Full-Stack Development",
      "TypeScript, Node.js, Express, AWS, LangChain, Mermaid.js, Lambda, Serverless",
    ],
  },
  {
    id: 3,
    slug: "portfolio",
    title: "Portfolio",
    category: "UI/UX Design",
    imageUrl: "/synapse.jpg",
    dateAndType: "2025 — Personal",
    description: "",
    stack: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
    metadata: [
      "UI/UX Design",
      "Portfolio",
      "2025",
      "UI/UX & Front-End Development",
      "Next.js, TypeScript, Framer Motion, TailwindCSS",
    ],
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
    metadata: [
      "Full-Stack",
      "BasicAuth",
      "2024",
      "Back-End & Authentication",
      "React, Express, MongoDB, JWT",
    ],
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
    metadata: [
      "Front-End / Product Design",
      "EcoEats",
      "2024",
      "Front-End Development & Product Design",
      "HTML, CSS, Javascript",
    ],
  },
];
