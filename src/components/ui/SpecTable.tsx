type SpecTableProps = {
  rows: { label: string; value: string }[];
};

export function SpecTable({ rows }: SpecTableProps) {
  return (
    <div className="overflow-hidden border border-[var(--border)] bg-[var(--surface)]">
      <div className="grid grid-cols-1 divide-y divide-[var(--border)] md:grid-cols-2 md:divide-x md:divide-y-0">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[150px_1fr] divide-x divide-[var(--border)]">
            <div className="bg-[var(--surface-muted)] px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--charcoal)]">
              {row.label}
            </div>
            <div className="mono px-4 py-3 text-sm text-[var(--muted)]">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
