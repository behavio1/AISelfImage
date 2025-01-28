import { BentoGrid, BentoCard } from "./components/ui/bento-grid";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 p-6 md:p-12">
      <div className="mx-auto max-w-5xl relative">
        <div className="absolute -top-2 right-0 flex items-center gap-3">
          <Link
            href="https://github.com/behavio1/AISelfImage"
            className="p-2 rounded-lg bg-neutral-800 text-white/90 hover:bg-neutral-700 transition-colors duration-200 flex items-center justify-center"
            target="_blank"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="https://behaviocrew.com"
            className="px-4 py-2 rounded-lg bg-neutral-800 text-white/90 hover:bg-neutral-700 transition-colors duration-200"
            target="_blank"
          >
            Visit Behavio
          </Link>
        </div>
        <h1 className="mb-4 text-4xl font-bold text-white/90">AI Self Image</h1>
        <p className="mb-8 text-lg text-neutral-400">
          Explore how artificial intelligence perceives and visualizes itself.
          Through interactive experiences, discover the fascinating self-image
          of various AI models as they interpret and express their own existence
          through artistic representation.
        </p>

        <BentoGrid>
          <BentoCard
            href="/claude3-5"
            title="Claude's Self Visualization"
            description="Experience an interactive chat with Claude AI as it explores and visualizes its own self-perception through artistic interpretation, offering unique insights into artificial consciousness."
            className="group relative transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1"
            style={{
              backgroundImage: "url('/Claude.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          <BentoCard
            title="Coming Soon"
            description="Future AI exploration space."
            className="group relative transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1"
          />

          <BentoCard
            title="Coming Soon"
            description="Future AI exploration space."
            className="group relative transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1"
          />

          <BentoCard
            title="Coming Soon"
            description="Future AI exploration space."
            className="group relative transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1"
          />
        </BentoGrid>
      </div>
    </div>
  );
}
