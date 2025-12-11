import { SectionShell } from "@/components/ui/section";

export default function AboutSection() {
  return (
    <SectionShell
      id="about"
      title="Om Senan"
      eyebrow="Profil"
      description="Kort, faktuel intro om Senan Salah og retningen mod spiludvikling."
    >
      <div className="space-y-4 text-base leading-relaxed text-slate-200">
        <p>
          Jeg hedder Senan Salah, er 23 år og læser Datamatiker. Jeg bygger ting
          inden for web, værktøjer og interaktive projekter, mens jeg arbejder
          mig i retning af spiludvikling.
        </p>
        <p className="text-slate-400">
          Sitet er mit sted til at samle projekter, eksperimenter og kommende
          spil. Jeg bruger AI-assisteret udvikling og vibe coding for at bygge
          hurtigere og teste idéer uden unødvendig støj. Teksten her er bevidst
          kort og kan udvides senere.
        </p>
      </div>
    </SectionShell>
  );
}


