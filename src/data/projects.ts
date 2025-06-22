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
  link?: string;
  metadata: {
    field: string;
    project: string;
    year: string;
    focus: string;
    tools: string;
  };
  content: {
    overview: string;
    challenges: string;
    result: string;
    reflection: string;
  };
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
    metadata: {
      field: "Front-End",
      project: "Website",
      year: "2024",
      focus: "Front-End Development",
      tools: "Next.js, TypeScript, TailwindCSS",
    },
    content: {
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      challenges:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      result:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      reflection:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
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
    metadata: {
      field: "Full-Stack / Product Design",
      project: "Relay",
      year: "Ongoing",
      focus: "Full-Stack Development & Product Design",
      tools: "Next.js, PostgreSQL, Prisma, TailwindCSS",
    },
    content: {
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      challenges:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      result:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      reflection:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
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
    metadata: {
      field: "Full-Stack / Product Design",
      project: "Synapse",
      year: "2024",
      focus: "AI & Full-Stack Development",
      tools:
        "TypeScript, Node.js, Express, AWS, LangChain, Mermaid.js, Lambda, Serverless",
    },
    content: {
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      challenges:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      result:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      reflection:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
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
    metadata: {
      field: "UI/UX Design",
      project: "Portfolio",
      year: "2025",
      focus: "UI/UX & Front-End Development",
      tools: "Next.js, TypeScript, Framer Motion, TailwindCSS",
    },
    content: {
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      challenges:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      result:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      reflection:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
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
    metadata: {
      field: "Full-Stack",
      project: "BasicAuth",
      year: "2024",
      focus: "Back-End & Authentication",
      tools: "React, Express, MongoDB, JWT",
    },
    content: {
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      challenges:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      result:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      reflection:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
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
    metadata: {
      field: "Front-End / Product Design",
      project: "EcoEats",
      year: "2024",
      focus: "Front-End Development & Product Design",
      tools: "HTML, CSS, Javascript",
    },
    content: {
      overview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      challenges:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      result:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      reflection:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    },
  },
];
