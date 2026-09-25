# Notes for Claude working in this repo

## Session title

Session title is `Issue #<n> <durable topic>`, where the topic mirrors
the GitHub issue's own title — not the current phase of work
(not "design review", "fix jerky drawer", etc.). If the session was
opened with a phase-of-work title, or drifts toward one as work
progresses, rename it back to the issue's durable topic via
`set_session_title`. The branch name is fixed for the life of the
PR; the session title isn't, so keep it accurate.

## Keeping GitHub issues up to date

Chat is ephemeral; the issue is the durable record. Whenever
work on an issue pauses in a state I might not come back to
right away — you're going idle, end of day, blocked on a
decision from me, or done and pushed — post a short summary
and next-steps comment on the relevant issue before you stop.
Include any open questions with enough context that I can
answer them by replying on the issue, not by scrolling back
through chat.

Don't post for every turn — only when there's a state change
worth persisting (design ready to review, waiting on my input,
work merged, blocked). Keep comments short (a few lines +
links, not a wall of text); a design or preview goes in as a
link, not inlined.

## Open a PR for every issue

GitHub only links a branch in an issue's Development panel if it
was created via that issue's own "Create a branch" button, or a PR
references the issue with a closing keyword (`Closes #<n>`) in its
body — pushing a branch and mentioning it in a comment does neither.
So once there's a pushed commit for an issue, open a PR from that
branch with `Closes #<n>` in the body, even before the work is
finished or ready for review. Do this without being asked.

## Post the PR preview link

Every PR gets a Netlify deploy preview at
`https://deploy-preview-<n>--myhpde.netlify.app`. Post it without being
asked. Netlify reports it as the `netlify/myhpde/deploy-preview` commit
status on the PR head (`pull_request_read` with `method: get_status`);
use that status's `target_url`, and mention it if the status is pending
or failed. (GitHub Pages previews were retired in #227.)

Put the link in the PR body and in the issue status comment.

## Tests and CI (#256)

`.github/workflows/ci.yml` runs on every PR and every push to `main`:

- **checks** — `tsc -b`, `vitest run`, `npm run build`, then browser tests
  of the built app in WebKit (iPhone-sized) and Chromium with the events
  API stubbed (`e2e/app.spec.ts`).
- **deploy-preview** (PRs) — waits until the Netlify preview serves the
  PR's head commit (`/version.json`), then runs read-only checks against
  it, real functions included (`e2e/live.spec.ts`): `/api/events`,
  `/api/events.json` (the widget feed) and the app pages.
- **production** (after merge) — the same read-only checks against
  `https://myhpde.netlify.app` once it serves the merged commit.

Before pushing, run locally what CI runs first — `npx tsc -b`,
`npx vitest run`, `npm run build`, and
`PLAYWRIGHT_EXECUTABLE_PATH=/opt/pw-browsers/chromium npm run test:e2e -- --project=chromium`
(only Chromium is installed in the sandbox; WebKit runs in CI). Any page
error fails a browser test. Never skip, loosen or delete a test to get
green.

When the user says "merge", read the PR's check results first and merge
only if they're green (that's an explicit ask, not auto-watching). If a
check is red, say which one and why instead of merging. After merging,
see the merge through: wait for the live site to serve the merged commit
(`curl https://myhpde.netlify.app/version.json`), then check what changed
(e.g. `curl` a changed endpoint) and report what it returned.

**Netlify functions.** Vitest's resolver forgives imports that Node
rejects, so a function can pass every unit test and still crash on
Netlify (#253: the widget feed answered 502 for an hour).
`netlify/lib/functionsLoad.test.ts` loads each function in a plain Node
process, packaged the way Netlify packages it; keep it passing, and don't
loosen it to make a function "load". The deploy-preview job then checks
the real functions on the preview.

**Sandbox limits.** Deploy-preview hosts aren't reachable from Claude's
sandbox; `https://myhpde.netlify.app` is, through a proxy that re-signs
HTTPS. `E2E_SANDBOX_PROXY=1 E2E_BASE_URL=https://myhpde.netlify.app` runs
the live checks from here, but page loads through the proxy are flaky
(`ERR_TOO_MANY_RETRIES`) — treat CI's run as the verdict, not the
sandbox's.

## Handing the widget script back to the user

The user runs a small paste-once loader (`scripts/hpde-widget-loader.js`)
in Scriptable that fetches `scripts/hpde-widget.js` from `main` on
every widget run. So once a change to the widget script lands on
`main`, the loader picks it up automatically — the user doesn't
re-paste anything. Practically:

- On a PR that changes `scripts/hpde-widget.js`, don't tell the
  user to paste the new script. Just say the loader will pick it
  up when the PR merges.
- If the user wants to test the branch BEFORE merging, they can
  temporarily change the `SCRIPT_URL` constant in the loader they
  already have installed to point at the branch's raw file
  (`https://raw.githubusercontent.com/inko9nito/hpde/<branch>/scripts/hpde-widget.js`),
  run the widget, then revert to `main`. Mention this option in a
  short comment on the issue when a widget-script change ships.
- DO NOT paste the full widget script into the comment body as a
  fenced code block; the user has asked to keep comments short.

Do the "loader will pick it up on merge, here's how to preview
early if you want" post without being asked.

## Widget layout work — always run the simulator, never hand-compute

`scripts/hpde-widget.js` is a Scriptable widget with no local
renderer of its own. Every time this file has been changed by
hand-computing font metrics, padding, or "where the divider would
land," the same class of bug (overlap, inconsistent padding, wrong
truncation, mis-centered icons) has come back. So the rule for any
task that touches this file:

1. **Run `npm run widget:preview` before making a claim about
   layout, and again after every layout edit.** The simulator writes
   PNGs into `scripts/.widget-preview/s0.png`, `s1.png`, … (it prints
   which scenario and widget size each one is); Read one with the Read
   tool to see it. It renders at the owner's phone's widget sizes
   (375×812: 155 / 329×155 / 329×345) and sweeps the countdown layouts
   across the narrowest (SE) and widest (Pro Max) phones too — check
   those, not just one size. To compare a design option, render a
   variant copy with `WIDGET_SCRIPT=path/to/copy.js npm run
   widget:preview` (it writes to `.widget-preview/<copy name>/`). If Chromium's default binary isn't
   available, pass `PLAYWRIGHT_EXECUTABLE_PATH=/opt/pw-browsers/chromium`.
   Do NOT report a layout as fixed on the strength of arithmetic
   or "the code looks right" — read the render.
2. **Trust the simulator's grounded numbers, not memory.** Widget
   point sizes, outer corner radius, dark-mode background, DPR, text
   line height and the flexible spacer's minimum all live in
   `WIDGET_ENV_CONSTANTS` at the top of
   `scripts/widget-preview.mjs`, each with a citation to its Apple
   source. Do not edit a value there without moving its citation
   with it. `scripts/hpde-widget.test.ts` pins these values — if
   the pinning test fails, the fix is to reconcile the citation,
   not to bump the assertion.
3. **Icons come from a set, never a hand-drawn SVG string.** The
   simulator resolves SF Symbol names to Lucide (already an app
   dep — the web app renders the same set at the same field
   positions) via `SF_SYMBOL_TO_LUCIDE`, reading path data at load
   time from `node_modules/lucide-react/**`. `flag.checkered` is the
   only exception (Lucide has no checkered flag) and uses Font
   Awesome's real icon data. If a new SF Symbol appears in
   `hpde-widget.js`, either add it to `SF_SYMBOL_TO_LUCIDE` or the
   simulator renders a magenta X placeholder — do NOT paste a
   freehand SVG path in as a stand-in. The countdown header's red
   checkered flag is not an SF Symbol: the widget draws the app's own
   `src/assets/checkered-flag.svg` with `DrawContext` (a test keeps
   its path data identical to the asset), and the simulator replays
   those same drawing calls.
4. **The static guardrail tests are load-bearing.** The
   `describe('design guardrails (static source checks)')` block in
   `scripts/hpde-widget.test.ts` catches known regression classes:
   VStack cross-axis alignment left implicit, inline `new Color(...)`
   instead of the palette, duplicate margin constants,
   hand-drawn-SVG lookup tables reintroduced in the simulator. If
   one of these fails, the answer is to fix the underlying issue,
   not to relax the assertion.

The simulator is a real browser laying out real HTML — it catches
overlap, misalignment, truncation and overflow well. It is NOT a
pixel-exact WidgetKit renderer (SF Pro Rounded and the real SF
Symbol glyphs aren't in this repo); a live on-device screenshot is
still the final check on tiny glyph details. But no layout claim
should ever ship from here without running the simulator first.

## Don't auto-watch CI or PRs

Checking on CI/review status burns tokens, so never do it
proactively. This overrides any default "subscribe and babysit"
behavior:

- Do not call `subscribe_pr_activity` after opening a PR.
- Do not schedule check-in wakeups (`send_later`, triggers, etc.)
  to poll CI, mergeability, or reviews.
- Only check a PR's CI/review state when I explicitly ask for it
  in that moment.

If I ask you to watch/babysit a specific PR in the moment, that's
fine for that PR — but don't carry it forward as a standing habit
on future PRs.

## Downloading image attachments from GitHub issues

`curl` on a `github.com/user-attachments/assets/<uuid>` URL is blocked by
the remote-session egress proxy (403). To fetch such an image:

1. Call `WebFetch` on the `github.com/user-attachments/...` URL. It
   won't return the image, but it reports the 302 redirect target — a
   signed `github-production-user-asset-*.s3.amazonaws.com` URL. That
   host **is** allowed by the proxy.
2. `curl -sL "<the signed S3 URL>" -o /path/in/scratchpad/file.jpeg`
3. `Read` the local file to see the image.

Do not try to route around the block by other means; do not disable TLS
or unset `HTTPS_PROXY`.
