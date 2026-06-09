import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  light
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mono mb-3 text-sm font-semibold uppercase tracking-[0.14em]",
            light ? "text-[#cfe99f]" : "text-[var(--olive)]"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold leading-tight tracking-[-0.02em] sm:text-4xl",
          light ? "text-white" : "text-[var(--charcoal)]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-7", light ? "text-white/70" : "text-[var(--muted)]")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
