import Link from "next/link";
import { products } from "@/content/products";
import { applications } from "@/content/applications";
import { navItems, site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="dark-texture border-t border-white/10 text-white">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="/lm-logo-wb.png" alt={site.name} className="h-9 w-auto" />
              <div>
                <p className="font-bold uppercase tracking-[0.08em]">{site.name}</p>
                <p className="text-sm text-white/60">{site.tagline}</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/65">{site.disclaimer}</p>
          </div>

          <FooterGroup title="Products">
            {products.map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`}>
                {product.name}
              </Link>
            ))}
          </FooterGroup>

          <FooterGroup title="Applications">
            {applications.slice(0, 5).map((application) => (
              <Link key={application.slug} href="/applications">
                {application.name}
              </Link>
            ))}
          </FooterGroup>

          <FooterGroup title="Contact">
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={`tel:${site.phone}`}>{site.phone}</a>
            <span>{site.address}</span>
            <Link href="/contact" className="mt-2 font-bold text-[#cfe99f]">
              Quick Inquiry
            </Link>
          </FooterGroup>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mono mb-4 text-xs font-bold uppercase tracking-[0.14em] text-[#cfe99f]">{title}</h3>
      <div className="grid gap-3 text-sm text-white/65 [&_a:hover]:text-white">{children}</div>
    </div>
  );
}
