import type { ExperienceEntry } from "@/content/site";

export function ExperienceList({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div className="max-w-[880px] md:grid md:grid-cols-[120px_1fr_1fr] md:gap-x-8">
      {entries.map((e, i) => {
        const last = i === entries.length - 1;
        const mdCell = `md:border-t md:border-sage-hair md:py-6 ${
          last ? "md:border-b" : ""
        }`;
        return (
          <div
            key={i}
            className={`border-t border-sage-hair py-5 text-[15px] leading-[1.5] text-ink-2 md:contents ${
              last ? "border-b md:border-b-0" : ""
            }`}
          >
            <div
              className={`mb-2 font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-sage-mid md:mb-0 ${mdCell}`}
            >
              {e.yearRange}
            </div>
            <div className={`mb-3 md:mb-0 ${mdCell}`}>
              <h4 className="m-0 mb-1 font-serif text-[18px] font-medium text-[#0a0a0a] md:text-[17px]">
                {e.role}
              </h4>
              <div className="font-mono text-[12px] text-ink-muted">
                {e.org} · {e.where}
              </div>
            </div>
            <div className={mdCell}>{e.blurb}</div>
          </div>
        );
      })}
    </div>
  );
}
