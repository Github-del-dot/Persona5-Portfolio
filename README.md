# ◆ PHANTOM THIEVES PORTFOLIO
### A Persona 5 Inspired Developer Portfolio

---

> *"I am thou, thou art I... Now let's steal their hearts."*

A fully interactive, Persona 5-styled portfolio website featuring keyboard navigation, Web Audio API sound effects, animated transitions, custom cursor, and the iconic red/black/white aesthetic.

---

## ✨ FEATURES

- **Loading Screen** — P5-style initialization sequence with progress bar
- **Custom Cursor** — Diamond-shaped cursor with hover effects
- **Keyboard Navigation** — Full keyboard control like the game
  - `TAB` — Open navigation menu
  - `ESC` — Close menu/modal
  - `1`–`5` — Quick-jump to sections
  - `↑/↓` or `A/D` — Scroll between sections
  - `W/S` — Navigate menu items
  - `ENTER` — Confirm selection
- **Web Audio Sounds** — Synthesized P5 UI sounds (no external files needed)
  - Cursor hover: sharp click
  - Confirm/select: two-tone punch
  - Cancel/back: descending tone
  - Transition: whoosh sweep
  - Typing: mechanical keys
  - Menu open: dramatic whomp
- **Scanline & Noise overlays** — CRT aesthetic
- **Framer Motion animations** — Persona-style transitions
- **Fully responsive** — Works on all screen sizes
- **Sections**: Hero, About (with Social Stats bars), Skills, Projects (with modals), Contact

---

## 🚀 SETUP

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org/))
- npm 9+ (comes with Node)
- Git ([download](https://git-scm.com/))

### 1. Clone or initialize repo

```bash
# If you already have this folder:
cd persona5-portfolio
git init

# Or clone from GitHub after pushing
git clone https://github.com/YOURUSERNAME/persona5-portfolio.git
cd persona5-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
npm run preview   # Preview the build
```

---

## 🎨 CUSTOMIZATION

All your personal details, education, work experience, projects, skills, and contact links are centralized in:
`src/data/portfolioData.js`

To customize anything, simply open and edit [`src/data/portfolioData.js`](src/data/portfolioData.js):
- **Name & Title**: `personal.fullName`, `personal.firstName`, `personal.lastName`, `personal.roleTags`
- **Work Experience**: `experience` array (internships, roles, projects, points)
- **Education**: `education` array (institution, degree, CGPA/marks)
- **Projects**: `projects` array (codename, title, description, tech stack, GitHub/live links)
- **Skills**: `skills` categories and percentage bars
- **Contact Channels**: `contact.channels` (Email, Phone, GitHub, LinkedIn, etc.)

---

## 🌐 DEPLOY TO GITHUB PAGES

### 1. Create GitHub repo

Go to [github.com/new](https://github.com/new), name it `persona5-portfolio`, create it.

### 2. Add `gh-pages` support

```bash
npm install --save-dev gh-pages
```

Add to `package.json` scripts:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### 3. Set base URL in `vite.config.js`

```js
export default defineConfig({
  plugins: [react()],
  base: '/persona5-portfolio/',   // ← your repo name
})
```

### 4. Push and deploy

```bash
git add .
git commit -m "feat: initial Persona 5 portfolio"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/persona5-portfolio.git
git push -u origin main
npm run deploy
```

Your site will be live at: `https://YOURUSERNAME.github.io/persona5-portfolio`

---

## 📁 PROJECT STRUCTURE

```
persona5-portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Cursor.jsx          # Custom diamond cursor
│   │   ├── LoadingScreen.jsx   # P5 boot sequence
│   │   └── Navigation.jsx      # Nav bar + menu overlay
│   ├── hooks/
│   │   └── useSound.js         # Web Audio API sound engine
│   ├── sections/
│   │   ├── Hero.jsx            # Landing section
│   │   ├── About.jsx           # About + Social Stats
│   │   ├── Skills.jsx          # Skills with bars
│   │   ├── Projects.jsx        # Project cards + modals
│   │   └── Contact.jsx         # Contact form + links
│   ├── App.jsx                 # Root component
│   ├── index.css               # Global styles + CSS vars
│   └── main.jsx                # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔊 SOUND CREDITS

All sounds are procedurally generated using the **Web Audio API** — no sound files needed. The synthesis is inspired by Persona 5's iconic UI sounds (menu clicks, whooshes, confirms).

---

## 🎮 PERSONA 5 IMAGE RESOURCES

To add authentic P5 images to your portfolio:

| Resource | URL | What's there |
|----------|-----|-------------|
| **Sounds Resource** | https://sounds.spriters-resource.com/playstation_3/persona5/ | Ripped UI sounds |
| **Sprites Resource** | https://www.spriters-resource.com/playstation_3/persona5/ | UI sprites & assets |
| **Wallpaper Cave** | https://wallpapercave.com/persona-5-wallpapers | HD wallpapers |
| **DeviantArt** | https://www.deviantart.com/tag/persona5 | Fan art & vectors |
| **The Sounds Resource** | https://www.sounds-resource.com | Official rips |

> ⚠️ Persona 5 assets are © Atlus. Use fan-made resources only for personal portfolios.

---

## 🛠️ TECH STACK

- **React 18** + **Vite 5** — Fast build & HMR
- **Framer Motion** — Animations & transitions
- **Web Audio API** — Procedural sound synthesis
- **CSS Variables** — Consistent theming
- **Google Fonts** — Bebas Neue, Rajdhani, Share Tech Mono

---

*"Thou art I, and I am thou. From the sea of thy soul, I cometh..."*

**Made with ❤️ and rebellious spirit** ◆
