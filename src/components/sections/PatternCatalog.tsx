import Image from "next/image";
import Link from "next/link";
import { patterns } from "@/content/patterns";

export function PatternCatalog() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {patterns.map((pattern) => (
        <Link
          key={pattern.name}
          href="/customization"
          className="group border border-[var(--border)] bg-[var(--surface)] p-2 transition hover:border-[var(--olive)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image src={pattern.image} alt={`${pattern.name} camouflage pattern`} fill sizes="20vw" className="object-cover" />
          </div>
          <div className="p-3">
            <p className="font-semibold">{pattern.name}</p>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{pattern.terrain}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
