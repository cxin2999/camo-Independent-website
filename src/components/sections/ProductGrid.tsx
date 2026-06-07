import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { products } from "@/content/products";
import { MaterialImage } from "@/components/ui/MaterialImage";

export function ProductGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => (
        <Link
          key={product.slug}
          href={`/products/${product.slug}`}
          className="stagger-in group border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:border-[var(--olive)]"
          style={{ "--i": index } as React.CSSProperties}
        >
          <MaterialImage
            src={product.image}
            alt={product.name}
            className="aspect-[4/3]"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--olive)]">
                {product.category}
              </span>
              <span className="rounded-[3px] border border-[var(--border)] px-2 py-1 text-[11px] uppercase tracking-[0.08em]">
                Customizable
              </span>
            </div>
            <h3 className="text-xl font-semibold tracking-[-0.02em]">{product.name}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{product.shortDescription}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[var(--charcoal)]">
              View Details <ArrowRight size={15} weight="bold" className="transition group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
