# Cozy Winter Portfolio

A responsive software engineering portfolio built with React 19, Vite, Material UI, and Bootstrap 5.

## Getting started

```sh
npm install
npm run dev
```

The sidebar pages have independent routes: `/`, `/work`, `/projects`, `/studio`, and `/about`. The Projects page shows a selectable project list beside a playback panel for the selected project. Bubbl is marked as a two-time hackathon winner.

## Updating portfolio content

Edit [`src/portfolioData.js`](./src/portfolioData.js) to update the one-sentence home summary, work history, education, and the six featured technologies. The home Experience preview and the full Work page both use the same `experiences` list, so updating a role keeps both views in sync. The Work page's Resume button opens the browser print dialog so the experience and education details can be saved as a PDF.

The home artwork carousel is driven by the `artworks` array in `src/portfolioData.js`. Ompa's GIF assets live in `ompas/`; Ompa4 appears beside the home introduction, Ompa-lots powers the dashboard like card and Ompa project preview, while Relax and Hero are shown on About Me. GIFs with opaque white canvases are displayed on matching rounded white tiles.

Project data remains in `src/App.jsx`. Add a `demo` path to a project (for example, `demo: "/media/project.gif"`) and put the file in `public/media` to show a looping GIF; MP4 and WebM demos play as looping video.

The dashboard like counter is ready to connect to a backend by setting `VITE_LIKES_API_URL` to its endpoint. The endpoint should return JSON shaped like `{"count": 12, "liked": false}` for `GET` and `POST`; `liked` should reflect whether the current visitor has already liked the portfolio. Until the variable is configured, the dashboard shows a coming-soon message and does not store a local or fabricated count.
