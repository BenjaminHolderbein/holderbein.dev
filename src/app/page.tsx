import { site } from "@/content/site";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Section, SectionHead, SectionTitle, Para } from "@/components/Section";
import { NowList } from "@/components/NowList";
import { ProjectList } from "@/components/ProjectRow";
import { ExperienceList } from "@/components/ExperienceList";

export default function Home() {
  return (
    <PageShell active="home">
      <Hero
        tag="Available · May 2026"
        titleTop="Benjamin"
        titleBottom="Holderbein"
        blurb={site.bioShort}
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
        <ProjectList projects={site.projects} />
      </Section>

      <Section>
        <SectionHead num="04" label="Experience" />
        <ExperienceList entries={site.experience} />
      </Section>
    </PageShell>
  );
}
