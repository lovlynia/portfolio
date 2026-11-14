import React, { useEffect, useRef, useState } from "react";
import { Chip } from "@mui/material";
import { BrowserRouter, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  artworks,
  education,
  experiences,
  featuredTechnologies,
  homeSummary,
} from "./portfolioData.js";

const ragChatbotDemo = new URL("../demos/demo.mp4", import.meta.url).href;

const projectCatalog = [
  {
    slug: "bubble",
    name: "Bubbl",
    type: "Mobile PWA · Location-based social",
    description: "A walk-first NYC discovery app where local notes unlock only when you reach their real-world locations.",
    detail:
      "Bubbl turns exploring New York City on foot into a way to discover what locals leave behind. Notes appear as blurred, category-colored map dots; their content stays sealed until you are within the location’s 15-meter pop radius. Popping a note can lead to a mutual connection and a private chat.",
    motivationTitle: "Help people discover a city by walking it",
    motivation:
      "Bubbl was built for the “Know Your City” hackathon track to offer a more local, walking-first alternative to searching through tourist guides. People share small notes tied to real places, then discover them by being there. The physical act of reaching a spot and popping its note makes exploration feel intentional, while mutual waves can turn a shared discovery into a private conversation.",
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
];

const projectOrder = ["bubble", "splita", "rag-chatbot", "hardscape"];
const projects = projectOrder.map((slug) => projectCatalog.find((project) => project.slug === slug));

const navItems = [
  { label: "Home", sub: "The overview", icon: "⌂", path: "/" },
  { label: "Work", sub: "Experience & growth", icon: "▤", path: "/work" },
  { label: "Projects", sub: "Things I've built", icon: "✳", path: "/projects" },
  { label: "Studio", sub: "Art and experiments", icon: "◌", path: "/studio" },
  { label: "About Me", sub: "Life beyond code", icon: "❄", path: "/about" },
];

function Glyph({ name, className = "" }) {
  const paths = {
    snow: <path d="M12 2v20M4.93 4.93l14.14 14.14M2 12h20M4.93 19.07 19.07 4.93M8.5 3.8 12 7l3.5-3.2M8.5 20.2 12 17l3.5 3.2M3.8 8.5 7 12l-3.2 3.5m16.4-7L17 12l3.2 3.5" />,
    music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
    mountain: <><path d="m3 20 7-14 4 8 2-4 5 10H3Z" /><path d="m8 10 2 2 2-2" /></>,
    repeat: <><path d="m17 2 4 4-4 4" /><path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4" /><path d="M21 13v2a3 3 0 0 1-3 3H3" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  };
  return (
    <svg
      aria-hidden="true"
      className={`glyph ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const interests = [
  { icon: <Glyph name="music" />, mark: "♫", title: "Music", sub: "Always on repeat" },
  { icon: "♘", mark: "♘", title: "Chess", sub: "Strategy & patience" },
  { icon: <Glyph name="mountain" />, mark: "♧", title: "Snowboarding", sub: "New hobby, big dreams" },
  { icon: "◉", mark: "✿", title: "Art", sub: "Colors, textures, thoughts" },
];

function SectionHero({ label, title, description, meta, variant = "projects" }) {
  return (
    <header className={`section-hero section-hero-${variant}`}>
      <div className="section-hero-art" aria-hidden="true">
        <span className="section-hero-moon" />
        <span className="section-hero-ridge ridge-back" />
        <span className="section-hero-ridge ridge-front" />
        <span className="section-hero-pines">♠　♠ ♠　♠　♠</span>
        <span className="section-hero-stars">✧　·　✳　·　✧</span>
      </div>
      <div className="section-hero-content">
        <span className="section-hero-label">{label}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {meta && <div className="section-hero-meta"><span className="section-hero-snow">❄</span>{meta}</div>}
      </div>
    </header>
  );
}

function FeaturedArtwork() {
  const [activeIndex, setActiveIndex] = useState(0);
  const artwork = artworks[activeIndex];

  useEffect(() => {
    if (artworks.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % artworks.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const selectArtwork = (direction) => {
    setActiveIndex((index) => (index + direction + artworks.length) % artworks.length);
  };

  return (
    <section
      className="hero-banner featured-artwork-banner"
      style={{ "--artwork-background": artwork?.backgroundColor ?? "#263b58" }}
      aria-label="Featured artwork"
    >
      <div className="featured-artwork-stage">
        {artwork ? (
          <img
            key={artwork.image}
            className="featured-artwork-image"
            src={artwork.image}
            alt={artwork.alt || artwork.title}
          />
        ) : (
          <div className="featured-artwork-empty">
            <span className="eyebrow">A GALLERY IN THE MAKING</span>
            <span className="featured-artwork-empty-mark" aria-hidden="true">✳</span>
            <p>Featured artwork will live here</p>
          </div>
        )}
      </div>
      <div className="featured-artwork-caption">
        <span className="eyebrow">FEATURED ARTWORK</span>
        <h1>{artwork?.title || "Your paintings, up front"}</h1>
        {artwork?.medium && <p>{artwork.medium}</p>}
      </div>
      {artworks.length > 1 && (
        <div className="artwork-carousel-controls" aria-label="Artwork carousel controls">
          <button type="button" onClick={() => selectArtwork(-1)} aria-label="Previous artwork">‹</button>
          <span>{String(activeIndex + 1).padStart(2, "0")} / {String(artworks.length).padStart(2, "0")}</span>
          <button type="button" onClick={() => selectArtwork(1)} aria-label="Next artwork">›</button>
        </div>
      )}
    </section>
  );
}

function TypewriterGreeting() {
  const greeting = "Hi, I’m Stephanie Abundio.";
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCharacters(greeting.length);
      return undefined;
    }

    const timer = window.setInterval(() => {
      setVisibleCharacters((visible) => {
        if (visible >= greeting.length) {
          window.clearInterval(timer);
          return visible;
        }
        return visible + 1;
      });
    }, 75);

    return () => window.clearInterval(timer);
  }, []);

  const greetingPrefix = "Hi, I’m ";
  const typedPrefix = greeting.slice(0, Math.min(visibleCharacters, greetingPrefix.length));
  const typedName = greeting.slice(greetingPrefix.length, visibleCharacters);

  return (
    <h2 aria-label={greeting}>
      <span aria-hidden="true">
        {typedPrefix}
        <span className="greeting-name">{typedName}</span>
        <span className="greeting-caret" />
      </span>
    </h2>
  );
}

function AwardRibbon({ inline = false }) {
  return (
    <span className={`award-ribbon ${inline ? "award-ribbon-inline" : ""}`} aria-label="Two-time hackathon winner">
      <svg viewBox="0 0 32 28" aria-hidden="true">
        <path d="M15.9 10.2C10.8 2.4 2.7 5.3 6.1 10.7c1.7 2.7 6.5 2.3 9.8-.5Zm.2 0c5.1-7.8 13.2-4.9 9.8.5-1.7 2.7-6.5 2.3-9.8-.5Z" />
        <path d="m13.9 11.4-5.3 13 7.4-3.1 1.8-8.8m4.3 11.9-7.2-3.1" />
        <circle cx="16" cy="10.5" r="2.2" />
      </svg>
      <span>2× WINNER</span>
    </span>
  );
}

function ProjectTags({ tags }) {
  return (
    <div className="project-tags">
      {tags.map((tag) => <span className="mini-tag" key={tag}>{tag}</span>)}
    </div>
  );
}

function ProjectMedia({ project, expanded = false }) {
  const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(project.demo);
  const className = expanded ? "demo-lightbox-media" : "playback-demo";

  return isVideo ? (
    <video
      className={className}
      src={project.demo}
      autoPlay
      muted
      loop
      playsInline
      controls={expanded}
    />
  ) : (
    <img
      className={className}
      src={project.demo}
      alt={`${project.name} demo${expanded ? " full size" : ""}`}
    />
  );
}

function ProjectCard({ project, onOpen }) {
  return (
    <button
      type="button"
      className="project-card"
      onClick={() => onOpen(project)}
      aria-label={`Open ${project.name} project`}
    >
      {project.award && <AwardRibbon />}
      <span className={`project-art art-${project.tone}`} aria-hidden="true">
        <span className="art-glow" />
        <span className="art-mark">{project.mark}</span>
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />
        <span className="art-snow">✳　·　✧　·</span>
      </span>
      <span className="project-card-content">
        <span className="project-card-heading">
          <span>
            <span className="project-type">{project.type}</span>
            {project.award && <span className="project-award-label">{project.award}</span>}
            <span className="project-name">{project.name}</span>
          </span>
          <Glyph name="arrow" className="project-arrow" />
        </span>
        <span className="project-description">{project.description}</span>
        <ProjectTags tags={project.tags} />
      </span>
    </button>
  );
}

function ProjectPlayback({ project, onNext }) {
  const isRagChatbot = project.slug === "rag-chatbot";
  const [demoExpanded, setDemoExpanded] = useState(false);
  const expandDemoButton = useRef(null);
  const closeDemoButton = useRef(null);

  useEffect(() => {
    if (!demoExpanded) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setDemoExpanded(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeDemoButton.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      expandDemoButton.current?.focus();
    };
  }, [demoExpanded]);

  return (
    <aside className={`right-rail project-playback-panel ${isRagChatbot ? "rag-playback-panel" : ""}`}>
      {!isRagChatbot && (
        <>
          <div className="playback-panel-heading">
            <span className="eyebrow">NOW EXPLORING</span>
            <span className={`playback-project-art art-${project.tone}`} aria-hidden="true">{project.mark}</span>
          </div>
          <h1>{project.name}</h1>
          {project.award && <span className="playback-award">{project.award}</span>}
          <p className="playback-project-detail">{project.detail}</p>
          {project.notice && <p className="project-notice">{project.notice}</p>}
          <div className="playback-heading">
            <span><Glyph name="repeat" /> Demo loop</span>
            <span className="playback-preview-label">PROJECT PREVIEW</span>
          </div>
        </>
      )}
      <div className="playback-stage" aria-label={`${project.name} demo playback`}>
        {project.demo && <ProjectMedia project={project} />}
        {project.demo && (
          <button
            ref={expandDemoButton}
            type="button"
            className="playback-expand-button"
            onClick={() => setDemoExpanded(true)}
            aria-label={`View ${project.name} demo full size`}
          >
            <span>View full size ↗</span>
          </button>
        )}
        <div className="stage-corners" aria-hidden="true"><span /><span /><span /><span /></div>
      </div>
      <div className="playback-stage-meta">
        <span>DEMO <i /> LOOP</span>
        <span>GIF / VIDEO</span>
      </div>
      <div className="playback-panel-info">
        <span className="eyebrow">{project.type}</span>
        <p>{project.description}</p>
        <span className="eyebrow">BUILT WITH</span>
        <ProjectTags tags={project.tags} />
      </div>
      {!isRagChatbot && (
        <button type="button" className="next-project-button" onClick={onNext}>
          Next project <Glyph name="arrow" />
        </button>
      )}
      {demoExpanded && (
        <div
          className="demo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} demo full size`}
          onClick={(event) => {
            if (event.target === event.currentTarget) setDemoExpanded(false);
          }}
        >
          <div className="demo-lightbox-content">
            <button
              ref={closeDemoButton}
              type="button"
              className="demo-lightbox-close"
              onClick={() => setDemoExpanded(false)}
              aria-label="Close full-size demo"
            >
              ×
            </button>
            <ProjectMedia project={project} expanded />
          </div>
        </div>
      )}
    </aside>
  );
}

