import Hero from "@/components/Hero"
import Works from "@/components/Works"

export default function Home() {
  return (
    <main className="">
      <Hero/>
      <Works
        headingText="work."
        headingClassName="text-[48px] tracking-[-0.03em] font-medium"
      />
    </main>
  );
}
