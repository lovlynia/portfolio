# Design language — "Sketchbook meets engineering studio"

A portfolio that feels like the digital workspace of someone who paints, crochets
and builds software. Artist and engineer carry equal weight. It must stay
professional and usable: never a scrapbook, craft shop or SaaS dashboard.

Source of truth: `src/Atelier.tsx` (components) and `src/atelier.css` (styles).
Tokens: `design-system/tokens.css`. Porting guide: `design-system/README.md`.

## Architecture (keep)

Persistent left rail (page index) · central content · right context rail.
Pages: Home, Work, Projects, Studio, About. Navigation is client-side, so the
shell never reloads. The layout is Spotify-like in structure only — **never copy
Spotify visuals**.

## Identity rules

1. Dark, atmospheric base: midnight navy and charcoal. Not predominantly white.
2. Burgundy/wine is permanent. Antique gold and muted evergreen are secondary.
3. Warm paper surfaces (`--paper`) for notes, cards, labels, letters.
4. Painted burgundy crochet (`/public/stitched-studio/painted-crochet/*`) is the
   signature. Use it selectively on frames, dividers and ribbons — never as a
   blanket filter or on every component.
5. No flowers or botanical illustration (explicit preference). Use stitches, geometry and paint instead.
6. Every craft reference is borrowed as a _visual characteristic_, not depicted:
   stitched dashed seams, handmade-paper grain, linocut-style
   bands, textile patches, archival labels, handwritten annotations.
7. Technical elements must be real: architecture sketches, stack lists and
   pseudocode describe the actual project. No decorative fake code.

## Do not

- Rounded-corner, soft-shadow SaaS cards; pill chips; glassmorphism; gradients as decoration.
- Uniform icon + label list rows; green or Spotify-like play buttons.
- Blurred shadows. Shadows are hard offsets (`--shadow-paper`).
- Emojis. Use the SVG emblems/snowflake or text.
- Hard-coded accent colors on themed surfaces — use the variables below.

## Theming

Each artwork has a palette: `accent, secondary, wash, paper, rgb`
(`artworkThemes` in `src/StitchedStudio.tsx`). On load one artwork is chosen at
random and its palette is applied as CSS variables on `.at-app`
(`--a --b --wash --paper --rgb`). Choosing a vinyl or thumbnail swaps both
together — artwork and theme must never be selected independently.
Anything coloured should use these variables (`color-mix(in oklab, var(--wash) …)`
for tints).

## Type

Fraunces (display, light weight, italic for emphasis) · Newsreader (body) ·
Caveat (handwritten notes, ~18–24px) · DM Mono (labels, metadata, terminal;
uppercase, tracked).

## Component vocabulary (all in `src/Atelier.tsx`)

| Component          | Use                                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `Brush`            | Painted stroke with ragged edge; under headings, behind active nav, across covers. Needs the `#at-rough` filter defs in the root svg. |
| `Divider`          | Hand-drawn leaf flourish between sections.                                                                                            |
| `VinylDisc`        | Marbled record whose label is the artwork; used in crate, platter, drag ghost.                                                        |
| `ArtStore`         | Draggable vinyl crate + turntable. `onPlay(i)` is the hook for a music API.                                                           |
| `Emblem`           | Hand-drawn project icon (stroke `currentColor`).                                                                                      |
| `Notebook`         | Engineer's notebook page: grid paper, wobbly architecture diagram, terminal block. Data: `sketches`.                                  |
| `ProjectDashboard` | Mixed-media project page: archival label, patched demo frame, taped tool labels.                                                      |
| `Snowflake`        | Brand mark and the rolling snowflake.                                                                                                 |

Utility classes: `.at-crochet` (crochet frame), `.tape` (washi tape),
`.label` / `.at-labels` (archival labels), `.at-anno` (handwritten margin note),
`.at-patch` (stitched textile frame).

## Adding a project

1. Add it to `projectData` (name, kind, summary, tools, number).
2. Add a `case` in `Emblem` (64×64, stroke only, `strokeWidth` 2.2).
3. Add its architecture to `sketches` (nodes on a 364×160 grid, edges, a one-line
   note, one illustrative pseudocode line).

## Accessibility & behaviour

Drag-and-drop always has a click/keyboard alternative. Animations are decorative
only; keep contrast on `--wash` backgrounds. Mobile: left rail becomes a bottom
bar; right rail stacks below content.

## Motion: painted in on scroll

Content blocks start masked and are revealed left-to-right by a ragged brush edge
as they scroll into view (`.pi` / `.pi-on` / `.pi-done`, mask in `--paint-mask`).
The hook lives in `Atelier()`; add a selector to its list to opt an element in.
Respects `prefers-reduced-motion`.

### Variety and the opening sequence
- Paint-in uses seven stroke directions (`.pv0`–`.pv6`: left, right, down, up, diagonal bars, stacked horizontal rows, swirl/blob), picked at random per element.
- On first load the UI is "sketched": a pencil wireframe draws itself (`Intro` in `src/Atelier.tsx`), then a cursor pushes the navigation, pinboard, vinyls and buttons into place (`@keyframes at-push`, driven by `data-intro` on `.at-app`).
- The overview letter is sketched in on scroll (pencil outline, outline-only text, then ink and paper fill; classes `.sk` / `.sk-on`).
All of it is skipped under `prefers-reduced-motion`.
