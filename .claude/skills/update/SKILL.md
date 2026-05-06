---
name: update
description: Drift check for holderbein.dev. Walks resume sync, project freshness, time-based staleness, live-site health, and code health. Reports findings; only edits public/resume.pdf when the source is newer. Everything else is flagged for the user to confirm before changing.
---

# /update

You are running a routine drift check on the holderbein.dev workspace. Walk every
check below in order, then output a single report. Don't auto-edit `site.ts` or
commit anything beyond the resume PDF copy.

## Setup

- Working directory: `/Users/benjaminholderbein/Documents/Personal Projects/holderbein.dev`. If we're not there, stop.
- Source of truth: `src/content/site.ts`. Read it once at the start so all checks reference the same parsed content.
- Resume source: `/Users/benjaminholderbein/Documents/Career/Resumes/main-resume/Benjamin_Holderbein_Resume.pdf`.
- Use the system-context date (today) when evaluating time-based claims.

## Checks

### A. Resume sync

**A1. Resume PDF freshness.**

```bash
cmp -s "/Users/benjaminholderbein/Documents/Career/Resumes/main-resume/Benjamin_Holderbein_Resume.pdf" public/resume.pdf
```

If they differ, compare mtimes. If the source is newer, copy it over `public/resume.pdf`
and `git add` it (do **not** commit yet — surface in the report and let the user
approve commit + push at the end).

**A2. Resume content vs `site.ts`.**

Read the resume PDF. Extract:
- Header role string, location.
- One-line bio header.
- Per-role: title, org, location, dates (start/end), bullet content.
- Education: degrees, school, dates, GPA.

Compare to `site.ts`:
- `site.role`, `site.location`, `site.oneLiner`
- `site.bioShort`, `site.bioLong[]` — does anything claim a role/scope/metric
  that disagrees with the resume?
- `site.experience[*]` — title, org, where, start, end, yearRange, bullets.
  Watch especially: dates (e.g., a continuous range on the site that the
  resume splits into two stints), missing or thin bullets where the resume
  has more, claims on the site that aren't in the resume at all.
- `site.education[*]` — degree names, dates, GPA, "Expected <date>" details.

For each mismatch, output one line in plain English describing the drift.
Don't edit `site.ts`. Don't paraphrase mismatches charitably — quote both
sides if it's ambiguous.

### B. Project freshness

For each entry in `site.projects`:

**B1. Repo vs site blurb.**

Find the GitHub repo via the project's "Repo" link (or first GitHub link).
If no GitHub link, skip and note "no repo to check."

Fetch the repo description + first ~100 lines of README:

```bash
gh api repos/<owner>/<name> --jq '{description, pushed_at, archived}'
gh api repos/<owner>/<name>/readme --jq .content | base64 -d | head -100
```

Flag if:
- The README leads with tech, scope, or results that the site blurb doesn't mention.
- The status on the site (`live` / `wip` / `archive`) disagrees with the repo
  state (e.g., repo has a clear MVP shipped but site says `wip`; repo
  unchanged for >12 months but site says `live`).
- The README has a clear new headline/result the blurb doesn't capture.

**B2. Link rot.**

Curl every URL in:
- `site.links[*].href` (skip `mailto:` and same-origin like `/resume.pdf`)
- each project's `links[*].href`

```bash
curl -sI -o /dev/null -w "%{http_code} %{url_effective}\n" --max-time 10 <url>
```

Anything non-2xx (or non-3xx for known redirects) → flag.

Known false positives — do **not** flag:
- `linkedin.com/*` returns `999` (LinkedIn blocks non-browser HEAD requests).
- `npmjs.com/package/*` returns `403` to bare HEAD (npm bot-blocks). Use
  `curl -sI -A "Mozilla/5.0"` if you want a real check, otherwise skip.

### C. Time-based staleness

Use today's date from the system context.

**C1. `site.availability`.** Parse the month-year. If it's <= today's month, prompt
the user: still accurate or new value? Flag in report.

**C2. `site.education[*].details`.** Look for `Expected <Month> <Year>`. If the
expected date has passed, flag.