function ProjectLibrary({ project, onSelect }) {
  return (
    <section className="project-library">
      <SectionHero
        variant="projects"
        label="PROJECT LIBRARY"
        title="Projects"
        description="A collection of things I’ve been dreaming up and building."
        meta={`${projects.length} projects · selected work`}
      />
      <div className="project-list-header">
        <span>#</span><span>Project</span><span>Type</span><span>Built with</span>
      </div>
      <div className="project-list">
        {projects.map((item, index) => (
          <button
            type="button"
            className={`project-list-row ${project.slug === item.slug ? "selected" : ""}`}
            key={item.slug}
            onClick={() => onSelect(item)}
            aria-current={project.slug === item.slug ? "page" : undefined}
          >
            <span className="project-list-index">{project.slug === item.slug ? "♫" : String(index + 1).padStart(2, "0")}</span>
            <span className="project-list-title">
              <span className={`project-list-cover art-${item.tone}`}>{item.mark}</span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
                {item.award && <span className="project-list-award"><AwardRibbon inline /></span>}
              </span>
            </span>
            <span className="project-list-type">{item.type}</span>
            <span className="project-list-tags">{item.tags.slice(0, 2).join(" · ")}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProjectDetails({ project, onBack }) {
  return (
    <article className="project-detail-page">
      <button type="button" className="project-detail-back" onClick={onBack}>
        <span aria-hidden="true">←</span> All projects
      </button>
      <SectionHero
        variant={`project-${project.tone}`}
        label={project.type}
        title={project.name}
        description={project.detail}
        meta={project.award || `${project.tags.length} technologies · project notes`}
      />
      {!project.workflow && (
        <div className={`project-detail-art art-${project.tone}`} aria-hidden="true">
          <span className="detail-art-glow" />
          <span>{project.mark}</span>
          <i />
          <i />
        </div>
      )}
      <section className="project-detail-copy">
        <span className="eyebrow">{project.motivation ? "WHY WE BUILT IT" : "ABOUT THIS PROJECT"}</span>
        <h2>{project.motivationTitle || `A little more about ${project.name}`}</h2>
        <p>{project.description}</p>
        {project.motivation && <p>{project.motivation}</p>}
        {project.notice && <p className="project-notice">{project.notice}</p>}
      </section>
      {project.workflow && (
        <section className="project-workflow" aria-labelledby="project-workflow-title">
          <span className="eyebrow">HOW IT WAS BUILT</span>
          <h2 id="project-workflow-title">{project.workflowTitle || `How ${project.name} was built`}</h2>
          <div className="project-workflow-steps">
            {project.workflow.map((step, index) => (
              <article className="project-workflow-step" key={step.title}>
                <span className="project-workflow-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      {project.contribution && (
        <section className="project-contribution">
          <span className="eyebrow">MY CONTRIBUTION</span>
          <p>{project.contribution}</p>
        </section>
      )}
      <section className="project-detail-stack">
        <span className="eyebrow">BUILT WITH</span>
        <ProjectTags tags={project.tags} />
        {project.repository && (
          <a className="project-repository-link" href={project.repository} target="_blank" rel="noreferrer">
            View source on GitHub ↗
          </a>
        )}
        {project.website && (
          <a className="project-repository-link" href={project.website} target="_blank" rel="noreferrer">
            {project.websiteLabel || `Visit ${project.name}`} ↗
          </a>
        )}
      </section>
    </article>
  );
}

function WorkPage() {
  return (
    <section className="standalone-page">
      <SectionHero
        variant="work"
        label="MY EXPERIENCE"
        title="Work"
        description="Software engineering, AI research, and systems work across industry, university, and community projects."
        meta={`${experiences.length} roles · ${education.length} schools`}
      />
      <ExperienceList />
      <section className="education-section" aria-labelledby="education-heading">
        <span className="eyebrow">EDUCATION</span>
        <h2 id="education-heading">Learning & study</h2>
        <div className="education-list">
          {education.map((item) => (
            <article className="education-item" key={item.institution}>
              <div><h3>{item.institution}</h3><p>{item.credential}</p></div>
              <div><span>{item.location}</span><small>{item.date}</small></div>
            </article>
          ))}
        </div>
      </section>
      <section className="resume-card" aria-labelledby="resume-heading">
        <div>
          <span className="eyebrow">WANT THE FULL OVERVIEW?</span>
          <h2 id="resume-heading">Resume</h2>
          <p>Print this page or save it as a PDF from your browser.</p>
        </div>
        <button type="button" className="resume-button" onClick={() => window.print()}>
          Print / Save as PDF <Glyph name="arrow" />
        </button>
      </section>
    </section>
  );
}

function StudioPage() {
  return (
    <section className="standalone-page">
      <SectionHero
        variant="studio"
        label="THE LITTLE SIDE QUESTS"
        title="Studio"
        description="Experiments, sketches, and ideas that start with “what if?”"
        meta="Studies · Sketches · Small ideas"
      />
      <div className="studio-grid">
        {[
          ["01", "Generative snowfall", "A tiny study in particles, movement, and winter light.", "aurora"],
          ["02", "Interface sketches", "Small UI explorations for products that feel human.", "blue"],
          ["03", "Color & quiet", "A visual notebook of palettes, places, and textures.", "violet"],
        ].map(([number, title, description, tone]) => (
          <article className="studio-card" key={number}>
            <div className={`studio-art art-${tone}`}><span>{number}</span></div>
            <span className="eyebrow">EXPERIMENT {number}</span>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="standalone-page about-page">
      <SectionHero
        variant="about"
        label="LIFE BEYOND CODE"
        title="A little about me"
        description={homeSummary}
        meta="Music · Chess · Snowboarding · Art"
      />
      <div className="about-card">
        <div className="about-ompa">☃</div>
        <div><h2>A little more about me</h2><p>Outside of building software, you’ll find me listening to music, learning chess, finding my feet on a snowboard, or making a mess with paint.</p>
          <div className="about-interests">
            {interests.map((interest) => (
              <span key={interest.title}><span aria-hidden="true">{interest.mark}</span> {interest.title}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const navigate = useNavigate();
  const location = useLocation();

  const routeProjectSlug = location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const activeProject = projects.find((project) => project.slug === routeProjectSlug) ?? null;
  const isProjectPage = location.pathname.startsWith("/projects");
  const isRagChatbotPage = activeProject?.slug === "rag-chatbot";
  const activePage = navItems.find((item) =>
    item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path),
  )?.label ?? "Home";

  useEffect(() => {
    document.title = activeProject
      ? `${activeProject.name} — Projects | Your Name`
      : `${activePage} | Your Name`;
  }, [activePage, activeProject]);
  const navigateTo = (item) => {
    navigate(item.path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProject = (project) => {
    navigate(`/projects/${project.slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const moveToNextProject = () => {
    const currentIndex = projects.indexOf(activeProject);
    navigate(`/projects/${projects[(currentIndex + 1) % projects.length].slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`app-shell ${isProjectPage ? "app-shell-projects" : ""} ${isRagChatbotPage ? "app-shell-project-rag" : ""}`}>
      <aside className="sidebar">
        <NavLink className="brand" to="/" onClick={() => window.scrollTo({ top: 0 })}>
          <span className="brand-mark"><Glyph name="snow" /></span>
          <span>yourname<span className="brand-domain">.dev</span></span>
        </NavLink>

        <nav className="primary-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-copy">
                <span>{item.label}</span>
                <small>{item.sub}</small>
              </span>
            </NavLink>
          ))}
        </nav>

      </aside>

      <main className="main-content" id="home">
        {isProjectPage ? (
          activeProject ? (
            <ProjectDetails project={activeProject} onBack={() => navigate("/projects")} />
          ) : (
            <ProjectLibrary project={projects[0]} onSelect={openProject} />
          )
        ) : location.pathname.startsWith("/work") ? (
          <WorkPage />
        ) : location.pathname.startsWith("/studio") ? (
          <StudioPage />
        ) : location.pathname.startsWith("/about") ? (
          <AboutPage />
        ) : (
          <>
        <FeaturedArtwork />

        <section className="intro-section" id="about">
          <div className="intro-copy">
            <span className="eyebrow">OVERVIEW / 2026</span>
            <TypewriterGreeting />
            <p>{homeSummary}</p>
          </div>
          <div className="intro-doodle" aria-hidden="true">
            <span>building<br />cool things</span>
            <span className="doodle-ompa">☃</span>
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <div><span className="eyebrow">A FEW FAVORITES</span><h2>Featured projects</h2></div>
            <button type="button" className="text-link" onClick={() => navigateTo(navItems[2])}>View all <Glyph name="arrow" /></button>
          </div>
          <div className="row g-3 project-grid">
            {projects.map((project) => (
              <div className="col-12 col-sm-6 col-xl-3" key={project.name}>
                <ProjectCard project={project} onOpen={openProject} />
              </div>
            ))}
          </div>
        </section>

        <div className="row g-4 lower-sections">
          <section className="col-12 col-lg-7" id="experience">
            <div className="section-heading lower-heading">
              <div><span className="eyebrow">THE JOURNEY SO FAR</span><h2>Experience</h2></div>
              <button type="button" className="text-link" onClick={() => navigateTo(navItems[1])}>All experience <Glyph name="arrow" /></button>
            </div>
            <ExperienceList compact />
          </section>
          <section className="col-12 col-lg-5" id="studio">
            <div className="section-heading lower-heading">
              <div><span className="eyebrow">TECHNOLOGIES I’VE BEEN WORKING WITH</span><h2>Technologies</h2></div>
              <span className="skill-count">{featuredTechnologies.length}</span>
            </div>
            <div className="skills-panel">
              <div className="skills-cloud">
                {featuredTechnologies.map((skill) => (
                  <Chip key={skill} label={skill} size="small" className="skill-chip" />
                ))}
              </div>
            </div>
          </section>
        </div>
        <footer className="main-footer">Made with care & a little snowfall <span>✳</span> © 2026</footer>
          </>
        )}
      </main>

      {isProjectPage ? (
        <ProjectPlayback project={activeProject ?? projects[0]} onNext={moveToNextProject} />
      ) : <aside className="right-rail">
        <h2>A little more</h2>
        <section className="rail-section interests">
          <span className="eyebrow">CURRENTLY INTO</span>
          {interests.map((interest) => (
            <Interest key={interest.title} {...interest} />
          ))}
        </section>

        <section className="rail-card winter-note">
          <div className="rail-card-heading"><Glyph name="snow" /><strong>Winter notes</strong><span>✧</span></div>
          <div className="cabin-art"><span>⌂</span><span>✳　✧　✳</span></div>
          <p>Cold days, good music,<br />new ideas.</p>
        </section>

        <section className="rail-card ompa-card">
          <div className="rail-card-heading"><span className="chat-icon">♡</span><strong>A note from Ompa</strong></div>
          <div className="ompa-scene" aria-label="Ompa the snow friend">
            <span className="ompa-stars">✳　✦　✳</span>
            <span className="ompa-character">☃</span>
          </div>
          <p>Keep going.<br />You’re doing great.</p>
          <span className="ompa-heart">♥</span>
        </section>

        <section className="rail-card calendar-card">
          <div className="calendar-title"><span>◷</span><strong>December 2026</strong><span>›</span></div>
          <div className="calendar-grid calendar-days">{["S", "M", "T", "W", "T", "F", "S"].map((day, i) => <span key={`${day}${i}`}>{day}</span>)}</div>
          <div className="calendar-grid calendar-dates">{["", "", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "", ""].map((date, i) => <span className={date === "14" ? "today" : ""} key={`${date}-${i}`}>{date}</span>)}</div>
          <div className="calendar-footer">❄ <span>slow down & enjoy</span> ❄</div>
        </section>
      </aside>}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Portfolio />
    </BrowserRouter>
  );
}

function Experience({ icon = "◌", title, place, location, date, highlights = [], compact = false }) {
  return (
    <div className={`experience-item ${compact ? "experience-item-compact" : ""}`}>
      <span className="experience-icon">
        {icon.startsWith("/") ? (
          <img src={icon} alt={`${place} logo`} />
        ) : (
          icon
        )}
      </span>

      <div className="experience-copy">
        <div className="experience-meta">
          <strong>{title}</strong>
          <span>{place}</span>
          {location && <span>{location}</span>}
          <small>{date}</small>
        </div>
        <ul className="experience-highlights">
          {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      </div>
    </div>
  );
}

function ExperienceList({ compact = false }) {
  return (
    <div className={compact ? "experience-card" : "experience-card standalone-experience"}>
      {experiences.map((experience) => (
        <Experience
          key={`${experience.place}-${experience.title}`}
          compact={compact}
          {...experience}
        />
      ))}
    </div>
  );
}

function Interest({ icon, title, sub }) {
  return (
    <div className="interest-item">
      <span className="interest-icon">{icon}</span>
      <span><strong>{title}</strong><small>{sub}</small></span>
    </div>
  );
}

export default App;
