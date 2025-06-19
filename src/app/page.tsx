import Hero from "@/components/Hero"
import Process from "@/components/Process"
import Works from "@/components/Works"
import AboutPreview from "@/components/About/AboutPreview"


export default function Home() {
  return (
    <main className="">
      <Hero/>
      <Process />
      <Works
        headingText="work."
        headingClassName="text-[48px] tracking-[-0.03em] font-medium"
      />
      <AboutPreview />
    </main>
  );
}
