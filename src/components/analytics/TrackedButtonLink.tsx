"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { AnalyticsParams } from "@/lib/analytics";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type TrackedButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "quiet";
  className?: string;
  trackingEvent?: string;
  trackingParams?: AnalyticsParams;
};

const variants = {
  primary:
    "bg-[var(--olive)] text-white border-[var(--olive)] hover:bg-[var(--orange)] hover:border-[var(--orange)]",
  secondary:
    "bg-transparent text-[var(--charcoal)] border-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white",
  dark:
    "bg-[var(--charcoal)] text-white border-[var(--charcoal)] hover:bg-[var(--olive-dark)] hover:border-[var(--olive-dark)]",
  quiet:
    "bg-white/5 text-white border-white/35 hover:bg-white hover:text-[var(--charcoal)]"
};

export function TrackedButtonLink({
  href,
  children,
  variant = "primary",
  className,
  trackingEvent,
  trackingParams
}: TrackedButtonLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        if (trackingEvent) {
          trackEvent(trackingEvent, trackingParams);
        }
      }}
      className={cn(
        "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border px-5 text-xs font-bold uppercase tracking-[0.08em] transition duration-300 active:translate-y-px",
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight size={16} weight="bold" />
    </Link>
  );
}
