"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { navItems, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-3 rounded-[4px]">
          <span className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-[var(--charcoal)] text-sm font-black text-white">
            TT
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold uppercase tracking-[0.08em]">{site.shortName}</span>
            <span className="hidden text-xs text-[var(--muted)] sm:block">{site.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-[4px] text-sm font-medium text-[var(--muted)] transition hover:text-[var(--charcoal)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a className="mono text-xs text-[var(--muted)] hover:text-[var(--charcoal)]" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <Link
            href="/contact"
            className="focus-ring rounded-[4px] bg-[var(--olive)] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[var(--orange)] active:translate-y-px"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[var(--border)] bg-white lg:hidden"
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-[var(--border)] bg-[var(--surface)] lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="grid px-4 py-4" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--border)] py-4 text-base font-semibold"
            >
              {item.label}
            </Link>
          ))}
          <div className="grid gap-3 pt-5">
            <a className="mono text-sm text-[var(--muted)]" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-[4px] bg-[var(--olive)] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-white"
            >
              Request a Quote
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