**C3. `site.now[*]`.** Scan each item for embedded dates (regex roughly:
`(Jan|Feb|...|Dec|January|February|...|December)\s+\d{4}` or `\(\w+\s+\d{4}\)` or
`by\s+\w+\s+\d{4}`). If any referenced date is in the past, flag.

**C4. `site.experience` with `end: "Present"`.** For each, ask the user (in the
report) to confirm the role is still current. Don't pull from any external
source — confirmation is manual.

### D. Live-site health (probe-only)

```bash
# D1: apex 200
curl -sI https://holderbein.dev | head -1

# D2: TLS expiry — flag if < 30 days
echo | openssl s_client -servername holderbein.dev -connect holderbein.dev:443 2>/dev/null \
  | openssl x509 -noout -enddate

# D3: www -> apex 308
curl -sI https://www.holderbein.dev | grep -iE "^(HTTP|location)"

# D4–D5: robots + sitemap 200
curl -sI https://holderbein.dev/robots.txt | head -1
curl -sI https://holderbein.dev/sitemap.xml | head -1

# D6: og image
curl -sI https://holderbein.dev/opengraph-image | grep -iE "^(HTTP|content-type)"

# D7: latest Vercel deploy state (skip if `vercel` not installed or .vercel/ missing)
vercel ls 2>/dev/null | head -5

# D8: the deploy currently serving the apex is at least as new as local HEAD
vercel inspect https://holderbein.dev 2>&1 | grep -E 'url|created'
git log -1 --format='%ai %h %s'
```

For D7, flag if the most recent deploy is not `Ready` (e.g., `Error`, `Building`,
`Queued`). If the CLI isn't installed or the project isn't linked, note "vercel
CLI not available" and move on — don't block the report.

For D8: `vercel inspect https://holderbein.dev` resolves the alias to whichever
deploy is actually serving the apex right now. Parse its `created` timestamp and
compare to `git log -1 --format=%ai`. If the apex-serving deploy is older than
HEAD, either the push hasn't built yet, the build failed, or promotion is stuck
— flag it. (This avoids the false flag from D7's "latest Ready" briefly
mismatching during the normal ~30s–2min promotion window after a push.)

### E. Code health

```bash
npm run build 2>&1 | tail -30
npm run lint 2>&1 | tail -30
npm outdated 2>&1 | tail -30
```

`build` and `lint` must succeed. `npm outdated` is informational — report what's
behind, don't bump.

Note: the `lint` script runs `eslint` directly; empty output = clean (exit 0).
Don't read silence as a failure.

## Reporting

Output one tight report with five sections in order. Use `✓` / `⚠` / `✗`. One
line per check unless a flag needs explanation. Example shape:

```
/update — holderbein.dev — 2026-05-01

A. Resume sync
  ✓ public/resume.pdf matches source
  ⚠ Asurion blurb on site mentions only RAG/embedding work; resume also has
    IVR translation (opus-mt vs Gemini, 7.3x latency) and voice-safety bullets

B. Project freshness
  ✓ ecommerce-ticket-triage — blurb matches README
  ⚠ llm-from-scratch — README now mentions ~124M params, BPE tokenizer, GPT-2
    small architecture; site blurb is generic ("transformer-based LLM")
  ✓ All 14 project/contact links return 2xx

C. Time-based staleness
  ✓ availability "July 2026" — 3 months out
  ⚠ education[0].details = "Expected June 2026" — past today
  ⚠ now[1] mentions "(June 2026)" — past today
  → confirm: experience[0] (Asurion) end:"Present" — still current?

D. Live-site health
  ✓ apex 200, TLS 87 days, www 308, robots/sitemap/og all 200

E. Code health
  ✓ build passes, lint clean
  ⚠ npm outdated: next 16.2.4 → 16.3.1, react 19.2.4 → 19.3.0
```

After the report, list **suggested actions** as a numbered todo. Each action
should be specific enough to execute on approval (e.g., "Update site.ts:155
blurb to: ..." with the proposed text). Don't execute any of them.

If A1 staged a newer resume PDF, the first suggested action is always:
"Commit + push the resume PDF refresh."

## Editing rules

- The only edit you may make automatically is `cp` of the resume PDF when the
  source is newer (then `git add public/resume.pdf`).
- Don't commit. The user reviews the report and approves edits.
- Don't touch `site.ts`, components, configs, or the design files.
