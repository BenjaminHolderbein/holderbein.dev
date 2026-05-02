# Personal Site in a Day — Build Recipe

A practical path from "nothing" to a deployed personal site at your own domain,
optimized for being driven by a coding agent (Claude Code, Cursor, etc.) with you
in the loop. Roughly 6–8 hours of focused work.

The recipe assumes you'll feed sections of this file to your agent as you go.
Each phase has an "agent prompt" block — that's the literal text to paste.

## Inputs you need before you start

Have these ready, on disk, in absolute paths your agent can read:

- **Your resume** as a PDF. This is the single most important input: it's where
  bios, role descriptions, dates, project titles, and accomplishments come from.
  If your resume is in LaTeX or Markdown, that's even better — the agent can
  cross-check claims with the source.
- **A headshot** (or willingness to do without one). 4:5 aspect, ~600px wide is plenty.
- **One sentence describing the visual direction** ("clean editorial serif, sage
  accent, Atrium-magazine vibe", "brutalist mono, monochrome", etc.).
- **A registered domain.** Buy it on Porkbun, Cloudflare, Namecheap — doesn't matter.
  Make sure DNS is at the registrar (you'll add records there).

## Stack (skip the bikeshed)

- **Framework:** Next.js (App Router) + TypeScript + Tailwind v4
- **Hosting:** Vercel (free tier, GitHub auto-deploy)
- **Domain DNS:** wherever you bought the domain
- **Auth/DB/CMS:** none — content is a single typed `site.ts` file. Simpler than
  it sounds and faster than any CMS for a one-person site.

If you want a different stack, that's fine, but every step below assumes this one.

## Phase 1 — Design with Claude Design (45–90 min)

[Claude Design](https://claude.ai/design) is an Anthropic Labs product that takes
a written description and produces an interactive HTML mockup, refining through
conversation. When the design is locked, it exports a **handoff bundle** — a
folder of HTML/CSS/assets — that you feed to Claude Code in the next phase.

1. Open Claude Design (claude.ai → Design, or claude.ai/design directly).
2. Tell it what you want, plainly. Example prompt:
   > "Personal site for an AI engineer. Single-page landing with sections: about,
   > what I'm doing now, selected work, experience, education, contact.
   > Editorial serif headlines (Fraunces), tight monospace labels (JetBrains
   > Mono), sage green accent, generous whitespace, Atrium-magazine feel.
   > Light only. Hairline rules between rows."
3. Iterate visually. Comment, redirect, ask it to try variants. Stop when the
   landing page hero + a representative content section both look right.
4. **Export the handoff bundle.** Save it to a `claude_design/` folder at the
   root of your project directory. Add `claude_design/` to `.gitignore` — it's
   reference material for the agent, not source code.

**Pitfall:** don't try to design every section in detail. Get the hero and one
content section locked, then trust your coding agent to apply the visual
language to the rest.

## Phase 2 — Scaffold the site with Claude Code (2–3 hr)

Now you hand off to a coding agent. Open a fresh Claude Code session **in an
empty directory**.

### Agent prompt — initial scaffold

```
Build me a personal website. Decisions are locked:

- Next.js (App Router) + TypeScript + Tailwind v4 + ESLint
- Single-page landing with these sections in order:
    01 About — short bio + longer paragraph
    02 Now — 3-item bulleted list of what I'm currently doing
    03 Selected work — featured projects (render top 4 here, link to /projects)
    04 Experience — reverse-chronological work history
    05 Education — degrees with dates and GPA
    06 Contact — email, GitHub, LinkedIn, resume
- Light theme only, sage accent
- All site content lives in src/content/site.ts as a single typed object
- Visual direction is in claude_design/ (use it as reference for typography,
  spacing, colors, accent placement, and section rhythm)

# Inputs in this directory
- claude_design/ — design handoff bundle from Claude Design (read it first)
- /Users/<me>/.../resume.pdf — pull bios, role descriptions, dates, project
  titles, and accomplishments from this; do not invent claims that aren't
  in the resume
- /Users/<me>/.../headshot.jpg — copy to public/headshot.jpg, render in hero

# Steps
1. Read claude_design/ end-to-end. Note the typography, color tokens,
   spacing rules, and the structure of the hero + content sections.
2. Read resume.pdf. Extract: full name, role title, location, one-line
   bio, longer bio (2–3 paragraphs), now items, all experience entries
   with dates and bullets, all education entries.
3. Run `npx create-next-app@latest . --typescript --tailwind --app --eslint
   --src-dir --import-alias "@/*" --no-turbopack`. Pin Node in .nvmrc.
4. Build src/content/site.ts as the single source of truth (typed
   exports for Site, Project, ExperienceEntry, EducationEntry).
5. Build components: PageShell, Hero, Section + SectionHead +
   SectionTitle + Para, NowList, ProjectRow + ProjectList,
   ExperienceList, EducationList, ContactList.
6. Wire src/app/page.tsx with all 6 sections.
7. Add a /projects route that lists the same projects with no slicing.
8. Run `npm run dev` and confirm the page renders.
9. `git init`, initial commit, .gitignore claude_design/.

Stop and ask if any input is missing or contradictory. Don't fabricate
content from the resume — quote, condense, or rephrase only.
```

### What you actually do during this phase

- Have the dev server running at `localhost:3000` in a browser tab.
- Review each section as the agent finishes it; redirect early if voice/tone is off.
- Push back hard on filler language. Resumes are concrete; the site should be too.

**Pitfall (Next.js version):** if your training-data Next.js APIs are out of date,
add this to a `CLAUDE.md` or `AGENTS.md` at the repo root and have the agent read it:

```
# This is NOT the Next.js you know
This version has breaking changes — APIs, conventions, and file structure may
all differ from your training data. Read the relevant guide in
node_modules/next/dist/docs/ before writing any code. Heed deprecation notices.
```

## Phase 3 — Deploy to a real domain (45 min)

This is mostly clicking. Drive it yourself; the agent isn't useful here.

1. **GitHub repo.** Create one, push the project.
2. **Vercel.** Go to vercel.com/new, import the repo, accept all defaults, deploy.
   You'll get a `*.vercel.app` URL. Confirm it loads.
3. **Disable Deployment Protection.** Settings → Deployment Protection →
   Vercel Authentication → Disabled. Otherwise production is gated behind SSO
   and 401s for everyone.
4. **Add the domain.** Project → Settings → Domains → add `yourdomain.com`
   (Connect to Production) and `www.yourdomain.com` (Redirect to apex, 308
   permanent). Vercel shows you DNS records.
5. **DNS records at your registrar.** Delete any default parking records.
   Add an `A @` pointing at the IP Vercel showed you, and a `CNAME www`
   pointing at the project-specific `*.vercel-dns-NNN.com` value Vercel showed
   you (don't substitute the generic `cname.vercel-dns.com`).
6. **Verify.** `curl -I https://yourdomain.com` returns 200,
   `curl -I https://www.yourdomain.com` returns 308 → apex.

**Pitfall:** you can't make `www` redirect to apex if the apex is itself
configured to redirect somewhere. If Vercel rejects the `www` redirect, set the
apex to "Connect to Production" first, then come back and configure `www`.

## Phase 4 — Mobile + polish pass (1–2 hr)

Open the site on your actual phone over the internet (not localhost). Things
that look fine on desktop almost always need work on mobile.

### Agent prompt — mobile pass

```
Do a proper mobile pass on the site. iPhone safe-area + sub-400px viewports.
Specifically:

- The page should respect the iOS notch. Set viewport-fit=cover via the
  Next 16 viewport export, then pad the page shell by
  env(safe-area-inset-top) + a base offset on mobile.
- Typography: hero title should fit cleanly at 390px viewport without the
  word "Holderbein"-equivalent overflowing. Step font-size down at sm.
- Topbar shouldn't crowd. If brand + 3 nav items overflow at 390px, hide
  the brand on <sm.
- ContactList: if values are long (email, GitHub URL), stack label above
  value on <sm. break-all on the value to prevent overflow.
- ExperienceList: if you used display:contents with cell-level borders for
  the desktop grid, make sure mobile renders one border per entry, not
  one per cell.
- Tighten vertical rhythm on mobile (mb-32 -> mb-20, pb-40 -> pb-24, etc.).

Test by resizing a real browser to 390x844 and screenshotting full-page.
Verify desktop didn't regress. Commit and push.
```

### Other polish to do in this phase

- **Favicon.** Replace the default. Either drop a 512×512 PNG at `src/app/icon.png`
  or write an `src/app/icon.svg` (browsers don't load custom fonts for SVG
  favicons — fall back to `Georgia` or convert glyphs to `<path>`).
- **OG image.** Generate via `next/og` at `src/app/opengraph-image.tsx`. Static
  TTFs only — Satori chokes on variable fonts. Add `metadataBase`, `openGraph`,
  `twitter` to the root metadata so social previews actually render.
- **Resume.** Drop your latest resume PDF at `public/resume.pdf` and add a
  Resume entry to the contact list with `href: "/resume.pdf"`.
- **Overscroll/skylight.** If you have a top gradient on a white page, the
  overscroll bounce in Safari will reveal whichever color is on `<html>`. Set
  `<html>` background to match the gradient's top color, put the gradient on
  `<body>` so it sizes to the full document. Optionally swap `<html>` color
  near the page bottom via a tiny client component, so the bottom bounce
  reveals paper instead of sage.

## Phase 5 — SEO basics (45 min)

These are file-convention freebies in Next 16 that take ~5 lines each.

1. **robots.ts** at `src/app/robots.ts` — allow all, point at `/sitemap.xml`.
2. **sitemap.ts** at `src/app/sitemap.ts` — list `/` and `/projects`.
3. **Canonical URL** — add `alternates: { canonical: "/" }` to root metadata.
4. **JSON-LD Person schema** — `<script type="application/ld+json">` in the
   root layout body with `@type: "Person"`, name, jobTitle, image, sameAs
   (your GitHub + LinkedIn URLs). This is the strongest signal for
   "Google my name" queries to associate the domain with you.

### Manual steps that matter more than any code

These do more for "show up when someone Googles me" than any meta tag:

- **Google Search Console.** Add the domain (DNS verification — TXT record at
  your registrar). Submit `https://yourdomain.com/sitemap.xml` (full URL — the
  Domain property doesn't pre-fill a prefix). Hit URL Inspection → request
  indexing on the home page. Days, not weeks.
- **Bing Webmaster Tools.** Same drill. Powers DuckDuckGo too.
- **Backlinks from sites Google trusts.** Single biggest lever for ranking on
  a name query. Update LinkedIn → Contact info → Website. Update GitHub
  profile bio + website field. Add to any other social bio you control.

## Day 1 checklist

If you can answer yes to all of these by end of day, you're done:

- [ ] `https://yourdomain.com` returns 200, valid TLS
- [ ] `https://www.yourdomain.com` returns 308 → apex
- [ ] Page looks right on iPhone (notch respected, no horizontal scroll, no
      cramped text, no overflowing email)
- [ ] OG card renders when you paste the URL into Slack or iMessage
- [ ] Resume downloads from a contact-section link
- [ ] `/sitemap.xml` and `/robots.txt` both return 200
- [ ] Google Search Console verified, sitemap submitted, indexing requested
- [ ] LinkedIn website field updated to your domain
- [ ] GitHub bio + website field updated to your domain
- [ ] Single content file (`src/content/site.ts`) holds every claim on the
      site, and every claim matches your resume

## Things to gitignore

```
# in .gitignore
/claude_design        # design handoff bundle, reference only
/PLAN.md              # working notes you don't want public
/.playwright-mcp      # mcp screenshot scratch
/*.png                # mobile/desktop debug screenshots
!/public/*.png        # except real public assets
```
