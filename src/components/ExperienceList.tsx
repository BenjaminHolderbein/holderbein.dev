import type { ExperienceEntry } from "@/content/site";

export function ExperienceList({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="grid max-w-[880px] grid-cols-1 gap-x-8 md:grid-cols-[120px_1fr_1fr]">
      {entries.map((e, i) => {
        const last = i === entries.length - 1;
        const cellBase = `border-t border-sage-hair py-6 text-[15px] leading-[1.5] text-ink-2 ${
          last ? "md:border-b" : ""
        }`;
        return (
          <div key={i} className="contents">
            <div
              className={`${cellBase} font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-sage-mid`}
            >
              {e.yearRange}
            </div>
            <div className={cellBase}>
              <h4 className="m-0 mb-1 font-serif text-[17px] font-medium text-[#0a0a0a]">
                {e.role}
              </h4>
              <div className="font-mono text-[12px] text-ink-muted">
                {e.org} · {e.where}
              </div>
            </div>
            <div className={cellBase}>{e.blurb}</div>
          </div>
        );
      })}
    </div>
  );
}
