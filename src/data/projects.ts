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
    challenge: {
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
          The UVic Environmental Engineering Club's website had become increasingly difficult for both visitors and internal team members to use. Outdated content, broken UI components, and a lack of responsive design made the site feel obsolete and fragile. I was brought in to lead a comprehensive modernization effort. The goals were clear: restore usability, ensure future maintainability, and create a user experience that would reflect the professionalism of the club itself. From the outset, I approached the project with two priorities: solve visible issues to improve public perception and restructure the site internally so future club members could manage it with minimal technical friction.
        `,
      },
      process: {
        text: `
          The redevelopment began with an in-depth review of an unfamiliar and undocumented React codebase. Without documentation or clear component separation, debugging even simple UI issues required careful tracing through nested state logic and component trees. One of the more complex bugs was a broken marquee animation, which was failing silently due to asynchronous render timing conflicts and brittle state handling. I diagnosed the issue through step-by-step state tracing and visual inspection of DOM updates during re-renders.

          Beyond bug fixes, I tackled larger architectural challenges. The Teams page, a critical section of the site, had been hardcoded with inflexible layouts that made updates cumbersome and prone to error. I redesigned it into a modular system that dynamically renders team members from a structured data source. This new structure separated content from layout logic, allowing for seamless updates by non-technical users and ensuring consistent styling across screen sizes. I also standardized responsive design practices across the site using TailwindCSS, reducing CSS redundancy and improving cross-device performance.`,
      },
      result: {
        text: `
          The new website offers a much more polished and reliable experience. Visitors now encounter a clean, intuitive interface free from the bugs and visual inconsistencies that had previously undermined the site. Specific improvements included fixing animation behavior, eliminating layout shift issues on mobile devices, and streamlining the navigation flow. On the backend, the modular Teams page and revised component structure reduced technical debt and simplified onboarding for new contributors. These changes made the website easier to maintain and aligned it with best practices for sustainable front-end development. Club members can now add or remove content without touching core code, which supports the long-term health and accessibility of the platform.
      `,
      },
      challenge: {
        text: `
          The hardest part was debugging an unfamiliar and undocumented React codebase. Without documentation or clear component separation, even simple UI issues required careful tracing through nested state logic and component trees. One complex bug was a broken marquee animation that was failing silently due to asynchronous render timing conflicts. I had to diagnose it through step-by-step state tracing and visual inspection of DOM updates during re-renders.
        `,
      },
      reflection: {
        text: `
          This project gave me practical experience with reverse-engineering legacy systems, a skill that has since proven invaluable in other codebase contributions and internships. I learned how to navigate undocumented logic, how to debug animation issues tied to render cycles, and how to identify weak points in component design. More importantly, I saw firsthand how poor documentation and rigid architecture can block future progress, even for minor updates. As a result, I now treat clarity and maintainability as first-class engineering priorities. Every component I write today is informed by that experience. Whether I am working on a hackathon project or a multi-month application, I aim to leave behind systems that are easy to understand, easy to test, and ready to evolve.`,
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
      challenge: {
        text: `
          Relay is my sandbox for understanding scalability trade-offs. Very quickly I discovered that optimistic UI updates, websocket fan-out, and complex joins in Prisma could crush performance on even modest team sizes. Designing for scale forced me to rethink everything from data modeling to deployment: connection pooling, horizontal sharding, and CQRS patterns became real, not theoretical. Every refactor drove home how early architectural choices ripple into cost, latency, and developer experience.
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
      challenge: {
        text: `
          The main challenge was implementing secure authentication with AWS Cognito and integrating it seamlessly with the backend services running on AWS EC2.
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
          Synapse was developed during NwHacks 2025, where I collaborated with a partner to build an AI-powered visualization tool under tight time constraints. Our vision was to create a web application that could convert academic or technical PDFs into editable diagrams, helping users visually understand complex information. The project was ambitious, combining full-stack engineering, serverless architecture, and AI integration into a seamless user-facing tool. My focus was on both front-end user interaction and back-end reliability, ensuring the application could handle large files quickly and present useful visualizations with minimal latency.`,
      },
      process: {
        text: `
          To begin, we scoped the technical workflow and identified key components: PDF ingestion, entity extraction, code generation for diagrams, and rendering. I architected the front-end using TypeScript and React, building a responsive UI that could process user uploads and display diagrams using Mermaid.js. Given the complexity of parsing and transforming unstructured document data, we used LangChain and OpenAI’s GPT-4 API to extract semantic relationships from the text, which we then converted into Mermaid diagram syntax.

          On the back-end, I configured AWS Lambda functions with 512MB memory and cold-start mitigation strategies to process and respond within five seconds for documents up to 10MB in size. This included tuning FastAPI endpoints, managing CORS, and coordinating data flow through API Gateway. I also implemented real-time loading indicators and error handling to ensure a fluid experience during high-compute operations. To support scalability and reduce response times, I applied caching mechanisms and minimized external calls during diagram generation.

          Throughout the project, I leaned on principles from software architecture and systems design courses to make each layer modular, testable, and fail-safe. We adopted a CI mindset, testing components locally before deploying to avoid runtime errors during the live demo. Our iterative process allowed us to refine the product in real-time, balancing performance with usability under the pressure of a hackathon timeline.`,
      },
      result: {
        text: `
          Synapse succeeded in delivering a smooth user experience with tangible utility. Users could upload technical PDFs and, within seconds, receive clean, editable diagrams that visually mapped the document’s key entities and relationships. Performance benchmarks showed consistent processing of 10MB documents under five seconds with no cold-start issues, even when deployed serverlessly on AWS. The front-end offered drag-and-drop uploads and clean rendering, while the back-end maintained high availability and handled concurrent API calls without data loss. The project was well-received during judging, particularly for its real-world applicability and the seamless fusion of AI with visualization.`,
      },
      challenge: {
        text: `
          Processing unstructured PDFs in under five seconds on a cold Lambda required memory-safe streaming parsing and prompt determinism. Early versions exhausted the 512 MB memory ceiling and produced hallucinated diagram nodes. I chunked the PDF text, implemented sliding-window embeddings, and guarded prompts with JSON schema validation to guarantee valid Mermaid output, all while staying inside the hackathon timebox.
        `,
      },
      reflection: {
        text: `
          This project deepened my appreciation for rapid prototyping and scalable architecture. Working with serverless infrastructure under real-time constraints taught me how to balance innovation with operational reliability. More importantly, integrating GPT-4 via LangChain pushed me to think critically about prompt engineering and data validation, especially when translating freeform text into code that needs to render correctly. Synapse also reminded me how essential clear system boundaries and modular thinking are, especially when collaborating under pressure. I walked away with a sharper sense of how to deliver production-quality features quickly, and a renewed excitement for building tools that simplify complex workflows.
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
          BasicAuth is a full-stack user authentication system I developed to explore secure login mechanisms, session management, and role-based access control. The goal was to design a modern, extensible platform that mirrors real-world authentication flows while applying security best practices. Rather than relying on plug-and-play libraries, I built key components from the ground up to deepen my understanding of authentication logic and to ensure end-to-end control over the user experience and security guarantees.`,
      },
      process: {
        text: `
          I designed BasicAuth using the MERN stack—MongoDB, Express.js, React, and Node.js—paired with TailwindCSS for UI and Vite for a fast development environment. On the backend, I implemented secure password handling using bcrypt hashing and protected session logic with HTTP-only, SameSite cookies to guard against cross-site scripting and request forgery. JWTs (JSON Web Tokens) were used for stateless session management, with built-in logic for access token refresh and role-based route protection.

          On the frontend, I created a responsive interface with clear state feedback for authentication flows, including sign-up, login, logout, and token expiration prompts. The UI was designed for clarity and usability, while providing transparent access control messaging based on user roles. I also modularized backend middleware to handle auth logic and validation cleanly, making the system easy to expand for future features like email verification or two-factor authentication.

          To ensure robustness, I stress-tested the endpoints using Postman and used OWASP security checks to validate the implementation against common attack vectors. The result was a well-scoped, secure platform ready for reuse in other applications.`,
      },
      result: {
        text: `
          The completed system passed OWASP security tests and functioned reliably under simulated user loads. Authentication and refresh flows behaved as expected, even under concurrent requests, and edge cases such as token expiration or unauthorized access were handled gracefully. Beyond the technical achievements, the modular codebase makes it easy to adapt the project for other web apps requiring custom auth, giving me a reusable foundation for future work. The responsive design also ensures that the UI performs well across devices, offering a professional user experience.`,
      },
      challenge: {
        text: `
          BasicAuth was my first full-stack application, so the biggest hurdle was simply wiring every layer together. Figuring out how React state, Express routes, MongoDB models, and JWT sessions all interact pushed me to think holistically about data flow. Debugging those interactions taught me to trace requests end-to-end, design clear API contracts, and appreciate the value of comprehensive tests.
        `,
      },
      reflection: {
        text: `
          BasicAuth taught me the importance of thoughtful, layered security and the trade-offs between ease of use and technical safety. Building each auth flow from scratch reinforced my understanding of vulnerabilities like token theft and session hijacking, and helped me internalize secure coding practices. This project also improved my backend organization skills, particularly in designing middleware and error handling routines that are both readable and extensible. More broadly, it strengthened my belief that robust authentication is not just a feature, but a foundational pillar of trustworthy software. That mindset now influences how I approach system design in every project I take on.`,
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
      challenge: {
        text: `
          EcoEats was my very first hackathon, and the lack of upfront planning showed. Mid-sprint feature creep and frantic bug-fixes left us with tangled state logic and copy-pasted components that became impossible to reason about. We lost hours chasing side-effects caused by circular dependencies. That pain taught me the value of clear component boundaries, agreed conventions, and saying “no” to scope bloat—lessons I carry into every project now.
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
