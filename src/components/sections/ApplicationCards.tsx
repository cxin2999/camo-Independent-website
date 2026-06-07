import Image from "next/image";
import Link from "next/link";
import { applications } from "@/content/applications";

export function ApplicationCards() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
      {applications.map((application, index) => (
        <Link
          key={application.slug}
          href="/applications"
          className={
            index === 0
              ? "group relative min-h-[420px] overflow-hidden border border-white/10 bg-[var(--charcoal)] lg:row-span-2"
              : "group relative min-h-[250px] overflow-hidden border border-white/10 bg-[var(--charcoal)]"
          }
        >
          <Image src={application.image} alt={application.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-72 transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)] via-[var(--charcoal)]/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="mono mb-2 text-xs uppercase tracking-[0.14em] text-[#cfe99f]">Application</p>
            <h3 className="text-2xl font-semibold tracking-[-0.02em]">{application.name}</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/72">{application.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
