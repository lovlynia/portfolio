import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { education, experiences, featuredTechnologies, homeSummary, ompaArtwork } from "./portfolioData.js";
import { fetchPortfolioLikes, isPortfolioLikesConfigured, likePortfolio } from "./portfolioLikes.js";
import { artworkThemes } from "./artworkThemes.js";
import { homeProjects, ompaProject, projects } from "./projects.js";
import {
  ArtStore,
  Brush,
  Cover,
  Divider,
  Emblem,
  Footer,
  Heading,
  Intro,
  Link,
  Notebook,
  Snowflake,
  SvgDefs,
} from "./atelierParts.jsx";
import "./tokens.css";
import "./atelier.css";
import "./atelier-extras.css";

const likesApiConfigured = isPortfolioLikesConfigured();
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const navItems = [
  { label: "Home", sub: "The overview", path: "/" },
  { label: "Work", sub: "Experience & growth", path: "/work" },
  { label: "Projects", sub: "Things I've built", path: "/projects" },
  { label: "Studio", sub: "Art and experiments", path: "/studio" },
  { label: "About Me", sub: "Life beyond code", path: "/about" },
];

const interests = [
  { mark: "♫", title: "Music", sub: "Always on repeat" },
  { mark: "♘", title: "Chess", sub: "Strategy & patience" },
  { mark: "♧", title: "Snowboarding", sub: "New hobby, big dreams" },
  { mark: "✿", title: "Art", sub: "Colors, textures, thoughts" },
];

const calendarWeekdays = ["S", "M", "T", "W", "T", "F", "S"];

function CalendarWidget() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(today);
  const leadingDays = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today.getDate();

  return (
    <section className="at-cal" aria-label={`${monthLabel} calendar`}>
      <small>{monthLabel}</small>
      <div aria-hidden="true">
        {calendarWeekdays.map((day, index) => (
          <b key={`${day}-${index}`}>{day}</b>
        ))}
      </div>
      <div>
        {Array.from({ length: leadingDays }, (_, index) => (
          <span key={`empty-${index}`} aria-hidden="true" />
        ))}
        {Array.from({ length: daysInMonth }, (_, index) => {
          const date = index + 1;
          const isToday = date === todayDate;
          return (
            <time
              className={isToday ? "today" : ""}
              dateTime={`${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`}
              aria-current={isToday ? "date" : undefined}
              key={date}
            >
              {date}
            </time>
          );
        })}
      </div>
      <p className="at-cal-foot">❄ slow down & enjoy ❄</p>
    </section>
  );
}

const projectStickers = { bubble: ompaArtwork.sip };

function Sticker({ src, className = "" }) {
  return (
    <span className={`at-sticker ${className}`} aria-hidden="true">
      <img src={src} alt="" />
    </span>
  );
}

