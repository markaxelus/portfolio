export type Project = {
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
  
]