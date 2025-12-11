import AboutSection from "@/components/sections/AboutSection";
import AiToolSection from "@/components/sections/AiToolSection";
import ContactSection from "@/components/sections/ContactSection";
import CvSection from "@/components/sections/CvSection";
import GamesSection from "@/components/sections/GamesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <main className="space-y-16 pt-24 pb-16 md:space-y-24">
        <AboutSection />
        <ProjectsSection />
        <GamesSection />
        <CvSection />
        <ContactSection />
        <AiToolSection />
      </main>
    </div>
  );
}


