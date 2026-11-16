import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { artworkThemes } from "./artworkThemes.js";
import { sketches } from "./projects.js";

export function Snowflake({ size = 40 }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M24 3v42M5.8 13.5l36.4 21M5.8 34.5l36.4-21" />
      <path d="M18 8l6 5 6-5M18 40l6-5 6 5M6 20l8 1-3-8M42 28l-8-1 3 8M6 28l8-1-3 8M42 20l-8 1 3-8" />
    </svg>
  );
}

const emblemKey = { bubble: "bubl", splita: "splita", "rag-chatbot": "rag", hardscape: "phoenix", ompa: "between" };

export function Emblem({ slug }) {
  const k = emblemKey[slug];
  return (
    <svg
      className="at-emblem"
      viewBox="0 0 64 64"
      width="54"
      height="54"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {k === "phoenix" && (
        <>
          <path d="M10 56V30C10 18 20 9 32 9s22 9 22 21v26M6 56h52" />
          <path d="M32 22c-7 8 3 11-2 19 9-2 12-10 8-17 4 2 6 7 4 13" />
        </>
      )}
      {k === "bubl" && (
        <>
          <circle cx="27" cy="33" r="18" />
          <circle cx="50" cy="15" r="7" />
          <circle cx="55" cy="38" r="3.5" />
          <path d="M27 24a6 6 0 0 1 6 6c0 5-6 11-6 11s-6-6-6-11a6 6 0 0 1 6-6z" />
        </>
      )}
      {k === "rag" && (
        <>
          <rect x="12" y="8" width="30" height="40" rx="2" transform="rotate(-6 27 28)" />
          <path d="M19 20h16M19 28h16M19 36h10" />
          <circle cx="43" cy="42" r="9" />
          <path d="m50 49 8 8" />
        </>
      )}
      {k === "splita" && (
        <>
          <path d="M14 8h36v48l-6-4-6 4-6-4-6 4-6-4-6 4z" />
          <path d="M32 8v44" strokeDasharray="3 4" />
          <path d="M21 22h6M37 22h6M21 32h6M37 32h6" />
        </>
      )}
      {k === "between" && (
        <>
          <circle cx="32" cy="30" r="16" />
          <path d="M22 18 18 8l10 5M42 18l4-10-10 5" />
          <circle cx="26" cy="29" r="1.8" fill="currentColor" />
          <circle cx="38" cy="29" r="1.8" fill="currentColor" />
          <path d="M27 37c3 3 7 3 10 0M32 46v10M24 56h16" />
        </>
      )}
    </svg>
  );
}

export function Brush({ className = "", v = 0 }) {
  const shapes = [
    "M2 19 C40 5 110 11 200 13 S340 7 398 17 C393 26 380 30 340 31 S120 35 60 33 C30 32 10 29 2 19Z",
    "M3 24 C50 10 90 6 190 10 S350 4 397 12 C395 22 382 33 330 34 S110 30 50 36 C25 35 8 32 3 24Z",
  ];
  return (
    <svg className={`at-brush ${className}`} viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
      <g filter="url(#at-rough)">
        <path d={shapes[v % 2]} fill="currentColor" />
      </g>
      <g stroke="#fff" strokeOpacity=".16" strokeWidth="1.2" fill="none">
        <path d="M20 16 C120 10 260 14 380 14" />
        <path d="M14 22 C140 18 250 24 372 21" />
      </g>
      <g stroke="#000" strokeOpacity=".16" strokeWidth="1.2" fill="none">
        <path d="M24 28 C130 25 250 30 366 27" />
      </g>
    </svg>
  );
}

