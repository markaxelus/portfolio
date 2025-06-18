import { LucideIcon, Paintbrush, FileText, Code2, Rocket } from "lucide-react";

export type Workflow = {
  icon?: LucideIcon
  title: string;
  desc: string;
}

export const workflow: Workflow[] = [
  {
    icon: FileText,
    title: "Empathize & Define",
    desc: "Convert abstract problems into actionable goals, scope, and requirements.",
  },
  {
    icon: Paintbrush,
    title: "Ideate & Design",
    desc: "Sketch, wireframe, and prototype iteratively. Refine UI/UX.",
  },
  {
    icon: Code2,
    title: "Build & Test",
    desc: "Write testable, scalable code with continuous integration, and user feedback.",
  },
  {
    icon: Rocket,
    title: "Launch & Iterate",
    desc: "Deploy quickly, gather feedback, monitor with analytics, and continuously improve.",
  },
]

