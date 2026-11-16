import { ompaArtwork } from "./portfolioData.js";

const ragChatbotDemo = new URL("../demos/demo-2.mp4", import.meta.url).href;

export const projectCatalog = [
  {
    slug: "bubble",
    name: "Bubl",
    type: "Mobile PWA · Location-based social",
    description: "A walk-first NYC discovery app where local notes unlock only when you reach their real-world locations.",
    detail:
      "Bubl turns exploring New York City on foot into a way to discover what locals leave behind. Notes appear as blurred, category-colored map dots; their content stays sealed until you are within the location’s 15-meter pop radius. Popping a note can lead to a mutual connection and a private chat.",
    motivationTitle: "Help people discover a city by walking it",
    motivation:
      "Bubl was built for the “Know Your City” hackathon track to offer a more local, walking-first alternative to searching through tourist guides. People share small notes tied to real places, then discover them by being there. The physical act of reaching a spot and popping its note makes exploration feel intentional, while mutual waves can turn a shared discovery into a private conversation.",
    contribution:
      "Contributed to frontend development and UI/UX design, integrated animated features, and worked on selected backend actions.",
    workflowTitle: "From sealed map dots to local connections",
    workflow: [
      {
        title: "Keep nearby notes intriguing",
        text: "The map shows category-colored, distance-blurred previews. Full note text and media stay on the server until a server-side distance check confirms the visitor is inside the bubble’s pop radius, 15 meters by default.",
      },
      {
        title: "Add expressive AI features",
        text: "People can leave text, photos, short videos, or voice notes. Gemini checks new drops for offensive content and personal information; ElevenLabs can read popped notes aloud. A PII pre-check still runs if Gemini is unavailable.",
      },
      {
        title: "Turn discovery into connection",
        text: "A pop and a like let someone wave to a note’s author. A private one-to-one chat unlocks only after both people wave back. The React PWA uses Cloudflare Workers and DeepSpace-backed SQLite storage, with a demo mode for indoor presentations.",
      },
    ],
    tags: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Cloudflare Workers", "DeepSpace", "Gemini", "ElevenLabs"],
    mark: "✳",
    tone: "blue",
    award: "2× Hackathon winner",
    repository: "https://github.com/tisya05/bubl",
  },
  {
    slug: "splita",
    name: "Splita",
    type: "Fintech · Pre-seed startup",
    description: "A group-payments startup helping friends split a restaurant bill upfront, item by item.",
    detail:
      "Splita makes group payments less awkward: scan or upload a receipt, let friends choose their own items, and split tax and tip automatically. Guests can join through a link or QR code without downloading the app. A pooled virtual card lets the host pay the full bill after everyone pays their share. The startup reports 200+ waitlist signups and is raising a pre-seed round.",
    contribution:
      "Designed the bill-splitting payment experience and built an early signup flow in React Native, Expo, and TypeScript with phone verification and consent screens.",
    tags: ["Flutter", "Dart", "React Native", "Expo", "TypeScript", "Stripe", "Apple Pay", "Google Pay"],
    mark: "◈",
    tone: "violet",
    website: "https://www.splita.co",
  },
  {
    slug: "hardscape",
    name: "Hardscape",
    type: "Client website · Portfolio",
    description: "A simple, professional portfolio website for Phoenix Stoneworks LLC to archive and showcase its work.",
    detail:
      "Built with vanilla HTML, CSS, and JavaScript, the site presents the company’s services and past stonework through a responsive gallery. The masonry-inspired gallery takes cues from Pinterest, with project lightboxes for browsing photos.",
    motivationTitle: "A clear home for completed work",
    motivation:
      "Hardscape was created for Phoenix Stoneworks LLC as a straightforward way to archive completed projects and help prospective clients explore the company’s work, services, and contact information.",
    contribution:
      "Created the website using vanilla HTML, CSS, and JavaScript, with a responsive project gallery and interactive photo browsing.",
    workflowTitle: "From company overview to project gallery",
    workflow: [
      {
        title: "Introduce the company and its services",
        text: "The home page uses a full-screen stonework hero, a services overview, equipment rental information, and calls to view the gallery or get in touch.",
      },
      {
        title: "Showcase completed projects",
        text: "A masonry-style gallery is populated from a JavaScript data array. Selecting a project opens a lightbox carousel with keyboard navigation, dot indicators, and click-outside-to-close behavior.",
      },
      {
        title: "Keep the site responsive and practical",
        text: "The site includes an About page with a Spline 3D viewer, a mobile navigation menu, and a contact form powered by Web3Forms.",
      },
    ],
    tags: ["HTML", "CSS", "JavaScript", "Spline", "Web3Forms"],
    mark: "H",
    tone: "warm",
    repository: "https://github.com/lovlynia/Hardscape",
    website: "https://www.phoenixstoneworksllc.com",
    websiteLabel: "Visit Phoenix Stoneworks",
  },
  {
    slug: "rag-chatbot",
    name: "RAG Chatbot",
    type: "CCSU IT · AI",
    description: "An internal prototype to improve Kaizer’s answers and help students find information from CCSU resources.",
    detail:
      "Built for Central Connecticut State University IT, the prototype pairs a React, Vite, and TypeScript chat frontend with a Python retrieval-augmented generation backend. The goal was to make Kaizer more useful to students by grounding answers in relevant CCSU information. Restricting the scraper to CCSU domains narrowed the source scope, though older pages on the domain could still surface.",
    motivationTitle: "More useful answers for students",
    motivation:
      "We built the prototype to make Kaizer more useful to students looking for CCSU information. The earlier chatbot could surface very old content, so we wanted answers grounded in relevant university sources instead of relying on a language model’s general knowledge. RAG retrieves matching source material before an answer is generated. Restricting the scraper to CCSU domains narrowed what Kaizer could draw from, but did not solve freshness by itself: outdated CCSU pages could still be retrieved.",
    workflowTitle: "From CCSU sources to student answers",
    notice:
      "This is a prototype intended for internal use only. All responses are AI-generated and do not represent the views of any group, department, individual, or organization.",
    tags: ["React", "TypeScript", "Python", "Redis", "Docling", "RAG"],
    mark: "K",
    tone: "blue",
    demo: ragChatbotDemo,
    repository: "https://github.com/lovlynia/ccsu-chatbot",
    workflow: [
      {
        title: "Keep the knowledge scope focused",
        text: "A web scraper collected pages from the CCSU domain so Kaizer could answer from university information instead of unrelated web content. The crawl could still encounter old CCSU pages, so source freshness remained an important limitation to address.",
      },
      {
        title: "Prepare documents for retrieval",
        text: "Docling helped process documents, then the content was chunked and embedded with sentence-transformers all-MiniLM-L6-v2. FAISS provided vector search over the prepared material.",
      },
      {
        title: "Ground answers in retrieved context",
        text: "Retrieval-augmented generation was used to find relevant CCSU passages for a student’s question and give the language model that context when composing an answer. The goal was to make Kaizer’s responses more relevant and useful than relying on a model’s general knowledge alone.",
      },
    ],
  },
  {
    slug: "ompa",
    name: "Ompa",
    type: "Animated character · Personal artwork",
    description: "An original animated character and recurring artwork in my portfolio.",
    detail:
      "Ompa is an original character brought to life through small looping GIF illustrations. The animations add a little personality to my portfolio and reflect the playful side of my work.",
    motivationTitle: "A little character with a lot of heart",
    motivation:
      "I created Ompa as a playful character to share alongside my software and visual art projects.",
    contribution: "Original character concept and animated GIF artwork.",
    tags: ["Character art", "Animation", "GIF"],
    mark: "☃",
    tone: "warm",
    demo: ompaArtwork.lots,
  },
];

