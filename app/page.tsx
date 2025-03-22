import Image from "next/image"; 
import Hero from "@/components/hero"
import Projects from "@/components/Projects"

export default function Home() {
  return (
    <div className="font-inter">
      <Hero />
      <Projects />
    </div>
  );
}
