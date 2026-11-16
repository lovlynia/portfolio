# Porting this design into another repo

1. Copy `design-system/tokens.css` and import it before your own styles.
2. Copy `src/atelier.css` (the visual system) and the parts of `src/Atelier.tsx` you want:
   `Brush`, `Divider`, `VinylDisc`, `Notebook` + `sketches`, `Emblem`, `Snowflake`, `ArtStore`.
3. Copy assets: `public/stitched-studio/painted-crochet/` (braid, frames, bow, botanical)
   and any artwork you use as themes.
4. Render the hidden `<svg>` with filters `#at-rough`, `#at-wobble` and marker `#at-arrow`
   once at the app root (see the top of `Atelier()`); `Brush` and `Notebook` reference them.
5. Apply an artwork palette on the root element as CSS variables
   (`--a --b --wash --paper --rgb`) and pick artwork + palette together.
6. Replace `projectData`, `roles` and `sketches` with your own content.
   Note: `Atelier.tsx` still imports `projectData`, `roles`, `artworkThemes`,
   `DemoVisual`, `Ompa` from `src/StitchedStudio.tsx`; move those to their own
   module (e.g. `src/data.ts`) when porting.
7. Tell your AI tools about it: keep `DESIGN.md` at the repo root and reference it
   from `CLAUDE.md` (`@DESIGN.md`) and `.github/copilot-instructions.md`
   (both already set up here).
