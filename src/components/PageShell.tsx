import Link from "next/link";
import { site } from "@/content/site";

const monoLabel =
  "font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-faint)]";

export function PageShell({
  active,
  children,
}: {
  active: "home" | "projects" | "resume";
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-paper text-ink">
      {/* Filtered green skylight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[720px]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.97 calc(var(--sage-c) * 0.25) var(--sage-h) / 0.55) 0%, oklch(0.99 calc(var(--sage-c) * 0.12) var(--sage-h) / 0.25) 35%, transparent 100%)",
        }}
      />

      {/* Spine hairline running down the left margin */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[7.25rem] top-[240px] bottom-[200px] z-[2] hidden w-px md:block"
        style={{
          background:
            "linear-gradient(180deg, var(--sage-hair) 0%, var(--sage-hair) 35%, oklch(0.94 calc(var(--sage-c) * 0.25) var(--sage-h)) 70%, transparent 100%)",
        }}
      />

      {/* Vertical margin label */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[6.25rem] top-[200px] z-[3] hidden origin-top-left -rotate-90 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.32em] text-sage-mid md:block"
      >
        Holderbein · est. 2026
      </div>

      <div className="relative z-[2] mx-auto min-h-screen w-full max-w-[1100px] px-6 pb-40 pt-20 md:px-20 md:pl-[200px] md:pt-22">
        <Topbar active={active} />
        {children}
        <Footer />
      </div>
    </div>
  );
}

function Topbar({ active }: { active: "home" | "projects" | "resume" }) {
  const items: Array<{
    href: string;
    label: string;
    key: "home" | "projects" | "resume";
    external?: boolean;
  }> = [
    { href: "/", label: "Home", key: "home" },
    { href: "/projects", label: "Projects", key: "projects" },
    { href: "/resume.pdf", label: "Resume", key: "resume", external: true },
  ];

  return (
    <div className="mb-24 flex items-center justify-between">
      <Link
        href="/"
        className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink"
      >
        {site.domain}
      </Link>
      <nav className="flex gap-7">
        {items.map((item) =>
          item.external ? (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${monoLabel} transition-colors hover:text-ink ${
                active === item.key ? "!text-ink" : ""
              }`}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.key}
              href={item.href}
              className={`${monoLabel} transition-colors hover:text-ink ${
                active === item.key ? "!text-ink" : ""
              }`}
            >
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-20 flex flex-wrap justify-between gap-4 border-t border-sage-hair pt-8 font-mono text-[11px] uppercase tracking-[0.10em] text-ink-faint">
      <span>© 2026 {site.name}</span>
      <span>
        <span className="text-sage-mid">San Francisco</span> · May 2026
      </span>
    </footer>
  );
}
