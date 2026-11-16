# Giving this design to Copilot / Claude

## Files to attach or open in your editor (in this order)
1. `DESIGN.md` — the design brief and rules (most important)
2. `design-system/tokens.css` — colors, fonts, shadow rules, theme variables
3. `src/atelier.css` — the full visual system and animations
4. `src/Atelier.tsx` — the components (`Brush`, `Divider`, `VinylDisc`, `ArtStore`, `Notebook`, `ProjectDashboard`, `Intro`, `Emblem`)
5. `design-system/README.md` — porting steps
6. Assets, copied as-is: `public/stitched-studio/painted-crochet/` (braid, frame-large, frame-small, bow, drop-stitch, scallop, vine) and your artwork images
7. Put `DESIGN.md` at your repo root and add `@DESIGN.md` to `CLAUDE.md`, plus `.github/copilot-instructions.md` (both already exist here), so the tools load it automatically.

Do NOT copy `src/StitchedStudio.tsx` content blindly: `Atelier.tsx` imports your
data from it (`projectData`, `roles`, `artworkThemes`, `DemoVisual`, `Ompa`).
Replace those with your own repo's data.

## Prompt (paste into Copilot Chat / Claude)

I'm adding a new visual design to my existing portfolio. Read `DESIGN.md`,
`design-system/tokens.css`, `src/atelier.css` and `src/Atelier.tsx` first; they are
the source of truth for the design.

Goal: re-skin my site with this design while keeping my app's structure, routes,
and ALL of my existing content.

Hard rules:
1. Do not change or rewrite any of my copy: bio, overview text, job roles, education,
   project names and descriptions, links, interests. Keep my text exactly and
   place it into the design's components.
2. Keep my pages and routes (Home, Work, Projects, Studio, About Me) and the
   layout: persistent left navigation, central content, right context panel.
3. Home order stays: featured artwork (the record store) first, then my
   "Hi, I'm …" overview, then featured projects, then experience and technologies.
4. Use my artwork images as the themed art. Each image needs a palette
   (`accent, secondary, wash, paper, rgb`). Pick artwork and palette together at
   random on every page load and apply them as the CSS variables `--a --b --wash --paper --rgb`.
5. Reuse the existing components and classes. Don't invent new visual patterns and
   don't use rounded SaaS cards, pill chips, glassmorphism, blurred shadows,
   emojis, flowers/botanical art, or anything that looks like Spotify.
6. Keep these features: draggable vinyl record store with a turntable (with an
   `onPlay` hook I'll connect to a music API later), painted-crochet frames used
   sparingly, brush-stroke accents, stitched dashed seams, paper grain,
   the engineer's-notebook project dashboard (architecture sketch + terminal),
   paint-in-on-scroll with several stroke directions, the opening "sketch the
   layout then push the UI into place" intro, and the sketched-in overview.
7. Respect `prefers-reduced-motion` and keep drag-and-drop usable by click and keyboard.

Steps:
1. Copy `design-system/tokens.css`, `src/atelier.css`, the painted-crochet assets, and the components I need from `src/Atelier.tsx` into my project.
2. Move my data (projects, roles, themes) into a data module and feed it to the components. Write an architecture sketch entry for each of my projects (nodes, edges, a one-line note, one illustrative pseudocode line) using only technologies I actually use.
3. Render the hidden SVG filter defs (`#at-rough`, `#at-wobble`, `#at-arrow`) once at the app root.
4. Verify with `pnpm format`, `pnpm build` and a type check. Then list anything you couldn't port and why.

Ask me before changing anything that isn't covered above.
