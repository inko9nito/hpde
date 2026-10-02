#!/bin/bash
# Cloud sessions only: install the app's dependencies, then make Inter the
# sandbox's system font so Claude's screenshots of the app measure text
# close to the iPhone's San Francisco (#386). Apple's license forbids
# redistributing SF, and the browser's default here (DejaVu Sans) is ~20%
# wider, so text that fits on the phone wrapped in screenshots (#383).
# Inter is slightly wider than SF: text that fits in Inter fits on the phone.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
npm install --no-audit --no-fund

# Install Inter as a TTF. fontconfig would list the WOFF2 as it is, but
# Chromium's own FreeType can't open WOFF2 system fonts and silently falls
# back, so decode it first. The opsz file carries the weight axis too, and
# its optical sizes track SF's Text/Display switch.
fonts_dir="$HOME/.local/share/fonts"
mkdir -p "$fonts_dir"
FONTS_DIR="$fonts_dir" node -e "
  const fs = require('fs')
  const { decompress } = require('wawoff2')
  const woff2 = fs.readFileSync('node_modules/@fontsource-variable/inter/files/inter-latin-opsz-normal.woff2')
  decompress(woff2).then((ttf) => fs.writeFileSync(process.env.FONTS_DIR + '/Inter.ttf', ttf))
"

# Map the generic families the app's font stack ends in to Inter.
# -apple-system is left alone on purpose: the widget simulator
# (scripts/widget-preview.mjs) puts its Nunito stand-in ahead of system-ui,
# and aliasing -apple-system would jump ahead of it.
conf_dir="$HOME/.config/fontconfig/conf.d"
mkdir -p "$conf_dir"
cat > "$conf_dir/50-hpde-inter.conf" << 'CONF'
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias binding="strong">
    <family>system-ui</family>
    <prefer><family>Inter</family></prefer>
  </alias>
  <alias binding="strong">
    <family>sans-serif</family>
    <prefer><family>Inter</family></prefer>
  </alias>
</fontconfig>
CONF

fc-cache -f "$fonts_dir" > /dev/null