export function Divider({ v = 0 }) {
  return (
    <svg className="at-flourish" data-v={v} viewBox="0 0 300 30" aria-hidden="true" filter="url(#at-wobble)">
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M144 15 L150 8 L156 15 L150 22Z" fill="currentColor" />
        {[0, 1].map((m) => (
          <g key={m} transform={m ? "translate(300 0) scale(-1 1)" : undefined}>
            <path d="M138 15 C112 15 100 6 74 9 C52 12 40 21 10 16" strokeDasharray="9 6" />
            <path d="M4 12 L10 18 M10 12 L4 18" strokeWidth="1.4" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Link({ to, className, children, ...rest }) {
  const navigate = useNavigate();
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
        window.scrollTo(0, 0);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="at-rough" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.7" numOctaves="3" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="at-wobble" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="8" result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <marker id="at-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </marker>
      </defs>
    </svg>
  );
}

export function VinylDisc({ art }) {
  const id = `ring-${art.no}`;
  return (
    <span className="vd" style={{ "--ca": art.accent, "--cb": art.secondary }}>
      <span className="vd-swirl" />
      <span className="vd-bands" />
      <svg className="vd-ring" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id={id} d="M100 100 m-50 0 a50 50 0 1 1 100 0 a50 50 0 1 1 -100 0" />
        </defs>
        <text>
          <textPath href={`#${id}`} textLength="312" lengthAdjust="spacing">
            stephanie abundio · side a · 33⅓ rpm ·
          </textPath>
        </text>
      </svg>
      <span className="vd-label" style={{ backgroundImage: `url(${art.src})` }}>
        <i />
      </span>
    </span>
  );
}

/**
 * Artwork record store. Dropping (or clicking) a vinyl makes it the featured artwork and
 * retunes the site palette. Music API hook: pass `onPlay(index)` to start a matching track.
 */
export function ArtStore({ art, artIndex, setArtIndex, onPlay }) {
  const platter = useRef(null);
  const moved = useRef(false);
  const origin = useRef({ x: 0, y: 0 });
  const [drag, setDrag] = useState(null);
  const [over, setOver] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Preload every painting so swapping records never flashes an unloaded label or photo.
  useEffect(() => {
    artworkThemes.forEach((a) => {
      const img = new Image();
      img.src = a.src;
    });
  }, []);

  // Never leave a vinyl stuck to the cursor if the drag is interrupted.
  useEffect(() => {
    if (!drag) return undefined;
    const release = () => {
      setDrag(null);
      setOver(false);
    };
    window.addEventListener("blur", release);
    window.addEventListener("pointerup", release);
    return () => {
      window.removeEventListener("blur", release);
      window.removeEventListener("pointerup", release);
    };
  }, [drag]);

  const load = (i) => {
    setArtIndex(i);
    setPlaying(true);
    onPlay?.(i);
  };
  const hit = (x, y) => {
    const r = platter.current?.getBoundingClientRect();
    return !!r && x >= r.left - 20 && x <= r.right + 20 && y >= r.top - 20 && y <= r.bottom + 20;
  };
  const down = (e, i) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    moved.current = false;
    origin.current = { x: e.clientX, y: e.clientY };
    setDrag({ i, x: e.clientX, y: e.clientY });
  };
  const move = (e) => {
    if (!drag) return;
    if (Math.hypot(e.clientX - origin.current.x, e.clientY - origin.current.y) > 6) moved.current = true;
    setDrag({ ...drag, x: e.clientX, y: e.clientY });
    setOver(hit(e.clientX, e.clientY));
  };
  const up = (e) => {
    if (drag && moved.current && hit(e.clientX, e.clientY)) load(drag.i);
    setDrag(null);
    setOver(false);
  };

  return (
    <div className="at-store at-crochet">
      <div className="at-crate">
        <p className="at-hand">the record store</p>
        <p className="at-crate-hint">drag a vinyl onto the player</p>
        <div className="at-bin">
          {artworkThemes.map((a, i) => (
            <button
              type="button"
              key={a.src}
              className={`at-vinyl ${i === artIndex ? "spun" : ""} ${drag?.i === i ? "lifted" : ""}`}
              style={{ "--r": `${(i % 2 ? 1 : -1) * (3 + i)}deg` }}
              onPointerDown={(e) => down(e, i)}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
              onClick={(e) => {
                moved.current = false;
                // Pointer users drag and drop; keyboard activation (detail 0) loads the record directly.
                if (e.detail === 0) load(i);
              }}
              aria-label={`Play ${a.label}`}
            >
              <span className="disc">
                <VinylDisc art={a} />
              </span>
              <small>
                {a.no} · {a.label}
              </small>
            </button>
          ))}
        </div>
      </div>

      <div className={`at-player ${over ? "over" : ""}`} ref={platter}>
        <div className={`at-plinth ${playing ? "is-playing" : ""}`}>
          <span className="at-led" aria-hidden="true" />
          <button
            type="button"
            className="at-knob"
            onClick={() => setPlaying(!playing)}
            aria-label={playing ? "Stop the record" : "Start the record"}
          >
            <i />
          </button>
          <span className="at-speed">
            <b>33</b> · 45
          </span>
          <div className="at-platter">
            <div className="at-record">
              <VinylDisc art={art} key={artIndex} />
              <span className="at-spindle" />
            </div>
            <span className="at-sheen" />
          </div>
          <div className="at-armwrap" key={`arm${artIndex}`}>
            <svg viewBox="0 0 120 240" width="120" height="240" aria-hidden="true">
              <rect x="70" y="-2" width="20" height="26" rx="3" fill="#b8935a" />
              <circle cx="80" cy="30" r="17" fill="#2a1a14" stroke="#b8935a" strokeWidth="3" />
              <circle cx="80" cy="30" r="6" fill="#b8935a" />
              <path d="M80 30 V118 Q80 168 46 198" fill="none" stroke="#e4dac3" strokeWidth="6" strokeLinecap="round" />
              <g transform="rotate(32 46 200)">
                <rect x="34" y="194" width="22" height="30" rx="3" fill="#e4dac3" />
                <rect x="38" y="220" width="14" height="6" fill="#b8935a" />
              </g>
            </svg>
          </div>
          <span className="at-engrave">
            <Snowflake size={14} /> stephanie · hi-fi
          </span>
          <span className="at-foot-l" />
          <span className="at-foot-r" />
        </div>
        <p className="at-drop-hint">{over ? "let go to play" : "drop a vinyl here"}</p>
      </div>

      <figure className="at-now-art" key={art.src}>
        <Brush className="art-stroke" />
        <p className="at-hand">
          <span className="eq" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          now playing
        </p>
        <img src={art.src} alt={`${art.label}, featured artwork`} />
        <figcaption>
          <h1>
            {art.label.split(" ")[0]} <em>{art.label.split(" ").slice(1).join(" ")}</em>
          </h1>
          <span>
            {art.no} · {art.mood}
          </span>
        </figcaption>
      </figure>

      {drag && (
        <div className="at-ghost" style={{ left: drag.x, top: drag.y }}>
          <VinylDisc art={artworkThemes[drag.i]} />
        </div>
      )}
      <span className="at-ground" />
      <span className="at-roller">
        <Snowflake size={36} />
      </span>
    </div>
  );
}

export function Notebook({ project }) {
  const sp = sketches[project.slug];
  const W = 96;
  const H = 42;
  const byId = Object.fromEntries(sp.nodes.map((n) => [n.id, n]));
  return (
    <div className="at-notebook" key={project.slug}>
      <span className="tape" />
      <small className="nb-title">engineer’s notebook · {project.name}</small>
      <svg className="nb-diagram" viewBox="0 0 364 160" aria-label={`${project.name} architecture sketch`}>
        {sp.edges.map(([a, b]) => {
          const f = byId[a];
          const t = byId[b];
          const x1 = f.x + W;
          const y1 = f.y + H / 2;
          const x2 = t.x - 2;
          const y2 = t.y + H / 2;
          const mx = (x1 + x2) / 2;
          return (
            <path
              key={a + b}
              className="edge"
              d={`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`}
              markerEnd="url(#at-arrow)"
            />
          );
        })}
        {sp.nodes.map((n) => {
          const [t1, t2] = n.t.split("|");
          return (
            <g key={n.id} filter="url(#at-wobble)">
              <rect className="node" x={n.x} y={n.y} width={W} height={H} rx="5" />
              <text className="t1" x={n.x + W / 2} y={n.y + (t2 ? 18 : 26)} textAnchor="middle">
                {t1}
              </text>
              {t2 && (
                <text className="t2" x={n.x + W / 2} y={n.y + 32} textAnchor="middle">
                  {t2}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <p className="nb-note">↳ {sp.note}</p>
      <pre className="nb-term">
        <span className="pr">$</span> stack --list{"\n"}
        {project.tags.join("  ·  ")}
        {"\n"}
        <span className="pr">$</span> cat idea.ts <em>// pseudocode</em>
        {"\n"}
        {sp.code}
      </pre>
    </div>
  );
}

export function Intro({ phase }) {
  const box = (x, y, w, h, d) => (
    <g key={`${x}-${y}`}>
      <path pathLength={1} style={{ animationDelay: `${d}s` }} d={`M${x} ${y}h${w}v${h}h${-w}z`} />
      <path
        pathLength={1}
        style={{ animationDelay: `${d + 0.15}s` }}
        d={`M${x + 4} ${y - 3}h${w - 2}v${h + 4}h${-w + 5}`}
      />
    </g>
  );
  const circle = (cx, cy, r, d) => (
    <path
      key={`c${cx}-${cy}-${r}`}
      pathLength={1}
      style={{ animationDelay: `${d}s` }}
      d={`M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`}
    />
  );
  const line = (x1, y1, x2, y2, d) => (
    <path key={`l${x1}-${y1}`} pathLength={1} style={{ animationDelay: `${d}s` }} d={`M${x1} ${y1}L${x2} ${y2}`} />
  );
  return (
    <div className={`wf ${phase}`} aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" filter="url(#at-wobble)">
        {box(6, 10, 164, 880, 0)}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            {circle(30, 250 + i * 62, 6, 0.3 + i * 0.1)}
            {line(52, 250 + i * 62, 140, 250 + i * 62, 0.35 + i * 0.1)}
          </g>
        ))}
        {box(1172, 10, 262, 880, 0.2)}
        {box(1192, 60, 222, 90, 0.7)}
        {box(1200, 180, 210, 80, 0.8)}
        {line(1196, 310, 1400, 310, 0.9)}
        {line(1196, 350, 1380, 350, 1)}
        {line(1196, 390, 1390, 390, 1.1)}
        {box(1192, 560, 222, 200, 1.2)}
        {box(200, 30, 950, 250, 0.3)}
        {box(214, 48, 230, 214, 0.6)}
        {[
          [266, 120],
          [370, 120],
          [266, 214],
          [370, 214],
        ].map(([x, y], i) => circle(x, y, 38, 0.8 + i * 0.1))}
        {box(466, 60, 268, 200, 0.9)}
        {circle(580, 160, 82, 1.1)}
        {circle(580, 160, 26, 1.3)}
        {line(690, 70, 640, 210, 1.4)}
        {box(756, 56, 170, 176, 1.1)}
        {line(950, 100, 1120, 100, 1.3)}
        {line(950, 140, 1090, 140, 1.4)}
        {box(220, 330, 880, 170, 1.4)}
        {line(250, 380, 560, 380, 1.6)}
        {line(250, 420, 920, 420, 1.7)}
        {line(250, 450, 880, 450, 1.8)}
        {line(214, 548, 520, 548, 1.8)}
        {box(200, 580, 950, 190, 1.9)}
        {[0, 1, 2, 3].map((i) => line(232, 620 + i * 36, 560, 620 + i * 36, 2 + i * 0.1))}
        {box(740, 596, 380, 154, 2.1)}
        {box(200, 800, 460, 90, 2.2)}
        {box(690, 800, 460, 90, 2.3)}
      </svg>
      <span className="wf-note" style={{ left: "1.2%", top: "22%" }}>
        nav — a studio index
      </span>
      <span className="wf-note" style={{ left: "17%", top: "4%", animationDelay: "0.9s" }}>
        record store (drag me!)
      </span>
      <span className="wf-note" style={{ left: "20%", top: "34%", animationDelay: "1.6s" }}>
        overview — hi!
      </span>
      <span className="wf-note" style={{ left: "22%", top: "62%", animationDelay: "2s" }}>
        projects → notebook
      </span>
      <span className="wf-note" style={{ left: "82%", top: "4%", animationDelay: "0.8s" }}>
        pinboard
      </span>
      <p className="wf-caption">sketching the layout…</p>
      {phase === "push" && (
        <svg className="wf-cursor" viewBox="0 0 24 28" width="30" height="34">
          <path
            d="M3 2 L3 22 L8 17 L12 26 L16 24 L12 15 L19 15Z"
            fill="#ece4d2"
            stroke="#0a0d16"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

export function Heading({ kicker, children, link }) {
  return (
    <div className="at-sechead">
      <div>
        <p className="at-hand">{kicker}</p>
        <h2>
          <Brush v={1} />
          <span>{children}</span>
        </h2>
      </div>
      {link}
    </div>
  );
}

export function Cover({ kicker, title, children, meta, stickers }) {
  return (
    <header className="at-cover">
      <p className="at-hand">{kicker}</p>
      <Brush className="cover-stroke" />
      <Brush className="cover-stroke two" v={1} />
      <h1>{title}</h1>
      <p className="lede">{children}</p>
      {meta && <p className="at-meta">{meta}</p>}
      {stickers && <div className="at-cover-stickers">{stickers}</div>}
      <span className="at-braid" />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="at-foot">
      <Snowflake size={22} />
      <span>
        Built and designed by Stephanie Abundio.<br />
        All rights reserved. ©
      </span>
    </footer>
  );
}
