import Hero from "@/components/Hero"
import Process from "@/components/Process"
import Works from "@/components/Works"
import AboutPreview from "@/components/About/AboutPreview"
import Footer from "@/components/Footer"


export default function Home() {
  return (
    <>
      <main className="relative z-10 bg-white dark:bg-black">
        <Hero/>
        <Process />
        <Works
          headingText="work."
          headingClassName=""
        />
        <AboutPreview />
      </main>
      <Footer />
    </>
  );
}
