import type { Link as SiteLink } from "@/content/site";

export function ContactList({ links }: { links: SiteLink[] }) {
  return (
    <ul className="m-0 max-w-[640px] list-none p-0">
      {links.map((l, i) => {
        const last = i === links.length - 1;
        const external = l.href.startsWith("http");
        return (
          <li
            key={l.label}
            className={`grid grid-cols-1 gap-1.5 border-t border-sage-hair py-5 sm:grid-cols-[120px_1fr] sm:items-baseline sm:gap-5 ${
              last ? "border-b" : ""
            }`}
          >
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-sage-mid">
              {l.label}
            </span>
            <a
              href={l.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="break-all font-mono text-[14px] text-sage-deep transition-colors hover:text-sage-bright"
            >
              {l.display ?? l.href} →
            </a>
          </li>
        );
      })}
    </ul>
  );
}
