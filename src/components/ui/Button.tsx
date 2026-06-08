import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark" | "quiet";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
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

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled
}: ButtonProps) {
  const classes = cn(
    "focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-[4px] border px-5 text-xs font-bold uppercase tracking-[0.08em] transition duration-300 active:translate-y-px",
    variants[variant],
    disabled && "cursor-not-allowed opacity-60 active:translate-y-0",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        <span>{children}</span>
        <ArrowRight size={16} weight="bold" />
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled}>
      <span>{children}</span>
      <ArrowRight size={16} weight="bold" />
    </button>
  );
}
