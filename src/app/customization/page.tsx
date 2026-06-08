import type { Metadata } from "next";
import { Package, Palette, Ruler, Scissors, Stack, StackSimple, Sticker, Swatches, Truck } from "@phosphor-icons/react/dist/ssr";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Custom Camouflage Loop Fabric",
  description:
    "Customize camouflage hook and loop fabric pattern, color, width, thickness, backing, adhesive, lamination, cutting, and packaging."
};

const options = [
  { name: "Pattern", text: "Custom camouflage artwork or terrain direction.", icon: Swatches },
  { name: "Color", text: "Color matching for gear fabric and buyer samples.", icon: Palette },
  { name: "Width", text: "Roll width and cut-to-size requirements.", icon: Ruler },
  { name: "Thickness", text: "Material structure based on application.", icon: Stack },
  { name: "Backing", text: "Plain, adhesive, laminated, or custom backing.", icon: StackSimple },
  { name: "Adhesive", text: "Adhesive-backed options for conversion use.", icon: Sticker },
  { name: "Lamination", text: "Fabric, foam, non-woven, or layered backing.", icon: Package },
  { name: "Cutting", text: "Sheet, strip, roll, or project-specific cutting.", icon: Scissors },
  { name: "Packaging", text: "Roll packing, labels, carton, and shipment support.", icon: Truck }
];

const process = [
  "Send requirement or sample",
  "Confirm pattern, color, size and backing",
  "Make sample",
  "Customer approves sample",
  "Bulk production",
  "Quality inspection and shipment"
];

export default function CustomizationPage() {
  return (
    <>
      <section className="dark-texture text-white">
        <Container className="py-16 lg:py-24">
          <p className="mono mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#cfe99f]">
            Customization
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
            Custom pattern, backing, lamination, size, and packaging for OEM material supply.
          </h1>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <SectionHeader
            eyebrow="Custom options"
            title="Control the material details that matter to production."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {options.map((option) => {
              const Icon = option.icon;
              return (
                <div key={option.name} className="border border-[var(--border)] bg-[var(--background)] p-5">
                  <Icon size={28} className="mb-5 text-[var(--olive)]" />
                  <h3 className="text-xl font-semibold">{option.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{option.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container>
          <SectionHeader eyebrow="Process" title="A straightforward sample-to-bulk workflow." />
          <div className="mt-10 grid gap-4 lg:grid-cols-6">
            {process.map((step, index) => (
              <div key={step} className="border border-[var(--border)] bg-[var(--surface)] p-4">
                <span className="mono text-2xl font-semibold text-[var(--olive)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 text-sm font-semibold leading-6">{step}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Custom inquiry"
            title="Share your pattern, size, backing and quantity requirements."
            description="We will suggest suitable material options and sample details."
          />
          <InquiryForm sourcePage="Customization" title="Custom Material Inquiry" />
        </Container>
      </section>
    </>
  );
}
