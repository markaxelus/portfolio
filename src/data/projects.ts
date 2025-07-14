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
    focus: string;
    project: string;
    year: string;
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
      focus: "Front-End Development",
      project: "Website",
      year: "2024",
      tools: "Next.js, TypeScript, TailwindCSS",
    },
    content: {
      overview: {
        text: `
          As the developer for the UVic Environmental Engineering Club's website redesign, I tackled the challenge of modernizing an outdated and poorly maintained platform. The existing site suffered from content inconsistencies, broken components, and a lack of responsive design that hindered both visitor engagement and internal team operations. My mission was to transform this legacy system into a modern, maintainable platform that would serve as a proper digital presence for the club. The project required not just technical fixes, but a complete rethinking of how content would be managed and updated by future team members.
        `,
      },
      process: {
        text: `
          I began by conducting a thorough code audit of the existing React codebase, mapping out component dependencies and identifying critical pain points. The most pressing issue was the Teams page, which used hardcoded layouts that made simple updates unnecessarily complex. I redesigned this into a dynamic system using TypeScript interfaces and reusable components, allowing content updates through structured data files rather than direct code changes.

          Performance optimization was another key focus. I implemented proper image optimization using Next.js's built-in features. The site's responsive design was standardized using TailwindCSS's mobile-first approach, eliminating the previous inconsistent breakpoint handling. I also introduced proper error boundaries and loading states to improve the user experience during data fetches and page transitions.
        `,
      },
      result: {
        text: `
          The redesigned website now offers a significantly improved experience for both visitors and administrators. Load times have been reduced, the UI is consistently responsive across all devices, and content updates can be made through a streamlined process. Key improvements include:

          • Modular component architecture that separates content from presentation
          • Standardized responsive design system using TailwindCSS
          • Simplified content management workflow for non-technical users
          • Comprehensive documentation for future maintainers
        `,
      },
      challenge: {
        text: `
          The most significant challenge was balancing the need for immediate improvements with long-term maintainability. The existing codebase lacked documentation and consistent patterns, making it tempting to start from scratch. However, project constraints required working within the existing system. I developed a strategy of incremental improvements, carefully refactoring critical components while maintaining functionality. This approach required detailed documentation of my changes and thorough testing to ensure no regressions occurred during the transition.
        `,
      },
      reflection: {
        text: `
          This project taught me valuable lessons about technical debt and the importance of sustainable development practices. I learned how to effectively navigate and improve legacy code without disrupting existing functionality. The experience reinforced the critical role of documentation and clean architecture in maintaining long-term project health.

          Most importantly, I gained practical experience in making technical decisions that consider both immediate needs and future maintenance requirements. These insights have directly influenced my approach to new projects, where I now prioritize clear documentation, modular design, and maintainable code structures from the start.
        `,
      },
    },
  },
  {
    id: 2,
    slug: "relay",
    title: "Relay",
    category: "Full-Stack & Product Design",
    imageUrl: "/relay.jpg",
    dateAndType: "Ongoing — Personal",
    description: "",
    stack: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
    metadata: {
      focus: "Full-Stack Development & Product Design",
      project: "Relay",
      year: "Ongoing",
      tools: "Next.js, PostgreSQL, Prisma, TailwindCSS",
    },
    content: {
      overview: {
        text: `
          Relay is a full-stack project management application I'm developing to address common pain points in team collaboration. The project emerged from my experience with existing tools that either sacrificed functionality for simplicity or became too complex for quick adoption. My goal was to create a platform that maintains simplicity while offering powerful features for real-time collaboration, task management, and team coordination.
        `,
      },
      process: {
        text: `
          Development began with extensive research into modern web architectures and state management patterns. I chose Next.js with TypeScript for type safety and better developer experience, paired with PostgreSQL and Prisma for robust data modeling. Key technical decisions included:

          • Implementing a custom real-time collaboration system using WebSocket connections
          • Designing a flexible database schema that could accommodate future feature additions
          • Creating a modular component architecture for reusable UI elements
          • Setting up automated testing pipelines for critical business logic

          I focused heavily on performance optimization, implementing efficient data fetching patterns and careful state management to ensure smooth user interactions even with large datasets.
        `,
      },
      result: {
        text: `
          The current version of Relay successfully demonstrates core project management capabilities while maintaining excellent performance metrics. Key features include:

          • Real-time task updates and collaboration
          • Intuitive drag-and-drop interface for task management
          • Responsive design that works seamlessly across devices
          • Efficient data caching and optimistic UI updates
          • Comprehensive error handling and user feedback systems

          The application maintains sub-second response times for most operations and handles concurrent users effectively, providing a smooth experience for team collaboration.
        `,
      },
      challenge: {
        text: `
          The biggest technical challenge was implementing real-time updates without compromising application performance. Initial WebSocket implementations caused state management issues and unnecessary re-renders. I solved this by implementing a custom event system that batches updates and optimizes re-render cycles. This required deep diving into React's reconciliation process and careful consideration of component lifecycle management.
        `,
      },
      reflection: {
        text: `
          Building Relay has significantly deepened my understanding of full-stack development and real-time systems. I've learned valuable lessons about state management, data synchronization, and the importance of user-centric design in collaborative tools.

          The project has also taught me about making pragmatic technical decisions - knowing when to build custom solutions versus leveraging existing libraries, and how to plan for scalability without over-engineering. These insights continue to influence my approach to new development challenges.
        `,
      },
    },
  },
  {
    id: 3,
    slug: "portfolio",
    title: "Portfolio",
    category: "UI/UX Design",
    imageUrl: "",
    dateAndType: "2025 — Personal",
    description: "",
    stack: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS"],
    metadata: {
      focus: "UI/UX & Front-End Development",
      project: "Portfolio",
      year: "2025",
      tools: "Next.js, TypeScript, Framer Motion, TailwindCSS",
    },
    content: {
      overview: {
        text: `
          This portfolio website represents my approach to modern web development, combining performance optimization with engaging user interactions. The project served as a practical exploration of advanced animation techniques, static site generation, and responsive design principles. My goal was to create a platform that not only showcases my work effectively but also demonstrates technical proficiency through its implementation.
        `,
      },
      process: {
        text: `
          The development process focused on three key areas: performance, interactivity, and maintainability. Using Next.js and TypeScript provided a solid foundation for static site generation and type safety. I implemented a custom animation system using Framer Motion, carefully orchestrating entrance animations and scroll-based reveals.

          Performance optimization was a primary concern. I established a comprehensive strategy including:
          • Implementing dynamic image loading with Next.js Image component
          • Setting up efficient component code-splitting
          • Optimizing animation performance through CSS transforms
          • Implementing proper font loading and subsetting
        `,
      },
      result: {
        text: `
          The final implementation achieves several key technical objectives:

          • Consistent 90+ scores across all Core Web Vitals
          • Sub-second initial page loads through static generation
          • Perfect accessibility scores in Lighthouse audits
          • Responsive design that maintains visual fidelity across all breakpoints

          The site successfully balances aesthetic appeal with technical performance, creating an engaging yet efficient user experience.
        `,
      },
      challenge: {
        text: `
          The primary challenge was implementing complex animations without compromising performance. Initial implementations of scroll-based animations caused significant layout shifts and performance drops on mobile devices. I solved this by creating a custom hook that manages animation states based on intersection observer entries, effectively decoupling animation triggers from scroll events. This approach dramatically improved performance while maintaining smooth visual transitions.
        `,
      },
      reflection: {
        text: `
          This project pushed me to find the right balance between creative design and technical performance. I learned valuable lessons about animation optimization, the importance of performance budgets, and how to structure a project for long-term maintainability.

          The experience reinforced the importance of measuring performance impact during development rather than treating it as an afterthought. These insights have become central to my approach to front-end development, influencing how I evaluate technical decisions in all my projects.
        `,
      },
    },
  },
  {
    id: 4,
    slug: "synapse",
    title: "Synapse",
    category: "Full-Stack & Product Design",
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
      focus: "Full-Stack Development & Product Design",
      project: "Synapse",
      year: "2024",
      tools:
        "TypeScript, Node.js, Express, AWS, LangChain, Mermaid.js, Lambda, Serverless",
    },
    content: {
      overview: {
        text: `
          Synapse was developed during NwHacks 2025, where I collaborated with a partner to build an AI-powered visualization tool under tight time constraints.

          Our vision was to create a web application that could convert academic or technical PDFs into editable diagrams, making complex information easier to understand visually.

          The project combined full-stack engineering, serverless architecture, and AI integration into a seamless user-facing tool, with a focus on both front-end user interaction and back-end reliability.
        `,
      },
      process: {
        text: `
          We began by carefully scoping the technical workflow into key components: PDF ingestion for handling large documents, entity extraction using AI, code generation for diagrams, and real-time rendering.

          For the front-end, I architected a responsive UI using TypeScript and React. The interface needed to handle large file uploads smoothly, provide clear feedback during processing, and display interactive Mermaid.js diagrams.

          The back-end architecture was built around AWS Lambda functions with 512MB memory allocation. I implemented cold-start mitigation strategies and optimized the processing pipeline to handle documents up to 10MB within a five-second window.

          To transform PDF content into meaningful diagrams, we integrated LangChain with OpenAI's GPT-4 API. This required careful prompt engineering to extract semantic relationships from text and convert them reliably into valid Mermaid diagram syntax.

          Throughout development, I focused on reliability: implementing comprehensive error handling, adding real-time loading indicators, and setting up monitoring for the serverless functions. We used a local-first testing approach to validate components before deploying, which was crucial given the hackathon's time constraints.
        `,
      },
      result: {
        text: `
          Synapse successfully delivered on its core promise: users could upload complex PDFs and receive clean, editable diagrams within seconds. The interface provided a smooth experience from upload through to final visualization.

          Performance metrics exceeded our targets, with the system processing 10MB documents in under five seconds even on cold Lambda starts. The front-end maintained responsiveness under load, and the backend handled concurrent API calls without degradation.

          The AI-powered diagram generation proved remarkably accurate, correctly identifying and visualizing relationships from various types of technical documents. Users could further edit these diagrams through an intuitive interface.

          The project earned recognition during judging for its practical utility, technical implementation, and seamless integration of AI capabilities. We demonstrated that complex document processing could be both fast and user-friendly.
        `,
      },
      challenge: {
        text: `
          The primary technical challenge was optimizing PDF processing within AWS Lambda's constraints. The 512MB memory limit and cold-start times initially made it impossible to handle larger documents within our target response time.

          We tackled this through several optimizations: implementing streaming document parsing to reduce memory usage, chunking the text intelligently to maintain context across segments, and parallelizing AI processing where possible.

          Another significant challenge was ensuring consistent, meaningful output from the AI processing pipeline. Early versions would sometimes produce invalid diagram syntax or miss important relationships in the text.

          We solved this by implementing strict validation at each step: schema checking for AI outputs, syntax verification for generated Mermaid code, and fallback options for edge cases. This made the system much more robust while still maintaining performance.
        `,
      },
      reflection: {
        text: `
          This project significantly deepened my understanding of serverless architecture and its practical limitations. Working within strict memory and time constraints taught me valuable lessons about optimization and resource management.

          The experience of integrating AI capabilities in a production environment was particularly enlightening. I learned how to balance the power of large language models with the need for predictable, validated outputs.

          The hackathon environment pushed me to make pragmatic architectural decisions while maintaining code quality. I gained confidence in rapidly prototyping complex features and iterating based on immediate feedback.

          Perhaps most importantly, I learned how to effectively collaborate under pressure, coordinate across different system components, and maintain a focus on end-user value even while solving complex technical challenges.
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
      focus: "Back-End Development& Authentication",
      project: "BasicAuth",
      year: "2024",
      tools: "React, Express, MongoDB, JWT",
    },
    content: {
      overview: {
        text: `
          BasicAuth is a full-stack authentication system I built to gain hands-on experience with secure user management and session handling. Rather than using pre-built solutions, I chose to implement core authentication features from scratch to understand the underlying security principles and best practices in modern web applications.
        `,
      },
      process: {
        text: `
          I approached the development systematically, focusing first on security fundamentals:

          • Implementing secure password hashing using bcrypt with proper salt rounds
          • Setting up JWT-based session management with refresh token rotation
          • Configuring secure HTTP-only cookies with appropriate flags
          • Creating middleware for role-based access control

          The frontend was built with React and TypeScript, emphasizing clean component architecture and proper state management for auth flows. I implemented comprehensive form validation, clear error handling, and intuitive user feedback for authentication states.
        `,
      },
      result: {
        text: `
          The completed system successfully implements core authentication features while maintaining security best practices:

          • Secure user registration and login flows
          • Password reset functionality with email verification
          • Role-based access control for protected routes
          • Automatic token refresh handling
          • Session timeout management
          • Cross-site request forgery (CSRF) protection

          All components are thoroughly documented and include proper error handling, making the system both secure and maintainable.
        `,
      },
      challenge: {
        text: `
          The most significant challenge was implementing secure token refresh logic. The initial implementation was vulnerable to race conditions during concurrent refreshes, potentially leading to invalid session states. I solved this by implementing a token rotation system with proper invalidation checks and implementing a mutex-like mechanism for refresh operations. This required careful consideration of edge cases and proper error handling to maintain session security.
        `,
      },
      reflection: {
        text: `
          Building BasicAuth from scratch gave me deep insights into authentication security and user session management. I learned the importance of considering security at every level of the application stack and gained practical experience with common authentication vulnerabilities and their mitigations.

          The project also taught me valuable lessons about API design and state management in full-stack applications. These learnings have directly influenced how I approach security considerations in my subsequent projects.
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
      focus: "Back-End Development",
      project: "EcoEats",
      year: "2024",
      tools: "HTML, CSS, Javascript",
    },
    content: {
      overview: {
        text: `
          EcoEats was my first hackathon project, where I took on the challenge of building a carbon-conscious recipe platform using vanilla web technologies. The project aimed to help users reduce their carbon footprint by discovering and cooking with seasonal, locally-available ingredients. This served as both an environmental initiative and a practical exercise in fundamental web development concepts.
        `,
      },
      process: {
        text: `
          Our development process, while enthusiastic, suffered from a lack of proper planning and structure. We immediately jumped into coding with vanilla JavaScript, HTML, and CSS, driven by the excitement of building our vision. Initial development focused on various features in isolation:

          • Building a basic grid layout for displaying seasonal ingredients and recipes
          • Setting up ingredient seasonality data structures and recipe filtering
          • Implementing carbon footprint calculation algorithms
          • Creating user recipe storage and favorites system

          However, without a clear architectural plan, these components were developed in isolation without considering how they would integrate. This led to inconsistent patterns across features and mounting technical debt as the project progressed.
        `,
      },
      result: {
        text: `
          Despite our planning challenges, we managed to implement some basic functionality:

          • A basic responsive layout for displaying seasonal ingredients
          • Interactive filtering system for ingredient seasonality
          • Recipe search based on available seasonal ingredients

          While the final prototype demonstrated the core concept of sustainable cooking through seasonal ingredients, many features were fragile and required constant maintenance. The lack of initial planning meant that while individual components worked, their integration was not as seamless as intended.
        `,
      },
      challenge: {
        text: `
          The biggest challenge stemmed from inadequate planning and an over-reliance on ad-hoc development. While we had a clear vision of what we wanted to build, we didn't properly architect how to get there. This led to a cascade of issues: features were implemented without considering their interactions, state management became increasingly chaotic, and the codebase grew more brittle with each addition.

          The lack of structure meant that bugs became exponentially harder to track and fix. What should have been simple feature additions turned into hours of debugging sessions, as changes in one area would unexpectedly break functionality in others. We found ourselves spending more time fixing regressions than implementing new features, significantly impacting our productivity and morale.

          This experience starkly illustrated the importance of proper planning and architecture, even in time-constrained environments. While we eventually managed to deliver a working prototype, the development process was far more challenging and time-consuming than necessary due to our initial rush to start coding without a solid foundation.
        `,
      },
      reflection: {
        text: `
          EcoEats was a pivotal learning experience that taught me the critical importance of proper planning and architecture, even in rapid development environments like hackathons. While our vision of reducing carbon footprints through seasonal cooking was compelling, the challenges we faced due to inadequate planning and ad-hoc development became a powerful lesson in what not to do.

          The project helped me understand that taking time for initial architecture and planning isn't just bureaucracy - it's a crucial investment that pays dividends throughout development. Features like carbon footprint calculation and seasonal ingredient matching required complex data relationships that should have been properly modeled from the start. In subsequent projects, I've adopted a more structured approach, always starting with a clear architectural plan and development strategy, even under time constraints.

          Most importantly, I learned that enthusiasm for coding needs to be balanced with disciplined software engineering practices. While we eventually delivered a working prototype that demonstrated the potential for technology to promote sustainable cooking, the experience shaped my approach to all future projects, where I now ensure proper planning and architecture are in place before diving into implementation.
        `,
      },
    },
  },
];
