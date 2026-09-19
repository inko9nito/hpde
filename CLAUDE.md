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

`.github/workflows/pr-preview.yml` deploys every PR to GitHub Pages
at `https://inko9nito.github.io/hpde/pr-preview/pr-<n>/`. Once you've
opened a PR, check that workflow ran for it (`actions_list` /
`list_workflow_runs` with `resource_id: pr-preview.yml`, filtered to
that PR's head branch) and include the preview link in the PR body
or the issue status comment. Do this without being asked — don't
wait for me to ask where the preview is.

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
