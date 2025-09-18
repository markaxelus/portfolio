export type Workflow = {
  title: string;
  img: string;
  desc: string;
}

export const workflow: Workflow[] = [
  {
    title: "EMPATHIZE & DEFINE",
    img: "/emphatize.jpg",
    desc: "Convert abstract problems into actionable goals, scope, and requirements.",
  },
  {
    title: "IDEATE & DESIGN",
    img: "/prototype.jpg",
    desc: "Sketch, wireframe, and prototype iteratively. Refine UI/UX.",
  },
  {
    title: "BUILD & TEST",
    img: "/terminal.jpg",
    desc: "Write testable, scalable code with continuous integration, and user feedback.",
  },
  {
    title: "LAUNCH & ITERATE",
    img: "/launch.jpg",
    desc: "Deploy quickly, gather feedback, monitor with analytics, and continuously improve.",
  },
]

