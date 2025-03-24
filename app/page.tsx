import Hero from "@/components/Hero"
import Project from "@/components/Projects"
import Footer from "@/components/Footer"
import "./globals.css"


export default function Home() {
  return (
    <div className="font-inter">
      <Hero />
      <Project />
     
      <Footer />
    </div>
  );
}
