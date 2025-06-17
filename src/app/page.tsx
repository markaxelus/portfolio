import Hero from "@/components/Hero"
import SelectedProjects from "@/components/Projects/SelectedProjects"

export default function Home() {
  return (
    <main className="">
      <Hero/>
      <SelectedProjects
        headingText="work."
        headingClassName="text-[30px] tracking-[-0.03em] font-medium"
      />
    </main>
  );
}
