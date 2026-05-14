<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Shipping changes to live

The site auto-deploys from `main` via Vercel. The flow when the user says "get that on live" / "ship it" / etc.:

1. **Capture the current apex deployment ID** *before* pushing:

   ```bash
   BEFORE_ID=$(vercel inspect --json https://holderbein.dev 2>/dev/null | jq -r .id)
   ```

2. Commit the change to `main` and `git push origin main`.

3. Start a background poll that exits the moment the apex flips to a new deployment that is `READY`:

   ```bash
   until [ "$(vercel inspect --json https://holderbein.dev 2>/dev/null | jq -r '.id + "|" + .readyState')" != "${BEFORE_ID}|READY" ] && \
         [ "$(vercel inspect --json https://holderbein.dev 2>/dev/null | jq -r .readyState)" = "READY" ]; do
     sleep 5
   done && echo "APEX FLIPPED — now serving $(vercel inspect --json https://holderbein.dev | jq -r .id)" && date
   ```

   Run with `run_in_background: true` and a generous `timeout` (e.g. 600000ms). Poll interval is **5 seconds**.

4. When the background task completes, surface it to the user ("live now") rather than going silent.

**Why ID-diff, not SHA-grep.** `vercel inspect` output (text or `--json`) does *not* include the git commit SHA for production-alias inspections — `.meta` comes back `null`. Earlier versions of this doc told agents to `grep -q $SHA`, which silently never matched and produced a watcher that only ever exited on timeout. The deployment `id` is the reliable signal: capture it pre-push, watch for a different-and-READY id post-push.

`vercel inspect <url>` resolves the alias to whichever deploy is *actually* serving the apex right now — same pattern as check D8 in `.claude/skills/update/SKILL.md`, and it sidesteps the false-positive window where `vercel ls` shows a newer build still mid-promotion.
