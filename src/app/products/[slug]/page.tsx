import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackedButtonLink } from "@/components/analytics/TrackedButtonLink";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MaterialImage } from "@/components/ui/MaterialImage";
import { SpecTable } from "@/components/ui/SpecTable";
import { getProduct, products } from "@/content/products";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <section className="bg-[var(--surface)]">
        <Container className="grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div className="grid gap-4">
            <MaterialImage
              src={product.image}
              alt={product.name}
              className="aspect-[16/11] border border-[var(--border)]"
              priority
            />
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((image) => (
                <MaterialImage key={image} src={image} alt={`${product.name} gallery image`} className="aspect-[4/3] border border-[var(--border)]" />
              ))}
            </div>
          </div>
          <div>
            <p className="mono mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--olive)]">
              {product.category}
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{product.shortDescription}</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {product.features.map((feature) => (
                <span key={feature} className="border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm font-semibold">
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedButtonLink
                href="/contact"
                trackingEvent="quote_click"
                trackingParams={{ location: "product_detail", product_name: product.name }}
              >
                Request Quote
              </TrackedButtonLink>
              <Button href="/products" variant="secondary">
                Back to Products
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container>
          <h2 className="mb-8 text-3xl font-semibold tracking-[-0.02em]">Specifications</h2>
          <SpecTable rows={product.specifications} />
        </Container>
      </section>

      <section className="page-section bg-[var(--surface)]">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Applications</h2>
            <div className="mt-6 grid gap-3">
              {product.applications.map((item) => (
                <div key={item} className="border border-[var(--border)] bg-[var(--background)] p-4 font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Custom Options</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {product.customOptions.map((item) => (
                <div key={item} className="border border-[var(--border)] bg-[var(--background)] p-4 font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="page-section surface-grid">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mono mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--olive)]">
              Product inquiry
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.02em]">Ask for sample and quotation details.</h2>
            <p className="mt-4 text-[var(--muted)]">
              Send pattern, size, backing, and quantity requirements. Reference images can be shared by email.
            </p>
          </div>
          <InquiryForm sourcePage={`Product: ${product.name}`} title={`Inquiry for ${product.name}`} />
        </Container>
      </section>
    </>
  );
}
