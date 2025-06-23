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
          The official website for the UVic Environmental Engineering Club (UVEEC) was outdated, with broken components and old content. My role was to modernize the site by implementing critical bug fixes and updating the content.

          The primary goals were to enhance the user experience for visitors and improve the site's maintainability, ensuring that future club members could easily manage and update it.
        `,
        images: {
          layout: "large-top",
          large: "/uveec.png",
          small: ["/coding.jpg", "/terminal.jpg"],
        },
      },
      process: {
        text: `
          My process began with a deep dive into an unfamiliar codebase that lacked documentation. To diagnose issues like a broken marquee animation, I meticulously traced component hierarchies and state management logic.

          A significant part of the project involved refactoring the Teams page. I replaced its legacy layout with a modular, dynamic structure. This not only fixed existing responsive issues but also made it easier to add or remove members in the future.
        `,
        images: {
          layout: "large-bottom",
          large: "/launch.jpg",
          small: ["/prototype.jpg", "/relay.jpg"],
        },
      },
      result: {
        text: `
          The revitalized website now provides a seamless and bug-free user experience. Key UI issues, including the marquee glitch and layout inconsistencies, were resolved.

          The redesigned Teams page is now fully responsive and loads content dynamically, significantly improving usability and performance. The modern, consistent design makes the site easier to navigate and simpler for club members to maintain.
        `,
        images: {
          layout: "grid-4",
          small: [
            "/synapse.jpg",
            "/basicauth.jpg",
            "/ecoeats.jpg",
            "/emphatize.jpg",
          ],
        },
      },
      reflection: {
        text: `
          This project was a valuable experience in reverse-engineering and improving a legacy codebase. It sharpened my debugging skills, particularly in handling UI animations and responsive layouts.

          Most importantly, it reinforced the value of writing clean, maintainable code. Experiencing the challenges of an undocumented project firsthand solidified my commitment to creating clear and scalable solutions for future developers.
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
        text: `
          Relay is a full-stack project management tool I'm building to simplify team collaboration and task tracking. It's designed to be an intuitive, responsive platform for dynamic team environments.

          The application features secure user authentication, real-time data synchronization, and a scalable backend architecture, all built from the ground up with modern web technologies.
        `,
      },
      process: {
        text: `
          I started by wireframing the core user flows and designing the system architecture. For the frontend, I chose Next.js and TypeScript for their performance and type-safety, with Redux and RTK Query managing real-time state.

          The backend was built with Node.js and Express, using Prisma as the ORM to interact with a PostgreSQL database. A key challenge was implementing secure authentication with AWS Cognito and integrating it seamlessly with the backend services running on AWS EC2.
        `,
      },
      result: {
        text: `
          The application will feature a responsive dashboard, role-based access controls, and a modular API. Users will be able to assign tasks, monitor progress in real-time, and securely access their workspace from any device.

          The architecture, built on AWS and PostgreSQL, is designed for scalability and reliability, incorporating best practices for cloud security and deployment.
        `,
      },
      reflection: {
        text: `
          This ongoing project has been instrumental in my growth as a full-stack developer. It's taught me how to balance technical requirements with user-centric design, and how backend architecture directly impacts frontend performance.

          Working on Relay has given me a deeper understanding of the entire product lifecycle, from initial design and architecting solutions to cloud deployment and scaling.
        `,
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
        text: `
          This portfolio is a curated showcase of my work and technical skills, designed with a strong emphasis on interaction design and a smooth developer experience.

          Built as a performant single-page application, it serves as a dynamic introduction to my capabilities for recruiters, clients, and fellow developers.
        `,
      },
      process: {
        text: `
          I began the design process in Figma, iterating on the UI to ensure visual clarity and a strong user experience.

          To achieve fast load times and fluid animations, I built the site with Next.js, TypeScript, and TailwindCSS, using Framer Motion for animations. Key features include project filtering, lazy-loaded images to optimize performance, and a fully responsive design for a seamless experience on any device.
        `,
      },
      result: {
        text: `
          The result is an interactive and scroll-friendly website featuring smooth, animated transitions and accessible navigation. The site effectively presents project information in a clean, responsive layout.

          It has received positive feedback for its blend of aesthetics and usability, successfully creating an engaging user experience.
        `,
      },
      reflection: {
        text: `
          This project was a lesson in balancing creative expression with technical performance. It deepened my appreciation for how small UX details, hover states, animation timing, and spacing—collectively shape the user's perception.

          I am proud of the final result and the skills I honed during the process, and I look forward to applying these learnings to future projects.
        `,
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
        text: `
          Built in 24 hours at NwHacks 2024, Synapse is an AI-powered tool that transforms dense PDF documents into interactive, easy-to-understand flowcharts.

          Working in a team of two, we leveraged Large Language Models (LLMs) and serverless architecture to automate the entire process, from content extraction to diagram generation.
        `,
      },
      process: {
        text: `
          I focused on building the backend and designing the UI. The backend was architected using AWS Lambda, the Serverless Framework, and S3 for scalable, secure file storage. This setup allowed for asynchronous processing of API calls.

          For the frontend, I used TypeScript and Mermaid.js to render the dynamic flowcharts from the data processed by the AI. A major challenge was optimizing the data flow between our microservices to ensure real-time rendering.
        `,
      },
      result: {
        text: `
          The final product could successfully accept a PDF upload, process its content using an AI model, and render a dynamic, interactive flowchart.

          The tool was praised by judges for its technical sophistication and practical application in simplifying complex information.
        `,
      },
      reflection: {
        text: `
          This hackathon was an intense exercise in rapid prototyping and creative problem-solving with AI. It sharpened my skills in asynchronous programming and API integration under tight deadlines.

          Collaborating closely with a partner also reinforced the importance of clear communication and effective teamwork in a fast-paced environment.
        `,
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
        text: `
          BasicAuth is a foundational project I built to solidify my understanding of backend authentication and security principles.

          It provides a complete user authentication system, including registration, login, and session management using JWTs and cookies.
        `,
      },
      process: {
        text: `
          I built the application using the MERN stack (MongoDB, Express.js, React, Node.js). To ensure security, I implemented password hashing with bcrypt and managed sessions with JSON Web Tokens (JWTs) stored in cookies.

          The frontend was developed with React and Vite for a modern, efficient development experience, and styled with TailwindCSS.
        `,
      },
      result: {
        text: `
          The result is a secure and responsive authentication system that follows best practices for web security.

          It features a clean separation between the frontend and backend, demonstrating a modular and maintainable approach to full-stack development.
        `,
      },
      reflection: {
        text: `
          This project was crucial for developing my intuition for backend security and designing robust authentication flows.

          It reinforced my skills in creating modular, full-stack applications and gave me a practical understanding of how to protect user data effectively.
        `,
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
        text: `
          EcoEats is a front-end prototype for a sustainable food discovery app, designed and built for NwHacks 2024.

          The project's goal was to create a compelling Minimum Viable Product (MVP) that combined thoughtful product design with solid front-end development.
        `,
      },
      process: {
        text: `
          I started by wireframing the user interface and experience in Figma to establish a clear design direction.

          Using vanilla JavaScript, HTML, and CSS, I built a responsive and accessible interface that simulates dynamic content from a local JSON file. The focus was on creating a clean, intuitive layout that felt like a real application.
        `,
      },
      result: {
        text: `
          The final prototype successfully demonstrates the core functionality of the app, including location-based filtering and dynamic data cards for displaying restaurant information.

          The responsive design ensures a seamless experience on both mobile and desktop devices, providing a strong foundation for future development and API integration.
        `,
      },
      reflection: {
        text: `
          EcoEats was a great opportunity to sharpen my core front-end skills and practice rapid prototyping.

          It also taught me how to convey a message, in this case, sustainability through UI/UX design choices, such as color palettes, iconography, and information architecture.
        `,
      },
    },
  },
];
