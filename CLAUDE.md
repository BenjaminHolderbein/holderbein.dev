<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Shipping changes to live

The site auto-deploys from `main` via Vercel. The flow when the user says "get that on live" / "ship it" / etc.:

### Step 1 — capture the current apex deployment ID *before* pushing

```bash
vercel inspect --json https://holderbein.dev 2>/dev/null | jq -r .id
```

Record the printed `dpl_...` id. **Don't rely on a shell variable** — each Bash tool call is a fresh subshell, so `BEFORE_ID=...` set here is gone by step 3. Read the literal id back from the output and paste it into the step 3 script.

### Step 2 — commit + push

```bash
git add <files> && git commit -m "..." && git push origin main
```

### Step 3 — background watcher (≤1 min per attempt, up to 3 attempts)

Paste the literal id from step 1 in place of `dpl_PASTE_FROM_STEP_1`:

```bash
BEFORE_ID="dpl_PASTE_FROM_STEP_1"
MAX_ATTEMPTS=3
ATTEMPT_SECS=60
INTERVAL=5
attempt=1
while [ $attempt -le $MAX_ATTEMPTS ]; do
  end=$(( $(date +%s) + ATTEMPT_SECS ))
  while [ $(date +%s) -lt $end ]; do
    STATE=$(vercel inspect --json https://holderbein.dev 2>/dev/null | jq -r '.id + "|" + .readyState')
    CUR_ID="${STATE%|*}"; READY="${STATE#*|}"
    if [ "$CUR_ID" != "$BEFORE_ID" ]; then
      case "$READY" in
        READY)    echo "APEX FLIPPED — now serving $CUR_ID (attempt $attempt)"; date; exit 0 ;;
        ERROR|CANCELED) echo "DEPLOY $READY — $CUR_ID. Check https://vercel.com/dashboard"; date; exit 1 ;;
      esac
    fi
    sleep $INTERVAL
  done
  echo "Attempt $attempt/$MAX_ATTEMPTS timed out (${ATTEMPT_SECS}s) — apex still $BEFORE_ID. Retrying..."
  attempt=$((attempt + 1))
done
echo "Gave up after $MAX_ATTEMPTS attempts (~$((MAX_ATTEMPTS * ATTEMPT_SECS))s). Check https://vercel.com/dashboard"
exit 1
```

Run with `run_in_background: true` and Bash `timeout` set to ~`200000` ms (covers the full 3 × 60s budget with margin).

### Step 4 — surface result to the user

When the background task completes:
- exit 0 + "APEX FLIPPED" → tell the user "live now"
- exit 1 + "DEPLOY ERROR/CANCELED" → tell the user the build failed
- exit 1 + "Gave up after 3 attempts" → tell the user the deploy is unusually slow; suggest checking the Vercel dashboard

Don't go silent. The point of the watcher is to remove the "did it ship?" wondering.

### Notes & rationale

- **ID-diff, not SHA-grep.** `vercel inspect` output (text or `--json`) does *not* include the git commit SHA for production-alias inspections — `.meta` is `null`. Earlier versions of this doc told agents to `grep -q $SHA`, which silently never matched and produced a watcher that only ever exited on timeout. The deployment `id` is the reliable signal.
- **Why bounded retries instead of one long poll.** A single 10-min poll goes silent for 10 minutes when something is wrong. Three 60s attempts with checkpoint messages let the user (and the agent) see progress: "attempt 2/3 — still waiting" is informative; ten minutes of nothing is not.
- **Terminal states matter.** Without handling `ERROR`/`CANCELED`, the loop would spin past a failed build for the full retry budget. Watching for them lets the watcher fail fast.
- **Same pattern as `/update` check D8.** Alias-inspection (`vercel inspect <url>`) resolves to whichever deploy is *actually* serving the apex, not just the latest build that finished — this sidesteps the promotion-window false positive that `vercel ls` would produce.
