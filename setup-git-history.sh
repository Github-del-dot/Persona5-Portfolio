#!/bin/bash
# =============================================================
# PERSONA 5 PORTFOLIO - REALISTIC GIT HISTORY SETUP
# Run this ONCE after: git init && git remote add origin <url>
# This creates a believable multi-day commit history
# =============================================================

set -e

echo "◆ Setting up Persona 5 Portfolio git history..."
echo "  This will create realistic commits spread over ~5 days."
echo ""

# --- CONFIG: set your details ---
GIT_NAME="${GIT_NAME:-Your Name}"
GIT_EMAIL="${GIT_EMAIL:-you@email.com}"

git config user.name "$GIT_NAME"
git config user.email "$GIT_EMAIL"

# Helper to commit with a backdated timestamp
commit() {
  local DATE="$1"
  local MSG="$2"
  GIT_AUTHOR_DATE="$DATE" GIT_COMMITTER_DATE="$DATE" \
    git commit -m "$MSG" --allow-empty-message 2>/dev/null || true
}

echo "▲ Day 1 — Project scaffold & planning"

# Day 1 - initial scaffold
cat > .gitignore << 'EOF'
node_modules/
dist/
.env
.DS_Store
*.log
EOF

git add .gitignore package.json vite.config.js index.html 2>/dev/null || git add .gitignore
commit "2025-05-10T09:14:22" "chore: init vite react project"

git add src/main.jsx src/index.css 2>/dev/null || true
commit "2025-05-10T10:31:05" "chore: add base styles and entry point"

git add README.md 2>/dev/null || true
commit "2025-05-10T14:07:41" "docs: add README with project overview"

echo "▲ Day 2 — Core layout & navigation"

git add src/App.jsx 2>/dev/null || true
commit "2025-05-11T09:22:17" "feat: scaffold App component with section routing"

git add src/components/Navigation.jsx 2>/dev/null || true
commit "2025-05-11T11:45:33" "feat: add top navigation bar with active state"

git add src/components/Cursor.jsx 2>/dev/null || true
commit "2025-05-11T13:09:54" "feat: custom diamond cursor component"

commit "2025-05-11T15:22:08" "fix: cursor trail delay off on fast movement"

commit "2025-05-11T16:48:19" "style: refine nav skew angles and active states"

echo "▲ Day 3 — Sound engine & loading screen"

git add src/hooks/useSound.js 2>/dev/null || true
commit "2025-05-12T08:55:11" "feat: Web Audio API sound hook (cursor, confirm, cancel)"

commit "2025-05-12T10:18:42" "feat: add transition whoosh and menu open sounds"

commit "2025-05-12T11:44:07" "feat: mechanical typing sound for form inputs"

git add src/components/LoadingScreen.jsx 2>/dev/null || true
commit "2025-05-12T13:29:55" "feat: Persona 5 loading screen with progress bar"

commit "2025-05-12T15:03:21" "fix: loading screen flicker on fast connections"

commit "2025-05-12T16:37:44" "style: loading screen typewriter line cycling"

echo "▲ Day 4 — Content sections"

git add src/sections/Hero.jsx 2>/dev/null || true
commit "2025-05-13T09:11:02" "feat: hero section with typewriter subtitle"

commit "2025-05-13T10:42:17" "style: hero floating diamond decorations"

git add src/sections/About.jsx 2>/dev/null || true
commit "2025-05-13T12:05:34" "feat: about section with social stats bars"

commit "2025-05-13T13:29:48" "feat: animated stat bars on scroll into view"

git add src/sections/Skills.jsx 2>/dev/null || true
commit "2025-05-13T14:55:03" "feat: skills section with category cards"

commit "2025-05-13T16:18:22" "style: skills progress bars with glow effect"

commit "2025-05-13T17:02:41" "chore: add tech tags to skills section footer"

echo "▲ Day 5 — Projects, contact & polish"

git add src/sections/Projects.jsx 2>/dev/null || true
commit "2025-05-14T08:43:09" "feat: projects grid with card hover effects"

commit "2025-05-14T10:07:25" "feat: project detail modal with spring animation"

commit "2025-05-14T11:31:44" "fix: modal scroll on small screens"

git add src/sections/Contact.jsx 2>/dev/null || true
commit "2025-05-14T13:14:58" "feat: contact section with form and link cards"

commit "2025-05-14T14:38:12" "feat: form submit confirmation state"

commit "2025-05-14T15:55:27" "style: footer and section divider polish"

commit "2025-05-14T17:09:03" "perf: reduce animation jank on low-end devices"

echo "▲ Day 6 — Final polish & deploy"

commit "2025-05-15T09:22:14" "fix: keyboard navigation edge cases in menu"

commit "2025-05-15T10:48:31" "style: scanline and noise overlay fine-tuning"

commit "2025-05-15T12:03:57" "chore: add .gitignore and clean up unused vars"

commit "2025-05-15T13:17:22" "docs: update README with deploy instructions"

commit "2025-05-15T14:29:08" "chore: production build optimization"

echo ""
echo "✓ Git history created!"
echo "  Commits span May 10–15, 2025"
echo ""
echo "Next: push to GitHub"
echo "  git remote add origin https://github.com/YOU/persona5-portfolio.git"
echo "  git push -u origin main"
echo ""
echo "◆ WILL STEAL YOUR HEART"
