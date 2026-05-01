import type { Project } from "@/content/site";

export function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col border-t border-sage-hair">
      {projects.map((p) => (
        <ProjectRow key={p.slug} project={p} />
      ))}
    </div>
  );
}

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid grid-cols-[1fr] gap-3 border-b border-sage-hair py-8 md:grid-cols-[90px_1fr_auto] md:items-baseline md:gap-8">
      <div className="font-mono text-[12px] font-medium uppercase tracking-[0.04em] text-sage-mid">
        {project.year}
      </div>
      <div>
        <h3 className="m-0 mb-2.5 font-serif text-[24px] font-medium leading-[1.2] tracking-[-0.015em] text-[#0a0a0a]">
          {project.title}
        </h3>
        <p
          className="m-0 mb-3 max-w-[580px] text-[15px] leading-[1.6] text-ink-3"
          style={{ textWrap: "pretty" }}
        >
          {project.blurb}
        </p>
        <div className="flex flex-wrap gap-x-3.5 gap-y-1 font-mono text-[11px] tracking-[0.04em] text-ink-muted">
          {project.stack.slice(0, 5).map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start gap-1.5 font-mono text-[12px] md:items-end">
        {project.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-medium text-sage-deep transition-colors hover:text-sage-bright"
          >
            {l.label} →
          </a>
        ))}
      </div>
    </article>
  );
}
