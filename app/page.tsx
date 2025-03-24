import Image from "next/image"; 
import Hero from "@/components/hero"
import TechStack from "@/components/TechStack";
import Project from "@/components/Projects"
import "./globals.css"


export default function Home() {
  return (
    <div className="font-inter">
      <Hero />
      <TechStack />
      
      <Project />
     

    </div>
  );
}
