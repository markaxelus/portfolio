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
    overview: {
      text: string;
      images?: import("@/components/Project/ProjectSection").SectionImages;
    };
    process: {
      text: string;
      images?: import("@/components/Project/ProjectSection").SectionImages;
    };
    result: {
      text: string;
      images?: import("@/components/Project/ProjectSection").SectionImages;
    };
    reflection: {
      text: string;
      images?: import("@/components/Project/ProjectSection").SectionImages;
    };
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
      overview: {
        text: `
        UVEEC is the official website for the UVic Environmental Engineering Club, built to showcase 
        ongoing projects, team members, and upcoming events. The site previously featured outdated 
        content and inactive components, so my goal was to refresh it with current information 
        and fix lingering bugs to improve user experience and maintainability for future club members.
      `,
      },
      process: {
        text: `
        One of the key challenges was working within an unfamiliar codebase that had minimal documentation. 
        Understanding the existing structure and identifying where certain bugs originated — like the broken 
        marquee animation, required carefully tracing component hierarchies and reviewing how state and styles 
        were being managed. Additionally, updating the Teams page involved figuring out legacy layout logic 
        before replacing it with a more modular and maintainable structure that supported dynamic content.
      `,
      },
      result: {
        text: `
        Resolved key UI bugs, including the marquee glitch and responsive layout issues on the Teams page. 
        The revamped Teams section now loads dynamically and adjusts seamlessly across screen sizes, 
        improving both usability and site performance. The site now has a more modern and consistent look, 
        making it easier for club members to update and maintain.
      `,
      },
      reflection: {
        text: `
        This project helped strengthen my ability to navigate and contribute to unfamiliar codebases efficiently. 
        It also deepened my debugging skills, especially with UI behaviors involving animation and responsive design. 
        I learned the importance of writing maintainable code and leaving clear structure for future developers, 
        something I valued after experiencing the opposite while onboarding to this project.
      `,
      },
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
      overview: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      process: {
        text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      result: {
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      },
      reflection: {
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      },
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
      overview: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      process: {
        text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      result: {
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      },
      reflection: {
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      },
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
      overview: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      process: {
        text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      result: {
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      },
      reflection: {
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      },
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
      overview: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      process: {
        text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      result: {
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      },
      reflection: {
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      },
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
      overview: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      },
      process: {
        text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      result: {
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      },
      reflection: {
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
      },
    },
  },
];
