import Hero from "@/components/Hero"
import Process from "@/components/Process"
import Works from "@/components/Works"
import AboutPreview from "@/components/About/AboutPreview"
import Footer from "@/components/Footer"


export default function Home() {
  return (
    <main className="pb-[85vh]">
      <Hero/>
      <Process />
      <Works
        headingText="work."
        headingClassName=""
      />
      <AboutPreview />
      <Footer />
    </main>
  );
}