function AwardStamp({ inline = false }) {
  return (
    <span className={`at-ribbon ${inline ? "at-ribbon-inline" : ""}`} aria-label="Two-time hackathon winner">
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
    <ul className="at-labels">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ProjectMedia({ project, expanded = false }) {
  const isVideo = /\.(mp4|webm|ogg)(\?.*)?$/i.test(project.demo);
  const className = expanded ? "demo-lightbox-media" : "playback-demo";

  return isVideo ? (
    <video
      className={className}
      src={project.demo}
      ref={(video) => {
        if (video) {
          video.muted = true;
          video.play().catch(() => {});
        }
      }}
      autoPlay
      muted
      loop
      playsInline
      controls={expanded}
    />
  ) : (
    <img className={className} src={project.demo} alt={`${project.name} demo${expanded ? " full size" : ""}`} />
  );
}

function DemoWindow({ project }) {
  return (
    <div className="at-demo-window">
      {project.demo ? (
        <ProjectMedia project={project} />
      ) : (
        <div className="at-demo-empty" aria-hidden="true">
          <Emblem slug={project.slug} />
          <span>{project.mark}</span>
        </div>
      )}
    </div>
  );
}

function ProjectIndex({ items, onOpen }) {
  return (
    <div className="at-index at-playlist">
      <div className="at-playlist-head" aria-hidden="true">
        <span>#</span>
        <span>Project</span>
        <span>Type</span>
        <span>Built with</span>
      </div>
      <ol>
        {items.map((item, i) => (
          <li key={item.slug}>
            <button type="button" onClick={() => onOpen(item)} aria-label={`Open ${item.name} project`}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <span className="t">
                <span className="name">{item.name}</span>
                <span className="kind">{item.description}</span>
                {item.award && <AwardStamp inline />}
              </span>
              <span className="at-track-type">{item.type}</span>
              <span className="at-track-tags">{item.tags.slice(0, 2).join(" · ")}</span>
              <Emblem slug={item.slug} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectCards({ items, onOpen }) {
  return (
    <ul className="at-cards">
      {items.map((item, i) => (
        <li key={item.slug}>
          <button type="button" className={`at-card c${i % 4}`} onClick={() => onOpen(item)} aria-label={`Open ${item.name} project`}>
            <span className="at-card-cover">
              <span className="at-card-no">{String(i + 1).padStart(2, "0")}</span>
              <Emblem slug={item.slug} />
              {projectStickers[item.slug] && <Sticker src={projectStickers[item.slug]} className="on-card" />}
              <span className="at-card-play" aria-hidden="true">
                ▶
              </span>
            </span>
            <span className="at-card-name">{item.name}</span>
            <span className="at-card-kind">{item.type}</span>
            <span className="at-card-desc">{item.description}</span>
            {item.award && <AwardStamp />}
          </button>
        </li>
      ))}
    </ul>
  );
}

function ExperienceLedger({ compact = false }) {
  return (
    <ol className={`at-ledger ${compact ? "" : "at-ledger-full"}`}>
      {experiences.map((item) => (
        <li key={`${item.place}-${item.title}`}>
          <span className="date">{item.date}</span>
          <div>
            <h3>{item.title}</h3>
            <p className="org">
              {item.icon && <img className="at-org-logo" src={item.icon} alt={`${item.place} logo`} />}
              {compact ? item.place : `${item.place} · ${item.location}`}
            </p>
            {!compact && (
              <ul className="at-highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function HomePage({ art, artIndex, setArtIndex, onOpenProject }) {
  return (
    <>
      <section className="at-section at-first" aria-label="Featured artwork">
        <p className="at-hand at-featured-label">FEATURED ARTWORK</p>
        <ArtStore art={art} artIndex={artIndex} setArtIndex={setArtIndex} />
      </section>

      <section className="at-letter" id="about">
        <span className="sk-draw" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <u />
          <b />
        </span>
        <span className="tape" />
        <div>
          <p className="at-hand">OVERVIEW / 2026</p>
          <h2>
            Hi, I’m{" "}
            <span className="paint">
              <Brush v={0} />
              <span>Stephanie Abundio</span>
            </span>
            .
          </h2>
          <p>{homeSummary}</p>
          <p className="at-sign">
            building
            <br />
            cool things
          </p>
        </div>
        <div className="at-ompa">
          <img src={ompaArtwork.snowman} alt="" />
        </div>
      </section>

      <Divider v={1} />
      <section className="at-section at-tight at-board" id="projects">
        <Sticker src={ompaArtwork.squish} className="on-featured" />
        <Heading
          kicker="A FEW FAVORITES"
          link={
            <Link to="/projects" className="at-link">
              View all
            </Link>
          }
        >
          Featured projects
        </Heading>
        <div className="at-box at-crochet at-projbox">
          <ProjectCards items={homeProjects} onOpen={onOpenProject} />
        </div>
      </section>

      <Divider />
      <section className="at-section at-two at-tight">
        <div className="at-box at-crochet" id="experience">
          <Heading
            kicker="THE JOURNEY SO FAR"
            link={
              <Link to="/work" className="at-link">
                All experience
              </Link>
            }
          >
            Experience
          </Heading>
          <ExperienceLedger compact />
        </div>
        <div className="at-box at-crochet at-techbox" id="studio">
          <Sticker src={ompaArtwork.tired} className="on-tech" />
          <Heading kicker="TECHNOLOGIES I’VE BEEN WORKING WITH">Technologies</Heading>
          <ul className="at-tech">
            {featuredTechnologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}

function WorkPage() {
  const [selected, setSelected] = useState(0);
  const role = experiences[selected];
  return (
    <>
      <Cover
        kicker="MY EXPERIENCE"
        title="Work"
        meta={`${experiences.length} roles · ${education.length} schools`}
      >
        Software engineering, AI research, and systems work across industry, university, and community
        projects.
      </Cover>
      <section className="at-section at-workgrid">
        <div className="at-roles-col">
        <ol className="at-roles">
          {experiences.map((item, i) => (
            <li key={`${item.place}-${item.title}`}>
              <button
                type="button"
                className={selected === i ? "on" : ""}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                <span className="knot" />
                <small>{item.date}</small>
                <b>{item.title}</b>
                <em>{item.place}</em>
              </button>
            </li>
          ))}
        </ol>
        <Sticker src={ompaArtwork.speaker} className="paper flow" />
        </div>
        <article className="at-role at-crochet" key={selected} aria-live="polite">
          <p className="at-hand">
            role {String(selected + 1).padStart(2, "0")} of {String(experiences.length).padStart(2, "0")}
          </p>
          <h2>{role.title}</h2>
          <dl>
            <div>
              <dt>where</dt>
              <dd>
                {role.icon && <img className="at-org-logo" src={role.icon} alt={`${role.place} logo`} />}
                {role.place}, {role.location}
              </dd>
            </div>
            <div>
              <dt>when</dt>
              <dd>{role.date}</dd>
            </div>
          </dl>
          <h3>What I did</h3>
          <ul className="at-highlights">
            {role.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </article>
      </section>
      <section className="at-section at-two" aria-labelledby="education-heading">
        <div>
          <Heading kicker="EDUCATION">
            <span id="education-heading">Learning & study</span>
          </Heading>
        </div>
        <ul className="at-edu">
          {education.map((item) => (
            <li key={item.institution}>
              <b>{item.institution}</b>
              <span>{item.credential}</span>
              <small>
                {item.location} · {item.date}
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className="at-section">
        <div className="at-box at-crochet at-resume" aria-labelledby="resume-heading">
          <div>
            <p className="at-hand">WANT THE FULL OVERVIEW?</p>
            <h2 id="resume-heading">Resume</h2>
            <p>Print this page or save it as a PDF from your browser.</p>
          </div>
          <button type="button" className="at-button" onClick={() => window.print()}>
            Print / Save as PDF →
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ProjectsPage({ onOpenProject }) {
  return (
    <>
      <Cover
        kicker="PROJECT LIBRARY"
        title="Projects"
        meta={`${projects.length} projects · selected work`}
        stickers={<Sticker src={ompaArtwork.heart} className="paper flow" />}
      >
        A collection of things I’ve been dreaming up and building.
      </Cover>
      <section className="at-section at-tight">
        <div className="at-box at-crochet at-projbox">
          <ProjectIndex items={projects} onOpen={onOpenProject} />
        </div>
      </section>
      <Footer />
    </>
  );
}

function ProjectDetails({ project }) {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        className="at-back"
        onClick={() => {
          navigate("/projects");
          window.scrollTo(0, 0);
        }}
      >
        <span aria-hidden="true">←</span> All projects
      </button>
      <Cover
        kicker={project.type}
        title={project.name}
        meta={project.award || `${project.tags.length} technologies · project notes`}
      >
        {project.detail}
      </Cover>
      <section className="at-section at-tight">
        <div className="at-box at-crochet at-article">
          {projectStickers[project.slug] && <Sticker src={projectStickers[project.slug]} className="on-article" />}
          <p className="at-hand">{project.motivation ? "WHY WE BUILT IT" : "ABOUT THIS PROJECT"}</p>
          <h2>{project.motivationTitle || `A little more about ${project.name}`}</h2>
          <p>{project.description}</p>
          {project.motivation && <p>{project.motivation}</p>}
          {project.notice && <p className="at-notice">{project.notice}</p>}
        </div>
      </section>
      {project.workflow && (
        <section className="at-section at-tight" aria-labelledby="project-workflow-title">
          <div className="at-box at-crochet at-article">
            <p className="at-hand">HOW IT WAS BUILT</p>
            <h2 id="project-workflow-title">{project.workflowTitle || `How ${project.name} was built`}</h2>
            <ol className="at-steps">
              {project.workflow.map((step, index) => (
                <li key={step.title}>
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}
      <section className="at-section at-tight">
        <div className="at-box at-crochet at-article">
          {project.contribution && (
            <>
              <p className="at-hand">MY CONTRIBUTION</p>
              <p>{project.contribution}</p>
            </>
          )}
          <p className="at-hand">BUILT WITH</p>
          <ProjectTags tags={project.tags} />
          <div className="at-linkrow">
            {project.repository && (
              <a className="at-button" href={project.repository} target="_blank" rel="noreferrer">
                View source on GitHub ↗
              </a>
            )}
            {project.website && (
              <a className="at-button" href={project.website} target="_blank" rel="noreferrer">
                {project.websiteLabel || `Visit ${project.name}`} ↗
              </a>
            )}
          </div>
        </div>
      </section>
      <section className="at-section at-tight at-notebook-wrap">
        <Notebook project={project} />
      </section>
      <Footer />
    </>
  );
}

const studioPieces = [
  { id: "ompa", name: "Ompa" },
  { id: "artwork-1", name: "Artwork" },
  { id: "artwork-2", name: "Artwork" },
];

function StudioPage() {
  const [active, setActive] = useState(0);
  const [rotating, setRotating] = useState(() => !prefersReducedMotion());

  useEffect(() => {
    if (!rotating) return undefined;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % studioPieces.length), 7000);
    return () => window.clearInterval(timer);
  }, [rotating]);

  const choose = (index) => {
    setRotating(false);
    setActive(index);
  };

  return (
    <>
      <Cover
        kicker="THE LITTLE SIDE QUESTS"
        title="Studio"
        meta="Studies · Sketches · Small ideas"
        stickers={
          <>
            <Sticker src={ompaArtwork.sleepy} className="paper flow" />
            <Sticker src={ompaArtwork.kick} className="paper flow" />
          </>
        }
      >
        Experiments, sketches, and ideas that start with “what if?”
      </Cover>
      <section className="at-section at-tight">
        <div className="at-trio at-pieces" role="tablist" aria-label="Studio pieces">
          {studioPieces.map((piece, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`at-box at-crochet at-piece ${active === index ? "on" : ""}`}
              key={piece.id}
              onClick={() => choose(index)}
            >
              <span className="at-hand">{String(index + 1).padStart(2, "0")}</span>
              <span className="at-piece-thumb">
                {piece.id === "ompa" ? <Emblem slug="ompa" /> : <span className="at-blank" />}
              </span>
              <h2>{piece.name}</h2>
            </button>
          ))}
        </div>
      </section>
      <section className="at-section at-two at-tight at-ompa-studio" key={active} aria-live="polite">
        {active === 0 ? (
          <>
            <div>
              <Heading kicker={ompaProject.type.toUpperCase()}>{ompaProject.name}</Heading>
              <p className="at-prose">{ompaProject.description}</p>
              <p className="at-prose">{ompaProject.detail}</p>
              <p className="at-hand">{ompaProject.motivationTitle}</p>
              <p className="at-prose">{ompaProject.motivation}</p>
            </div>
            <div className="at-ompa big">
              <img src={ompaProject.demo} alt="Ompa" />
            </div>
          </>
        ) : (
          <>
            <div>
              <Heading kicker="PERSONAL ARTWORK">Artwork</Heading>
              <p className="at-hand">a blank canvas, for now</p>
            </div>
            <div className="at-canvas" aria-hidden="true" />
          </>
        )}
      </section>
      <Footer />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <Cover
        kicker="LIFE BEYOND CODE"
        title={
          <>
            A little about me <img className="at-title-ompa" src={ompaArtwork.title} alt="" />
          </>
        }
        meta="Music · Chess · Snowboarding · Art"
      >
        {homeSummary}
      </Cover>
      <section className="at-section at-tight">
        <div className="at-box at-crochet at-about">
          <div className="at-ompa-pair" role="group" aria-label="Ompa artwork">
            <img src={ompaArtwork.relax} alt="Ompa relaxing" />
            <img src={ompaArtwork.hero} alt="Ompa as a hero" />
          </div>
          <div>
            <h2>A little more about me</h2>
            <p className="at-prose">
              Outside of building software, you’ll find me listening to music, learning chess, finding my
              feet on a snowboard, or making a mess with paint.
            </p>
            <ul className="at-interests">
              {interests.map((interest, index) => (
                <li key={interest.title}>
                  <small aria-hidden="true">{interest.mark}</small>
                  {interest.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function PortfolioLikes() {
  const [likes, setLikes] = useState(null);
  const [locallyLiked, setLocallyLiked] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(likesApiConfigured);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [retry, setRetry] = useState(0);
  const isLiked = likes?.liked ?? locallyLiked;

  useEffect(() => {
    if (!likesApiConfigured) return undefined;

    const controller = new AbortController();
    setIsLoading(true);
    setError("");

    fetchPortfolioLikes(controller.signal)
      .then(setLikes)
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : "Unable to load portfolio likes.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [retry]);

  const handleLike = async () => {
    if (!likesApiConfigured) {
      setLocallyLiked(true);
      return;
    }

    if (!likes && error) {
      setRetry((value) => value + 1);
      return;
    }

    if (isLiked || isLoading || isSubmitting) return;

    setIsSubmitting(true);
    setError("");
    try {
      setLikes(await likePortfolio());
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to save your like.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button
      type="button"
      className={`at-slip at-like ${isLiked ? "is-liked" : ""}`}
      onClick={handleLike}
      disabled={isLoading || isSubmitting || isLiked}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Portfolio liked" : "Like this portfolio"}
    >
      <small>
        <span aria-hidden="true">♡</span> Like?
      </small>
      <img className="at-like-ompa" src={ompaArtwork.lots} alt="" />
      <span className="at-like-message">
        {error
          ? `${error} Click to retry.`
          : isSubmitting
            ? "Saving your like…"
            : isLiked
              ? "Thanks for the love!"
              : isLoading
                ? "Loading likes…"
                : likesApiConfigured && likes
                  ? `${likes.count} ${likes.count === 1 ? "like" : "likes"}`
                  : "Likes will appear when the API is ready."}
      </span>
    </button>
  );
}

function Pinboard() {
  return (
    <aside className="at-pins" aria-label="A little more">
      <h2 className="at-hand big">
        <span>A little more</span>
        <Brush className="pin-stroke" v={1} />
      </h2>

      <PortfolioLikes />

      <div className="at-slip b at-winter">
        <small>
          <Snowflake size={14} /> Winter notes
        </small>
        <p>
          Cold days, good music,
          <br />
          new ideas.
        </p>
      </div>

      <div className="at-note">
        <small>CURRENTLY INTO</small>
        <ul>
          {interests.map((interest) => (
            <li key={interest.title}>
              {interest.title} <i>— {interest.sub}</i>
            </li>
          ))}
        </ul>
      </div>

      <CalendarWidget />
    </aside>
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
    <aside className="at-pins at-playback" aria-label={`${project.name} playback`}>
      {!isRagChatbot && (
        <>
          <p className="at-hand big">
            <span>NOW EXPLORING</span>
            <Brush className="pin-stroke" v={1} />
          </p>
          <h1 className="at-playback-title">{project.name}</h1>
          {project.award && <AwardStamp inline />}
          <p className="at-playback-detail">{project.detail}</p>
          {project.notice && <p className="at-notice">{project.notice}</p>}
          <p className="at-playback-heading">
            <span>↻ Demo loop</span>
            <span>PROJECT PREVIEW</span>
          </p>
        </>
      )}
      <div
        className="at-playback-stage"
        aria-label={`${project.name} demo playback`}
        style={project.demoBackground ? { background: project.demoBackground } : undefined}
      >
        {project.demo ? <ProjectMedia project={project} /> : <DemoWindow project={project} />}
        {project.demo && (
          <button
            ref={expandDemoButton}
            type="button"
            className="at-button at-expand"
            onClick={() => setDemoExpanded(true)}
            aria-label={`View ${project.name} demo full size`}
          >
            View full size ↗
          </button>
        )}
      </div>
      <p className="at-playback-meta">
        <span>DEMO · LOOP</span>
        <span>GIF / VIDEO</span>
      </p>
      <div className="at-note">
        <small>{project.type}</small>
        <p>{project.description}</p>
        <small>BUILT WITH</small>
        <ProjectTags tags={project.tags} />
      </div>
      <button type="button" className="at-button" onClick={onNext}>
        Next project →
      </button>
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
          <div
            className="demo-lightbox-content"
            style={project.demoBackground ? { background: project.demoBackground } : undefined}
          >
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

function Portfolio() {
  const navigate = useNavigate();
  const location = useLocation();
  const [artIndex, setArtIndex] = useState(() => Math.floor(Math.random() * artworkThemes.length));
  const [intro, setIntro] = useState(() => (prefersReducedMotion() ? "done" : "sketch"));
  const art = artworkThemes[artIndex];

  const routeProjectSlug = location.pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1];
  const activeProject = projects.find((project) => project.slug === routeProjectSlug) ?? null;
  const isProjectPage = location.pathname.startsWith("/projects");
  const navIndex = Math.max(
    0,
    navItems.findIndex((item) =>
      item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path),
    ),
  );
  const activePage = navItems[navIndex].label;

  useEffect(() => {
    document.title = activeProject ? `${activeProject.name} — Projects | Stephanie` : `${activePage} | Stephanie`;
  }, [activePage, activeProject]);

  useEffect(() => {
    if (intro === "done") return undefined;
    const timer = window.setTimeout(
      () => setIntro(intro === "sketch" ? "push" : "done"),
      intro === "sketch" ? 2700 : 3300,
    );
    return () => window.clearTimeout(timer);
  }, [intro]);

  // Paint-in-on-scroll: block reveals with a randomly chosen stroke direction.
  useLayoutEffect(() => {
    if (intro === "sketch" || prefersReducedMotion()) return undefined;
    const selector = [
      ".at-sechead",
      ".at-store",
      ".at-projbox",
      ".at-box",
      ".at-ledger li",
      ".at-edu li",
      ".at-cover h1",
      ".at-cover .lede",
      ".at-flourish",
      ".at-foot",
      ".at-two > div",
      ".at-interests li",
    ].join(",");
    const io = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((entry) => {
          const el = entry.target;
          // Blocks the reader already scrolled past (fast scroll, jump links) appear without animating.
          if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
            io.unobserve(el);
            el.classList.add("pi-on", "pi-done");
            return;
          }
          if (!entry.isIntersecting) return;
          io.unobserve(el);
          el.style.setProperty("--pd", `${Math.min(n++, 6) * 0.09}s`);
          el.classList.add("pi-on");
          const finish = (event) => {
            if (event.target !== el) return;
            el.classList.add("pi-done");
            el.removeEventListener("animationend", finish);
          };
          el.addEventListener("animationend", finish);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -3% 0px" },
    );
    document.querySelectorAll(selector).forEach((el) => {
      if (el.classList.contains("pi-on")) return;
      if (el.closest(".pi") && el.closest(".pi") !== el) return;
      if (!el.classList.contains("pi")) el.classList.add("pi", `pv${Math.floor(Math.random() * 7)}`);
      io.observe(el);
    });

    // A jump past a block never crosses the observer's threshold, so reveal anything left above the viewport.
    const revealPassed = () => {
      document.querySelectorAll(".pi:not(.pi-on)").forEach((el) => {
        if (el.getBoundingClientRect().bottom < 0) {
          io.unobserve(el);
          el.classList.add("pi-on", "pi-done");
        }
      });
    };
    window.addEventListener("scroll", revealPassed, { passive: true });
    return () => {
      window.removeEventListener("scroll", revealPassed);
      io.disconnect();
    };
  }, [location.pathname, intro === "sketch"]);

  // The overview letter is "sketched in" when it scrolls into view.
  useLayoutEffect(() => {
    if (intro === "sketch" || prefersReducedMotion()) return undefined;
    const el = document.querySelector(".at-letter");
    if (!el) return undefined;
    el.classList.add("sk");
    const done = (event) => {
      if (event.target === el && event.animationName === "at-sk-paper") {
        el.classList.remove("sk", "sk-on");
        el.removeEventListener("animationend", done);
      }
    };
    el.addEventListener("animationend", done);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("sk-on");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    const revealPassed = () => {
      if (el.getBoundingClientRect().bottom < 0) el.classList.remove("sk", "sk-on");
    };
    window.addEventListener("scroll", revealPassed, { passive: true });
    return () => {
      window.removeEventListener("scroll", revealPassed);
      io.disconnect();
      el.removeEventListener("animationend", done);
      el.classList.remove("sk", "sk-on");
    };
  }, [location.pathname, intro === "sketch"]);

  const openProject = useCallback(
    (project) => {
      navigate(`/projects/${project.slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate],
  );

  const moveToNextProject = () => {
    const currentIndex = projects.indexOf(activeProject);
    navigate(`/projects/${projects[(currentIndex + 1) % projects.length].slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const style = {
    "--a": art.accent,
    "--b": art.secondary,
    "--wash": art.wash,
    "--paper": art.paper,
    "--rgb": art.rgb,
    "--i": navIndex,
  };

  let page;
  if (isProjectPage) {
    page = activeProject ? <ProjectDetails project={activeProject} /> : <ProjectsPage onOpenProject={openProject} />;
  } else if (location.pathname.startsWith("/work")) {
    page = <WorkPage />;
  } else if (location.pathname.startsWith("/studio")) {
    page = <StudioPage />;
  } else if (location.pathname.startsWith("/about")) {
    page = <AboutPage />;
  } else {
    page = <HomePage art={art} artIndex={artIndex} setArtIndex={setArtIndex} onOpenProject={openProject} />;
  }

  return (
    <div className={`at-app ${activeProject ? "has-demo" : ""}`} style={style} data-intro={intro}>
      {intro !== "done" && <Intro phase={intro} />}
      <SvgDefs />
      <nav className="at-spine" aria-label="Main navigation">
        <Link to="/" className="at-brand">
          <span className="flake">
            <Snowflake size={30} />
          </span>
          <span className="word">Stephanie</span>
        </Link>
        <ul>
          <span className="at-bookmark" aria-hidden="true" />
          {navItems.map((item, i) => (
            <li key={item.label}>
              <Link to={item.path} className={navIndex === i ? "on" : ""} aria-current={navIndex === i ? "page" : undefined}>
                <Brush className="navbrush" v={i} />
                <small>{String(i + 1).padStart(2, "0")}</small>
                <span>{item.label}</span>
                <em>{item.sub}</em>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <main className="at-main" key={location.pathname} id="home">
        {page}
      </main>

      {activeProject ? (
        <ProjectPlayback project={activeProject} onNext={moveToNextProject} />
      ) : (
        <Pinboard />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Portfolio />
    </BrowserRouter>
  );
}
