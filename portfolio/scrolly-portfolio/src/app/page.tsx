import HeroScroller from "@/components/HeroScroller";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      {/* The 500vh scrollytelling section */}
      <HeroScroller />

      {/* The Projects Section below */}
      <div className="relative z-20">
        <Projects />
        <Resume />
      </div>
    </main>
  );
}
