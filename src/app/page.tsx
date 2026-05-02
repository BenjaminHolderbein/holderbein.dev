import Link from "next/link";
import { site } from "@/content/site";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Section, SectionHead, SectionTitle, Para } from "@/components/Section";
import { NowList } from "@/components/NowList";
import { ProjectList } from "@/components/ProjectRow";
import { ExperienceList } from "@/components/ExperienceList";
import { EducationList } from "@/components/EducationList";
import { ContactList } from "@/components/ContactList";

const FEATURED_PROJECT_COUNT = 4;

export default function Home() {
  const featured = site.projects.slice(0, FEATURED_PROJECT_COUNT);
  const moreCount = site.projects.length - featured.length;

  return (
    <PageShell active="home">
      <Hero
        tag={`Available · ${site.availability}`}
        titleTop="Benjamin"
        titleBottom="Holderbein"
        blurb={site.bioShort}
        portrait={{ src: "/headshot.jpg", alt: "Benjamin Holderbein" }}
      />

      <Section>
        <SectionHead num="01" label="About" />
        <SectionTitle>
          AI engineer with a research bent and{" "}
          <span className="italic text-sage-mid">a builder&rsquo;s instinct.</span>
        </SectionTitle>
        {site.bioLong.map((p, i) => (
          <Para key={i}>{p}</Para>
        ))}
      </Section>

      <Section>
        <SectionHead num="02" label="Now" accent="May 2026" />
        <NowList items={site.now} />
      </Section>

      <Section>
        <SectionHead
          num="03"
          label="Selected work"
          accent={`${site.projects.length} projects`}
        />
        <ProjectList projects={featured} />
        {moreCount > 0 && (
          <div className="mt-6 font-mono text-[12px] uppercase tracking-[0.12em] text-sage-mid">
            <Link
              href="/projects"
              className="transition-colors hover:text-sage-bright"
            >
              View all {site.projects.length} projects →
            </Link>
          </div>
        )}
      </Section>

      <Section>
        <SectionHead num="04" label="Experience" />
        <ExperienceList entries={site.experience} />
      </Section>

      <Section>
        <SectionHead num="05" label="Education" />
        <EducationList entries={site.education} />
      </Section>

      <Section>
        <SectionHead num="06" label="Contact" accent="Say hello" />
        <ContactList links={site.links} />
      </Section>
    </PageShell>
  );
}
