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

## Handing the widget script back to the user

The user tests `scripts/hpde-widget.js` by pasting it into
Scriptable on their iPhone. Every time you change that file:
push the change, then post the direct GitHub raw-file link
in a comment on the issue you're working on
(`https://raw.githubusercontent.com/inko9nito/hpde/<branch>/scripts/hpde-widget.js`
for whichever branch the change lives on). The link is enough
— DO NOT paste the full script into the comment body as a
fenced code block; the user has asked to keep comments short.
Do the post without being asked.

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
