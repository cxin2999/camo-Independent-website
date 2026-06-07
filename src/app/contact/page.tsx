import type { Metadata } from "next";
import { Clock, EnvelopeSimple, MapPin, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact and Material Inquiry",
  description:
    "Send camouflage hook and loop fabric requirements for product quotation, custom pattern, backing, width, thickness, quantity, and sample details."
};

const contactCards = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: EnvelopeSimple },
  { label: "WhatsApp", value: site.whatsapp, href: `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`, icon: WhatsappLogo },
  { label: "Phone", value: site.phone, href: `tel:${site.phone}`, icon: Phone },
  { label: "Address", value: site.address, href: null, icon: MapPin },
  { label: "Business Hours", value: "Mon-Fri, 09:00-18:00 China Time", href: null, icon: Clock }
];

export default function ContactPage() {
  return (
    <>
      <section className="dark-texture text-white">
        <Container className="py-16 lg:py-24">
          <p className="mono mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#cfe99f]">
            Contact
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-6xl">
            Send your camouflage fabric requirements.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
            Share product type, pattern, backing, width, thickness, quantity, and application. We
            will reply with suitable material options and quotation details.
          </p>
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <div className="h-full border border-[var(--border)] bg-[var(--background)] p-5 transition hover:border-[var(--olive)]">
                  <Icon size={26} className="mb-5 text-[var(--olive)]" />
                  <p className="mono text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    {card.label}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-6">{card.value}</p>
                </div>
              );

              return card.href ? (
                <a key={card.label} href={card.href}>
                  {content}
                </a>
              ) : (
                <div key={card.label}>{content}</div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeader
            eyebrow="Full inquiry form"
            title="Tell us enough to recommend the right material."
            description="Reference image upload is not enabled in phase one. Please send sample photos by email after submitting the form."
          />
          <InquiryForm sourcePage="Contact" title="Material Inquiry Form" />
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions before quotation."
            description="These answers keep the material-supplier positioning clear."
          />
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="border border-[var(--border)] bg-[var(--background)] p-5">
                <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
