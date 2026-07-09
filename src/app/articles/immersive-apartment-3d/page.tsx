import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { USE_CASES_COUNT } from "@/lib/useCasesCount.generated";

const SITE_URL = "https://joaoccaldas.github.io/sintra-ai";

export const metadata: Metadata = {
  title: "Spatial AI: Turning Apartment Photos Into Immersive 3D Experiences — Sintra AI",
  description:
    "Why apartment-to-immersive-3D tools matter: spatial AI, Gaussian splatting, virtual tours, home design, real estate and personal memory spaces.",
  alternates: {
    canonical: `${SITE_URL}/articles/immersive-apartment-3d/`,
  },
  openGraph: {
    title: "Spatial AI: Turning Apartment Photos Into Immersive 3D Experiences",
    description:
      "A practical Sintra AI article on tools that convert homes, rooms and apartments into immersive 3D experiences.",
    url: `${SITE_URL}/articles/immersive-apartment-3d/`,
  },
};

const sources = [
  {
    label: "Instagram reel reference",
    href: "https://www.instagram.com/reel/DakMOxwMelo/?igsh=MzJlYzJ4ajY5amp0",
    note: "User-supplied example of apartment images becoming an immersive experience.",
  },
  {
    label: "Splatica / Gaussian splatting example",
    href: "https://www.techradar.com/cameras/i-turned-my-local-beauty-spot-into-an-immersive-3d-environment-using-splatica-and-my-insta360-cameras-and-the-whole-process-is-surprisingly-easy",
    note: "Example of turning captured real-world spaces into navigable 3D scenes.",
  },
  {
    label: "World Labs photo-to-3D world preview",
    href: "https://www.axios.com/2024/12/03/fei-fei-li-startup-photos-3d-worlds",
    note: "Early preview of still-photo-to-3D-world generation.",
  },
  {
    label: "Roomify research paper",
    href: "https://arxiv.org/abs/2603.04917",
    note: "Research on transforming physical rooms into spatially grounded immersive environments.",
  },
  {
    label: "Copilot 3D preview coverage",
    href: "https://www.theverge.com/hands-on/756587/microsoft-copilot-3d-feature-hands-on",
    note: "Example of consumer 2D-image-to-3D-model tooling.",
  },
];

export default function ImmersiveApartment3DArticle() {
  return (
    <>
      <Header total={USE_CASES_COUNT} />
      <main id="main-content" className="min-h-screen bg-void pt-28 pb-24">
        <article className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-gradient-to-r from-transparent to-violet-bright" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-violet-bright">
              Spatial AI · Immersive homes · 3D worlds
            </span>
          </div>

          <h1 className="font-serif font-light text-[clamp(44px,7vw,82px)] leading-[0.96] tracking-[-0.045em] text-fg-1 mb-6">
            The apartment is becoming an <em className="italic text-violet-bright">AI-native interface</em>.
          </h1>

          <p className="text-[17px] md:text-[20px] leading-relaxed text-fg-3 mb-10 max-w-3xl">
            A new class of spatial-AI tools can take images, video, or 360-degree captures of a room and turn them into immersive 3D experiences. For apartments, real estate, renovation planning and memory capture, this is more than a visual gimmick: it is the beginning of personal spaces becoming searchable, editable and programmable.
          </p>

          <div className="rounded-3xl border border-violet/[0.16] bg-gradient-to-br from-violet/[0.08] to-transparent p-5 md:p-6 mb-12">
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-violet-bright mb-3">Sintra take</p>
            <p className="text-[15px] leading-relaxed text-fg-2">
              The important shift is not only that a room can look 3D. The shift is that the room becomes data: geometry, objects, surfaces, lighting, style, movement paths and context. Once a home is represented as a spatial scene, AI can help redesign it, explain it, stage it, sell it, teach inside it, or turn it into a memory world.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="font-serif text-[32px] md:text-[42px] leading-tight tracking-[-0.03em] text-fg-1 mb-4">What the tool category does</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ["Capture", "Use phone photos, video, 360 camera footage or room scans as raw material."],
                ["Reconstruct", "Estimate camera motion, depth, surfaces and geometry so the flat capture becomes spatial."],
                ["Render", "Create a navigable 3D scene, Gaussian splat, mesh, point cloud, or immersive environment."],
                ["Transform", "Restyle, stage, annotate, teach, sell, preserve or simulate changes inside the space."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-violet-bright mb-3">{title}</p>
                  <p className="text-[14px] leading-relaxed text-fg-3">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[32px] md:text-[42px] leading-tight tracking-[-0.03em] text-fg-1 mb-4">Why it matters</h2>
            <ul className="space-y-4 text-[15px] leading-relaxed text-fg-3">
              <li><strong className="text-fg-1">Real estate becomes interactive.</strong> Buyers can walk through a realistic apartment instead of swiping flat photos.</li>
              <li><strong className="text-fg-1">Interior design gets faster.</strong> A room can become the canvas for staging, renovation options and furniture experiments.</li>
              <li><strong className="text-fg-1">Education can happen inside the space.</strong> A kitchen, workshop or apartment can become a contextual learning environment.</li>
              <li><strong className="text-fg-1">Personal memory changes format.</strong> Photos stop being flat archives and become explorable places.</li>
              <li><strong className="text-fg-1">AI agents gain spatial context.</strong> Once the room is structured, assistants can reason about furniture, layout, safety, lighting and tasks.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[32px] md:text-[42px] leading-tight tracking-[-0.03em] text-fg-1 mb-4">What to test</h2>
            <ol className="space-y-4 text-[15px] leading-relaxed text-fg-3 list-decimal pl-5">
              <li>Capture one room from multiple angles in consistent light.</li>
              <li>Try both a single-image tool and a video/360-capture workflow.</li>
              <li>Check whether the output is only beautiful or actually navigable.</li>
              <li>Look for export formats: GLB, mesh, point cloud, web viewer, VR viewer, or embeddable scene.</li>
              <li>Test a practical task: apartment staging, renovation planning, memory archive, training scene, or sales demo.</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[32px] md:text-[42px] leading-tight tracking-[-0.03em] text-fg-1 mb-4">Current limits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                ["Geometry errors", "Flat images can hallucinate depth, door positions, mirrors and object backs."],
                ["Capture discipline", "The best results still need good lighting, overlap and smooth movement."],
                ["Privacy", "Uploading your apartment can expose personal possessions, documents and layout."],
                ["Professional use", "Real estate and education need accuracy disclaimers, rights management and secure hosting."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-fg-4 mb-3">{title}</p>
                  <p className="text-[14px] leading-relaxed text-fg-3">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-serif text-[32px] md:text-[42px] leading-tight tracking-[-0.03em] text-fg-1 mb-4">Sources and reference links</h2>
            <div className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden">
              {sources.map((source) => (
                <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer" className="block p-4 hover:bg-white/[0.035] transition-colors">
                  <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-violet-bright mb-1">{source.label}</p>
                  <p className="text-[13px] leading-relaxed text-fg-3">{source.note}</p>
                </a>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