export const projectOrder = ["bubble", "splita", "rag-chatbot", "hardscape"];
export const homeProjectOrder = ["bubble", "splita", "rag-chatbot", "hardscape"];
export const projects = projectOrder.map((slug) => projectCatalog.find((project) => project.slug === slug));
export const ompaProject = projectCatalog.find((project) => project.slug === "ompa");
export const homeProjects = homeProjectOrder.map((slug) => projects.find((project) => project.slug === slug));

// Architecture sketches use only technologies listed in each project's tags.
export const sketches = {
  bubble: {
    nodes: [
      { id: "app", x: 4, y: 58, t: "PWA|React 19 · Vite" },
      { id: "api", x: 132, y: 58, t: "API|Cloudflare Workers" },
      { id: "a", x: 262, y: 6, t: "Gemini|" },
      { id: "b", x: 262, y: 58, t: "ElevenLabs|" },
      { id: "c", x: 262, y: 110, t: "DeepSpace|" },
    ],
    edges: [["app", "api"], ["api", "a"], ["api", "b"], ["api", "c"]],
    note: "a note only unlocks when you reach its real place",
    code: "if (distance(me, note.place) <= RADIUS) note.unlock();",
  },
  splita: {
    nodes: [
      { id: "app", x: 4, y: 58, t: "app|Expo · React Native" },
      { id: "api", x: 132, y: 58, t: "flow|TypeScript" },
      { id: "s", x: 262, y: 20, t: "Stripe|payments" },
      { id: "w", x: 262, y: 98, t: "Apple Pay|Google Pay" },
    ],
    edges: [["app", "api"], ["api", "s"], ["api", "w"]],
    note: "everyone pays for their own items, upfront",
    code: "bill.items.forEach((i) => charge(i.owner, i.price));",
  },
  "rag-chatbot": {
    nodes: [
      { id: "d", x: 4, y: 14, t: "CCSU docs|sources" },
      { id: "dl", x: 132, y: 14, t: "Docling|parse" },
      { id: "r", x: 262, y: 58, t: "Redis|store" },
      { id: "ui", x: 4, y: 102, t: "chat UI|React · TS" },
      { id: "py", x: 132, y: 102, t: "retrieval|Python" },
    ],
    edges: [["d", "dl"], ["dl", "r"], ["ui", "py"], ["py", "r"]],
    note: "find the passage first, then answer",
    code: "answer = llm(question, retrieve(question, k=5))",
  },
  hardscape: {
    nodes: [
      { id: "v", x: 4, y: 58, t: "visitor|browser" },
      { id: "site", x: 132, y: 58, t: "site|HTML · CSS · JS" },
      { id: "sp", x: 262, y: 20, t: "Spline|3D" },
      { id: "f", x: 262, y: 98, t: "Web3Forms|contact" },
    ],
    edges: [["v", "site"], ["site", "sp"], ["site", "f"]],
    note: "a static, fast archive of finished work",
    code: "gallery.render(projects); // no server needed",
  },
};
