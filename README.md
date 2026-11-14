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

To add artwork to the home carousel, put image files in `public/artwork` and add entries to the `artworks` array in `src/portfolioData.js`, with a title, image path, and background color. The carousel cycles through the entries and uses each artwork's background color as its surrounding color treatment. The gallery currently shows a placeholder because no artwork files have been added yet.

Project data remains in `src/App.jsx`. Add a `demo` path to a project (for example, `demo: "/media/project.gif"`) and put the file in `public/media` to show a looping GIF; MP4 and WebM demos play as looping video.
