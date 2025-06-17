/* export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  projectType: string;
  imageUrl: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "relay",
    title: "Relay",
    category: "Full-Stack / Product Design",
    projectType: "Personal Project",
    imageUrl: "/relay.jpg",
    description: "",
  },
  {
    id: 2,
    slug: "synapse",
    title: "Synapse",
    category: "Full-Stack / Product Design",
    projectType: "Hackathon",
    imageUrl: "",
    description: "",
  },
  {
    id: 3,
    slug: "basicauth",
    title: "BasicAuth",
    category: "Full-Stack",
    projectType: "Personal Project",
    imageUrl: "/basicauth",
    description: "",
  },
  {
    id: 4,
    slug: "ecoeats",
    title: "EcoEats",
    category: "Front-End / Product Design",
    projectType: "Hackathon",
    imageUrl: "/ecoeats.jpg",
    description: "",
  },
  
] */

  // data/projects.ts

export type Project = {
  id: number
  slug: string
  title: string
  category: string
  imageUrl: string
  description: string
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "meetmate",
    title: "MeetMate",
    category: "Development / Design",
    imageUrl: "/images/meetmate.png",
    description:
      "MeetMate is a collaborative meeting scheduling app that helps teams find optimal times across time zones.",
  },
  {
    id: 2,
    slug: "fishtrack",
    title: "fishtrack.",
    category: "iOS Development / Product Design",
    imageUrl: "/images/fishtrack.png",
    description:
      "Track fish migrations and movements with a modern iOS app using live data overlays.",
  },
  {
    id: 3,
    slug: "tcg-home",
    title: "TCG-Home",
    category: "Frontend Development",
    imageUrl: "/images/tcg-home.png",
    description:
      "A property listing site with clean UI and instant filtering based on user preferences.",
  },
]
