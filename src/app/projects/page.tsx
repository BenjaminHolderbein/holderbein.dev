import { site } from "@/content/site";
import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ProjectList } from "@/components/ProjectRow";

export const metadata = {
  title: `Projects — ${site.name}`,
  description: "Things I've built.",
};

export default function ProjectsPage() {
  return (
    <PageShell active="projects">
      <Hero
        tag="/projects"
        titleTop="Things I've"
        titleBottom="built"
        blurb="Each project is its own repo and its own deploy. Some are live, some are works in progress, all of them taught me something."
      />
      <Section>
        <ProjectList projects={site.projects} />
      </Section>
    </PageShell>
  );
}
