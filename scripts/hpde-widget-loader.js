// HPDE track-day schedule — Scriptable widget LOADER.
// Paste ONLY this file into Scriptable. On every run it fetches the real
// widget script from GitHub and runs it, so future changes to
// scripts/hpde-widget.js on `main` show up automatically — no more
// copy-pasting the whole script by hand.
// If the fetch fails (e.g. offline), it falls back to the last copy it
// managed to fetch, cached locally.
//
// Setup: install Scriptable → paste this script → long-press Home Screen →
//   Add Widget → Scriptable → Medium → Edit Widget → Script = this script.
// The widget script's own Parameter (run group filter) still works — set
// it the same way, on the widget, not here.

const SCRIPT_URL = "https://raw.githubusercontent.com/inko9nito/hpde/main/scripts/hpde-widget.js"
const LOADER_CACHE_FILENAME = "hpde-widget-loader-cache.js"

function getFm() {
  try { return FileManager.iCloud() } catch (_) { return FileManager.local() }
}

async function loadScriptSource() {
  const fm = getFm()
  const path = fm.joinPath(fm.documentsDirectory(), LOADER_CACHE_FILENAME)
  try {
    const req = new Request(SCRIPT_URL)
    req.timeoutInterval = 8
    const code = await req.loadString()
    try { fm.writeString(path, code) } catch (_) {}
    return code
  } catch (e) {
    if (fm.fileExists(path)) return fm.readString(path)
    throw e
  }
}

const source = await loadScriptSource()
// Run the fetched code in its own function scope (not this loader's), and
// wrapped in an async IIFE so its top-level `await`s work — `new Function`
// runs in global scope, so its top-level `const`/`let` can't collide with
// this loader's. Built with `+` rather than a template literal so a
// backtick anywhere in the fetched source can't break out of it.
const run = new Function("return (async () => {\n" + source + "\n})()")
await run()
