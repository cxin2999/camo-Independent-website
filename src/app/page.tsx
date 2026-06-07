import Image from "next/image";
import { CheckCircle, Factory, Package, Ruler, Scissors, ShieldCheck, Swatches } from "@phosphor-icons/react/dist/ssr";
import { ApplicationCards } from "@/components/sections/ApplicationCards";
import { PatternCatalog } from "@/components/sections/PatternCatalog";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaterialImage } from "@/components/ui/MaterialImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { factoryStats } from "@/content/factory";
import { site, trustPoints } from "@/content/site";

const highlights = [
  { title: "Multiple Camouflage Patterns", text: "Woodland, desert, digital, snow, jungle, and custom pattern development.", icon: Swatches },
  { title: "Custom Colors and Sizes", text: "Support for width, thickness, color, roll length, and packaging requirements.", icon: Ruler },
  { title: "Soft Felt Surface", text: "Loop surface designed for hook compatibility and textile processing.", icon: ShieldCheck },
  { title: "Roll Material Supply", text: "Bulk material supply for OEM factories and long-term purchasing programs.", icon: Package },
  { title: "Cutting and Sewing Ready", text: "Suitable for cutting, sewing, heat cutting, die cutting, and patch conversion.", icon: Scissors },
  { title: "Factory Support", text: "Production, lamination, backing, inspection, packing, and shipment coordination.", icon: Factory }
];

const process = [
  "Send requirement or sample",
  "Confirm pattern, size and backing",
  "Make sample",
  "Approve sample",
  "Bulk production",
  "Inspection and shipment"
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100dvh-4rem)] overflow-hidden bg-[var(--charcoal)] text-white">
        <Image
          src="/images/products/camo-loop-fabric-roll.png"
          alt="Camouflage felt hook and loop fabric roll material"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--charcoal)] via-[var(--charcoal)]/78 to-[var(--charcoal)]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-transparent to-transparent" />
        <Container className="relative flex min-h-[calc(100dvh-4rem)] items-end pb-12 pt-24 lg:pb-20">
          <div className="max-w-3xl">
            <p className="mono mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#cfe99f]">
              {site.tagline}
            </p>
            <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              Camouflage Felt Hook and Loop Fabric Manufacturer
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              Custom camo loop fabric material for tactical gear, patches, uniforms, helmet covers,
              backpacks, and outdoor equipment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Request a Quote</Button>
              <Button href="/products" variant="quiet">
                View Products
              </Button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <div key={point} className="border border-white/18 bg-white/8 p-4 backdrop-blur-sm">
                  <CheckCircle size={20} className="mb-3 text-[#cfe99f]" />
                  <p className="text-sm font-semibold">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <SectionHeader
            eyebrow="Product strengths"
            title="Built around material clarity, specification, and factory supply."
            description="The site is designed for procurement buyers who need to understand material options quickly before sending requirements."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="stagger-in border border-[var(--border)] bg-[var(--surface)] p-5"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <Icon size={28} className="mb-5 text-[var(--olive)]" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Pattern catalog"
              title="Camouflage samples shown as material swatches."
              description="Use these common directions as a starting point. Custom pattern, color, and repeat can be discussed for OEM projects."
            />
            <Button href="/customization" variant="secondary">
              Start Customization
            </Button>
          </div>
          <PatternCatalog />
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Product categories"
              title="Roll, adhesive backed, laminated, and custom camo loop fabric."
              description="Each product route keeps specification and inquiry actions close, following the Stitch product-center prototype."
            />
            <Button href="/products" variant="secondary">
              View All Products
            </Button>
          </div>
          <ProductGrid />
        </Container>
      </section>

      <section className="page-section dark-texture">
        <Container>
          <SectionHeader
            eyebrow="Industry applications"
            title="Reference applications for tactical and outdoor material buyers."
            description={site.disclaimer}
            light
          />
          <div className="mt-10">
            <ApplicationCards />
          </div>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <MaterialImage
              src="/images/factory/production-workshop.png"
              alt="Factory workshop for camouflage hook and loop fabric production"
              className="aspect-[4/3] border border-[var(--border)]"
            />
            <div>
              <SectionHeader
                eyebrow="Factory capability"
                title="Production, backing, lamination, inspection, and shipment in one factory route."
                description="Factory data is marked as placeholder until replaced with confirmed production numbers."
              />
              <div className="mt-8 grid grid-cols-2 gap-3">
                {factoryStats.map((stat) => (
                  <div key={stat.label} className="border border-[var(--border)] bg-[var(--background)] p-4">
                    <p className="mono text-2xl font-semibold tracking-[-0.03em]">{stat.value}</p>
                    <p className="mt-2 text-sm font-semibold">{stat.label}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">{stat.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeader
                eyebrow="Custom process"
                title="From requirement to inspected shipment."
                description="A concise OEM process helps buyers understand what to send and what will happen next."
              />
              <div className="mt-8 grid gap-3">
                {process.map((step, index) => (
                  <div key={step} className="flex gap-4 border border-[var(--border)] bg-[var(--surface)] p-4">
                    <span className="mono flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--charcoal)] text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="font-semibold">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <InquiryForm compact sourcePage="Home" title="Send Your Camo Fabric Requirements" />
          </div>
        </Container>
      </section>
    </>
  );
}
