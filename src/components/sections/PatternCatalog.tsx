import Image from "next/image";
import Link from "next/link";
import { militaryPatternNotice, militaryPatterns } from "@/content/military-patterns";
import { patterns } from "@/content/patterns";
import {Button} from "@/components/ui/Button";

type PatternCatalogProps = {
  includeMilitaryPatterns?: boolean;
};

export function PatternCatalog({ includeMilitaryPatterns = false }: PatternCatalogProps) {
  return (
    <div className="grid gap-8">
      {includeMilitaryPatterns ? (
        <div>
          <div className="mb-5 flex flex-col gap-3 border-[var(--border)] pt-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mono text-xs font-bold uppercase tracking-[0.14em] text-[var(--olive)]">
                Military camouflage types
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em]">
                Reference patterns for buyer-specified camo materials.
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
              These pattern types help buyers describe color family, terrain, and repeat style when
              requesting custom loop fabric.
            </p>
              <Button href="/customization" variant="secondary">
                  Start Customization
              </Button>
          </div>
          <div className="mb-5 border border-[var(--border)] bg-[#eef7df] p-4 text-sm leading-6 text-[var(--olive-dark)]">
            {militaryPatternNotice}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {militaryPatterns.map((pattern) => (
              <Link
                key={pattern.slug}
                href="/contact"
                className="group border border-[var(--border)] bg-[var(--surface)] p-2 transition hover:border-[var(--olive)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface-muted)]">
                  <Image
                    src={pattern.image}
                    alt={`${pattern.name} camouflage reference pattern`}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold">{pattern.name}</p>
                    <span className="mono shrink-0 text-[10px] uppercase tracking-[0.12em] text-[var(--olive)]">
                      {pattern.origin}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{pattern.environment}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
