export function SectionHead({
  num,
  label,
  accent,
}: {
  num: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="mb-7 flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-sage-mid">
      <span className="font-medium text-sage-bright">{num}</span>
      <span>{label}</span>
      <span className="h-px max-w-20 flex-1 bg-sage-hair" />
      {accent ? <span>{accent}</span> : null}
    </div>
  );
}

export function Section({ children }: { children: React.ReactNode }) {
  return <section className="relative mb-28">{children}</section>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="m-0 mb-9 max-w-[760px] font-serif text-[34px] font-normal leading-[1.05] tracking-[-0.02em] text-[#0a0a0a] md:text-[44px]"
      style={{ textWrap: "pretty" }}
    >
      {children}
    </h2>
  );
}

export function Para({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-5 max-w-[640px] text-[17px] leading-[1.75] text-ink-2"
      style={{ textWrap: "pretty" }}
    >
      {children}
    </p>
  );
}
