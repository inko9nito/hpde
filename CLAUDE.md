# Notes for Claude working in this repo

## Handing the widget script back to the user

The user tests `scripts/hpde-widget.js` by pasting it into
Scriptable on their iPhone. Every time you change that file:
push the change, then post the full updated script as a fenced
```javascript block in a GitHub comment on the issue you're
working on. Include the direct GitHub raw-file link in the same
comment (`https://raw.githubusercontent.com/inko9nito/hpde/<branch>/scripts/hpde-widget.js`
for whichever branch the change lives on) so they can pick
either. Do this without being asked.

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
