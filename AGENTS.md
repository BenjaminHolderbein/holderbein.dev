<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Shipping changes to live

The site auto-deploys from `main` via Vercel. The flow when the user says "get that on live" / "ship it" / etc.:

1. Commit the change to `main` and `git push origin main`. Capture the short SHA from the push output.
2. Start a background poll that exits the moment the apex is serving the new commit, then tell the user:

   ```bash
   SHA=<short-sha> && until vercel inspect https://holderbein.dev 2>&1 | grep -q "$SHA"; do sleep 5; done && echo "APEX NOW SERVING $SHA" && date
   ```

   Run with `run_in_background: true` and a generous `timeout` (e.g. 600000ms). Poll interval is **5 seconds** — fast feedback matters more than API politeness for a personal site.

3. When the background task completes, surface it to the user ("live now") rather than going silent.

`vercel inspect <url>` resolves the alias to whichever deploy is *actually* serving the apex right now — this is the same pattern check D8 in `.claude/skills/update/SKILL.md` uses, and it sidesteps the false-positive window where `vercel ls` shows a newer build still mid-promotion.
