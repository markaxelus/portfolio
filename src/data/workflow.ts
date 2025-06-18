import { LucideIcon } from "lucide-react";

export type Workflow = {
  icon?: LucideIcon
  title: string;
  desc: string;
}

export const workflow: Workflow[] = [
  {
    title: "Empathize & Define",
    desc: "Initiate the SDLC t. Use structured techniques to convert abstract goals into actionable software requirements.",
  },
  {
    title: "Ideate & Design",
    desc: "Sketch, wireframe, and prototype iteratively. Use tools like Figma and feedback loops to refine UI/UX.",
  },
  {
    title: "Build & Test",
    desc: "Develop using modern full-stack tools. Write testable, scalable code with continuous integration, while incorporating user feedback.",
  },
  {
    title: "Launch & Iterate",
    desc: "Deploy quickly, gather feedback, monitor with analytics, and continuously improve.",
  },
]

