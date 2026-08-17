import React, { useState, useRef } from "react";
import {
  Gamepad2, Palette, Box, PenTool, Wrench, Compass,
  Play, ExternalLink, Mail, Link2, AtSign, Pin,
  Sparkles, ChevronRight
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  PLACEHOLDER DATA — swap every entry here for your real work       */
/* ------------------------------------------------------------------ */

const DRIVE_LINK = "https://drive.google.com/drive/folders/1ip5wABUpeWnEjpbYfxbBuU6ENytN_cA1?usp=drive_link";

const SECTIONS = [
  { id: "hero", label: "Cover" },
  { id: "about", label: "Character Sheet" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Project Log" },
  { id: "playables", label: "Playables" },
  { id: "art", label: "Art & Concept" },
  { id: "world", label: "3D & Assets" },
  { id: "animation", label: "Animation" },
  { id: "writing", label: "Narrative" },
  { id: "contact", label: "Contact" },
];

const SKILLS = {
  "Game Development": {
    icon: Compass,
    tags: [
      { name: "Unity", tier: "Veteran" },
      { name: "Gameplay Programming", tier: "Veteran" },
      { name: "Game Design", tier: "Adept" },
      { name: "UI Implementation", tier: "Adept" },
    ],
  },
  "Programming": {
    icon: Wrench,
    tags: [
      { name: "C#", tier: "Veteran" },
      { name: "C++", tier: "Adept" },
      { name: "JavaScript", tier: "Adept" },
      { name: "Python", tier: "Adept" },
      { name: "SQL", tier: "Adept" },
      { name: "React", tier: "Novice" },
    ],
  },
  "Art & Visual Dev": {
    icon: Palette,
    tags: [
      { name: "Photoshop", tier: "Veteran" },
      { name: "Illustrator", tier: "Adept" },
      { name: "Krita", tier: "Veteran" },
      { name: "Character Design", tier: "Veteran" },
      { name: "Concept Art", tier: "Adept" },
    ],
  },
  "3D & Animation": {
    icon: Box,
    tags: [
      { name: "Blender", tier: "Veteran" },
      { name: "3D Modelling", tier: "Veteran" },
      { name: "UV Mapping", tier: "Adept" },
      { name: "Rigging", tier: "Adept" },
      { name: "Animation", tier: "Adept" },
    ],
  },
  "Writing & Narrative": {
    icon: PenTool,
    tags: [
      { name: "Narrative Design", tier: "Veteran" },
      { name: "Worldbuilding", tier: "Veteran" },
      { name: "Script Writing", tier: "Adept" },
      { name: "Comic Writing", tier: "Adept" },
      { name: "Dialogue Writing", tier: "Adept" },
    ],
  },
  "App & Tools": {
    icon: Gamepad2,
    tags: [
      { name: "FlutterFlow", tier: "Adept" },
      { name: "Firebase", tier: "Adept" },
      { name: "Supabase", tier: "Novice" },
      { name: "Git / GitHub", tier: "Veteran" },
    ],
  },
};

const EXPERIENCE = [
  {
    role: "Game Developer",
    company: "Booxclash",
    date: "July 2025 – Present",
    bullets: [
      "Developed gameplay mechanics and interactive features using Unity and C#.",
      "Implemented UI elements and core game logic.",
      "Identified, tested, and resolved gameplay bugs to improve stability and player experience.",
      "Contributed to gameplay design discussions and feature implementation.",
    ],
  },
];

const PROJECT_CATEGORIES = ["All", "Design", "Programming", "Art", "3D", "Narrative"];

const PROJECTS = [
  {
    title: "Infinite Jumper",
    category: "Programming",
    stamp: "Playable",
    blurb: "A 2D endless platform-jumping game with procedural platform generation, scoring, and camera tracking.",
    tools: ["Unity", "C#", "Procedural Generation"],
    link: "https://heraway.itch.io", // replace with the game's direct itch.io page
    linkLabel: "Play on itch.io",
  },
  {
    title: "Zombie Hotel Platformer",
    category: "Programming",
    stamp: "Playable",
    blurb: "A 2D platformer with player movement, enemies, level design, and interactive gameplay elements.",
    tools: ["Unity", "C#", "Level Design"],
    link: "https://heraway.itch.io", // replace with the game's direct itch.io page
    linkLabel: "Play on itch.io",
  },
  {
    title: "3D Modeling & Animation Portfolio",
    category: "3D",
    stamp: "Asset Pack",
    blurb: "Original 3D characters, environments, props, weapons, and drones — game-ready assets with rigging and animation.",
    tools: ["Blender", "Rigging", "Animation"],
    link: "", // add a YouTube/ArtStation/Sketchfab link once you have one
    linkLabel: "Watch showreel",
  },
  {
    title: "Digital Art & Creative Projects",
    category: "Art",
    stamp: "Visual Dev",
    blurb: "Character designs, illustrations, environments, concept art, and comics — narrative-driven visual work.",
    tools: ["Krita", "Photoshop", "Illustrator"],
    link: "https://www.instagram.com/heraway_/",
    linkLabel: "View on Instagram",
  },
  {
    title: "Software & Application Projects",
    category: "Programming",
    stamp: "Tool",
    blurb: "Web and mobile applications built with modern stacks, with database-driven features and custom UI.",
    tools: ["JavaScript", "FlutterFlow", "Firebase", "Supabase"],
    link: "https://github.com/heraway",
    linkLabel: "View on GitHub",
  },
];

const ARTSTATION_LINK = "https://www.artstation.com/heraway";

const ART_PIECES = [
  { title: "Character Study — Wanderer", tag: "Character Design", link: ARTSTATION_LINK },
  { title: "Marketplace, Dusk", tag: "Environment Concept", link: ARTSTATION_LINK },
  { title: "Comic Page 04", tag: "Comic Art", link: ARTSTATION_LINK },
  { title: "Storyboard — Chase Sequence", tag: "Storyboarding", link: ARTSTATION_LINK },
  { title: "Creature Sheet — Fen Stalker", tag: "Concept Art", link: ARTSTATION_LINK },
  { title: "Portrait Study", tag: "Illustration", link: ARTSTATION_LINK },
];

const MODELS_3D = [
  { title: "Wayshrine Prop Kit", tag: "3D Asset", link: ARTSTATION_LINK },
  { title: "Character Base Mesh", tag: "3D Asset", link: ARTSTATION_LINK },
  { title: "Modular Ruins Set", tag: "3D Asset", link: ARTSTATION_LINK },
];

const WRITING_SAMPLES = [
  {
    title: "Excerpt — The Long Season, Ch. 1",
    tag: "Narrative Design",
    excerpt: "Paste a short paragraph or scene from the script here — a few sentences is enough to give a reader a feel for your voice.",
    link: DRIVE_LINK, // swap for a direct link to this specific doc once organized
    linkLabel: "Read full script",
  },
  {
    title: "Worldbuilding Codex: The Salt Roads",
    tag: "Worldbuilding",
    excerpt: "A short teaser of the world/lore entry goes here.",
    link: DRIVE_LINK,
    linkLabel: "Read full codex",
  },
  {
    title: "Comic Script — Issue #1, Pages 1–3",
    tag: "Comic Scripting",
    excerpt: "A snippet of panel description or dialogue goes here.",
    link: DRIVE_LINK,
    linkLabel: "Read full script",
  },
];

const ANIMATIONS = [
  {
    title: "Animation Reel 01",
    tag: "Character Animation",
    link: DRIVE_LINK, // swap for a YouTube/Instagram reel link once posted
  },
  {
    title: "Animation Reel 02",
    tag: "Motion Study",
    link: DRIVE_LINK,
  },
];

/* ------------------------------------------------------------------ */

const TIER_COLOR = {
  Novice: "var(--teal)",
  Adept: "var(--amber)",
  Veteran: "var(--redpin)",
};

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [openPin, setOpenPin] = useState(null);
  const refs = useRef({});

  const scrollTo = (id) => {
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredProjects =
    activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .pf-root {
          --ink: #1B2430;
          --parchment: #F1E9D8;
          --parchment-2: #E7DAB9;
          --graphite: #4A4238;
          --amber: #E8A33D;
          --teal: #3E7C74;
          --redpin: #C4512F;
          background: var(--parchment);
          background-image:
            radial-gradient(circle at 20% 10%, rgba(0,0,0,0.03) 0, transparent 40%),
            radial-gradient(circle at 80% 60%, rgba(0,0,0,0.025) 0, transparent 40%);
          color: var(--ink);
          font-family: 'Source Serif 4', serif;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow-x: hidden;
        }
        .pf-root * { box-sizing: border-box; }
        .pf-display { font-family: 'Space Grotesk', sans-serif; }
        .pf-mono { font-family: 'IBM Plex Mono', monospace; }

        /* --- Nav (top bar) --- */
        .pf-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 60px;
          width: 100%;
          background: var(--ink);
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6vw;
          gap: 4px;
        }
        .pf-nav-brand {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: var(--parchment);
          letter-spacing: -0.01em;
          flex-shrink: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .pf-nav-brand .pf-nav-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--amber); display: inline-block; }
        .pf-nav-tabs {
          display: flex;
          align-items: center;
          gap: 2px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .pf-nav-tabs::-webkit-scrollbar { display: none; }
        .pf-nav-tab {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(241,233,216,0.55);
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 10px 12px;
          border-bottom: 2px solid transparent;
          flex-shrink: 0;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .pf-nav-tab:hover {
          color: var(--parchment);
          border-bottom-color: var(--amber);
        }
        @media (max-width: 760px) {
          .pf-nav { padding: 0 4vw; height: 52px; }
          .pf-nav-brand { font-size: 13px; }
          .pf-nav-tab { font-size: 10px; padding: 8px 8px; }
        }

        .pf-main { margin-left: 0; margin-top: 60px; }
        @media (max-width: 760px) { .pf-main { margin-top: 52px; } }


        .pf-section { padding: 90px 8vw; max-width: 1180px; margin: 0 auto; position: relative; }
        @media (max-width: 760px) { .pf-section { padding: 56px 6vw; } }

        .pf-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--redpin);
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .pf-eyebrow::before { content: ''; width: 22px; height: 1px; background: var(--redpin); display:inline-block; }

        .pf-h1 { font-size: clamp(2.6rem, 6vw, 5rem); font-weight: 700; line-height: 1.02; margin: 0 0 20px; letter-spacing: -0.02em; }
        .pf-h2 { font-size: clamp(1.8rem, 3.4vw, 2.6rem); font-weight: 600; margin: 0 0 32px; letter-spacing: -0.01em; }
        .pf-lede { font-size: 1.15rem; line-height: 1.6; color: var(--graphite); max-width: 620px; }

        /* --- Hero --- */
        .pf-hero { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; }
        .pf-stamp {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          border: 1.5px solid var(--teal); color: var(--teal); padding: 5px 12px; border-radius: 3px;
          transform: rotate(-2deg); width: fit-content; margin-bottom: 26px;
          animation: pf-fadeUp 0.7s ease both;
        }
        .pf-hero-title { animation: pf-fadeUp 0.7s 0.1s ease both; }
        .pf-hero-sub { animation: pf-fadeUp 0.7s 0.22s ease both; }
        .pf-hero-cta { animation: pf-fadeUp 0.7s 0.34s ease both; display: flex; gap: 14px; margin-top: 34px; flex-wrap: wrap; }

        @keyframes pf-fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

        .pf-btn {
          font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.95rem;
          padding: 12px 22px; border-radius: 4px; cursor: pointer; border: none;
          display: inline-flex; align-items: center; gap: 8px; transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .pf-btn-primary { background: var(--ink); color: var(--parchment); }
        .pf-btn-primary:hover { transform: translateY(-2px); box-shadow: 3px 4px 0 var(--amber); }
        .pf-btn-ghost { background: transparent; color: var(--ink); border: 1.5px solid var(--graphite); }
        .pf-btn-ghost:hover { transform: translateY(-2px); box-shadow: 3px 4px 0 var(--teal); }

        /* --- About / Skills --- */
        .pf-skill-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 22px; margin-top: 12px; }
        .pf-skill-card {
          background: var(--parchment-2); border: 1px solid rgba(27,36,48,0.12);
          border-radius: 6px; padding: 22px; position: relative;
        }
        .pf-skill-head { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .pf-skill-head h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.02rem; margin: 0; font-weight: 600; }
        .pf-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .pf-tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; padding: 5px 10px;
          border-radius: 3px; background: rgba(27,36,48,0.06); display: inline-flex; align-items: center; gap: 6px;
        }
        .pf-tag-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; }

        /* --- Pin annotation --- */
        .pf-pin-wrap { position: relative; display: inline-block; }
        .pf-pin-btn {
          background: var(--redpin); color: var(--parchment); border: none; border-radius: 50%;
          width: 22px; height: 22px; cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
          margin-left: 8px; transition: transform 0.15s ease;
        }
        .pf-pin-btn:hover { transform: scale(1.15) rotate(-8deg); }
        .pf-pin-note {
          position: absolute; top: 30px; left: 0; z-index: 20; width: 220px;
          background: #FFF8E1; border: 1px solid rgba(27,36,48,0.15); box-shadow: 4px 4px 0 rgba(27,36,48,0.08);
          padding: 12px 14px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; line-height: 1.5;
          transform: rotate(-1.5deg); border-radius: 2px;
        }

        /* --- Projects --- */
        .pf-filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 34px; }
        .pf-filter-chip {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.05em;
          padding: 7px 16px; border-radius: 20px; border: 1.5px solid var(--graphite); background: transparent;
          cursor: pointer; transition: all 0.2s ease; color: var(--graphite);
        }
        .pf-filter-chip.active { background: var(--ink); color: var(--parchment); border-color: var(--ink); }

        .pf-project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .pf-card {
          background: #FBF7ED; border: 1px solid rgba(27,36,48,0.12); border-radius: 6px; padding: 24px;
          position: relative; transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer;
        }
        .pf-card:hover { transform: translateY(-4px); box-shadow: 6px 8px 0 rgba(27,36,48,0.08); }
        .pf-card::before {
          content: ''; position: absolute; top: -8px; left: 24px; width: 46px; height: 16px;
          background: rgba(232,163,61,0.55); transform: rotate(-3deg);
        }
        .pf-card-stamp {
          position: absolute; top: 18px; right: 18px; font-family: 'IBM Plex Mono', monospace; font-size: 10px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal); border: 1px solid var(--teal);
          padding: 3px 8px; border-radius: 3px; transform: rotate(4deg);
        }
        .pf-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.15rem; margin: 10px 0 10px; padding-right: 70px; }
        .pf-card p { font-size: 0.92rem; color: var(--graphite); line-height: 1.55; margin: 0 0 14px; }
        .pf-tool-row { display: flex; flex-wrap: wrap; gap: 6px; }
        .pf-tool-chip { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; padding: 3px 8px; background: rgba(62,124,116,0.12); color: var(--teal); border-radius: 3px; }
        .pf-card-link {
          display: inline-flex; align-items: center; gap: 6px; margin-top: 14px;
          font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--redpin);
          text-decoration: none; border-bottom: 1px solid var(--redpin); padding-bottom: 1px;
        }
        .pf-card-link:hover { opacity: 0.7; }

        /* --- Experience --- */
        .pf-exp-item { border-left: 2px solid var(--teal); padding-left: 24px; margin-bottom: 28px; position: relative; }
        .pf-exp-item::before { content: ''; position: absolute; left: -6px; top: 4px; width: 10px; height: 10px; border-radius: 50%; background: var(--teal); }
        .pf-exp-role { font-family: 'Space Grotesk', sans-serif; font-size: 1.15rem; font-weight: 600; margin: 0; }
        .pf-exp-meta { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--graphite); margin: 4px 0 12px; }
        .pf-exp-item ul { margin: 0; padding-left: 18px; color: var(--graphite); line-height: 1.6; }
        .pf-exp-item li { margin-bottom: 4px; }

        /* --- Playables --- */
        .pf-playable-card {
          background: var(--ink); color: var(--parchment); border-radius: 6px; padding: 30px;
          display: flex; align-items: center; justify-content: space-between; gap: 20px; margin-bottom: 18px;
          flex-wrap: wrap;
        }
        .pf-playable-card h3 { font-family: 'Space Grotesk', sans-serif; margin: 0 0 6px; }
        .pf-playable-card p { color: rgba(241,233,216,0.65); margin: 0; font-size: 0.9rem; max-width: 480px; }
        .pf-play-btn {
          background: var(--amber); color: var(--ink); border: none; padding: 12px 20px; border-radius: 4px;
          font-family: 'Space Grotesk', sans-serif; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;
          cursor: pointer; flex-shrink: 0;
        }
        .pf-embed-note {
          font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: var(--graphite);
          border-left: 2px solid var(--amber); padding-left: 14px; margin-top: 24px;
        }

        /* --- Gallery --- */
        .pf-gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 18px; }
        .pf-gallery-item {
          aspect-ratio: 4/3; background: linear-gradient(135deg, var(--parchment-2), #d9c9a3);
          border-radius: 6px; position: relative; overflow: hidden; cursor: pointer;
          display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between;
          padding: 16px; border: 1px solid rgba(27,36,48,0.1); text-decoration: none; color: var(--ink);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pf-gallery-item:hover { transform: translateY(-3px); box-shadow: 5px 6px 0 rgba(27,36,48,0.08); }
        .pf-gallery-item .pf-gallery-icon { color: var(--redpin); }
        .pf-gallery-item h4 { font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; margin: 0; font-weight: 600; line-height: 1.25; }
        .pf-gallery-item span { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: var(--teal); text-transform: uppercase; letter-spacing: 0.04em; }

        /* --- Writing --- */
        .pf-write-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .pf-write-card { background: #FBF7ED; border: 1px solid rgba(27,36,48,0.12); border-left: 4px solid var(--redpin); padding: 20px 22px; border-radius: 4px; }
        .pf-write-card h4 { font-family: 'Space Grotesk', sans-serif; margin: 0 0 8px; font-size: 1rem; }
        .pf-write-card span { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--teal); }
        .pf-write-excerpt { font-size: 0.88rem; color: var(--graphite); line-height: 1.55; margin: 12px 0 4px; font-style: italic; }

        /* --- Contact --- */
        .pf-contact { text-align: left; }
        .pf-contact-links { display: flex; gap: 16px; margin-top: 26px; flex-wrap: wrap; }
        .pf-contact-links a {
          display: inline-flex; align-items: center; gap: 8px; color: var(--ink); text-decoration: none;
          font-family: 'Space Grotesk', sans-serif; font-weight: 600; padding: 10px 18px; border: 1.5px solid var(--ink); border-radius: 4px;
          transition: all 0.2s ease;
        }
        .pf-contact-links a:hover { background: var(--ink); color: var(--parchment); }

        .pf-footer { padding: 30px 8vw; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--graphite); opacity: 0.6; }
      `}</style>

      {/* NAV */}
      <nav className="pf-nav">
        <div className="pf-nav-brand" onClick={() => scrollTo("hero")}>
          <span className="pf-nav-dot" /> Mutale Wayne Mukuka
        </div>
        <div className="pf-nav-tabs">
          {SECTIONS.filter((s) => s.id !== "hero").map((s) => (
            <button key={s.id} className="pf-nav-tab" onClick={() => scrollTo(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="pf-main">
        {/* HERO */}
        <section id="hero" ref={(el) => (refs.current.hero = el)} className="pf-section pf-hero">
          <div className="pf-stamp"><Sparkles size={13} /> Open for opportunities</div>
          <h1 className="pf-h1 pf-display pf-hero-title">
            Mutale Wayne Mukuka<br />Game Developer
          </h1>
          <p className="pf-lede pf-hero-sub">
            Gameplay programmer and technical artist working across Unity, C#, 3D, and digital art.
            This is a working design document of everything I've made — playable, readable, and a little annotated.
          </p>
          <div className="pf-hero-cta">
            <button className="pf-btn pf-btn-primary" onClick={() => scrollTo("projects")}>
              View Project Log <ChevronRight size={16} />
            </button>
            <button className="pf-btn pf-btn-ghost" onClick={() => scrollTo("contact")}>
              Get In Touch
            </button>
          </div>
        </section>

        {/* ABOUT / SKILLS */}
        <section id="about" ref={(el) => (refs.current.about = el)} className="pf-section">
          <div className="pf-eyebrow">Character Sheet</div>
          <h2 className="pf-h2 pf-display">What I bring to a team</h2>
          <p className="pf-lede" style={{ marginBottom: 30 }}>
            Ranks below are self-assessed and mean exactly what they say: Veteran = I'd confidently lead this,
            Adept = I'm reliable and still growing, Novice = actively learning and hungry for it.
            <span className="pf-pin-wrap">
              <button className="pf-pin-btn" onClick={() => setOpenPin(openPin === "ranks" ? null : "ranks")}>
                <Pin size={12} />
              </button>
              {openPin === "ranks" && (
                <div className="pf-pin-note">
                  Note to self: replace this whole section with real project-backed evidence for each skill — link a project to each tag once live.
                </div>
              )}
            </span>
          </p>
          <div className="pf-skill-grid">
            {Object.entries(SKILLS).map(([category, data]) => {
              const Icon = data.icon;
              return (
                <div className="pf-skill-card" key={category}>
                  <div className="pf-skill-head">
                    <Icon size={18} color="var(--redpin)" />
                    <h3>{category}</h3>
                  </div>
                  <div className="pf-tag-row">
                    {data.tags.map((t) => (
                      <span className="pf-tag" key={t.name}>
                        <span className="pf-tag-dot" style={{ background: TIER_COLOR[t.tier] }} />
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" ref={(el) => (refs.current.experience = el)} className="pf-section">
          <div className="pf-eyebrow">Professional Experience</div>
          <h2 className="pf-h2 pf-display">Where I've worked</h2>
          {EXPERIENCE.map((job) => (
            <div className="pf-exp-item" key={job.role + job.company}>
              <h3 className="pf-exp-role">{job.role} — {job.company}</h3>
              <div className="pf-exp-meta">{job.date}</div>
              <ul>
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="projects" ref={(el) => (refs.current.projects = el)} className="pf-section">
          <div className="pf-eyebrow">Project Log</div>
          <h2 className="pf-h2 pf-display">Selected work</h2>
          <div className="pf-filters">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                className={`pf-filter-chip ${activeFilter === c ? "active" : ""}`}
                onClick={() => setActiveFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="pf-project-grid">
            {filteredProjects.map((p) => (
              <div className="pf-card" key={p.title}>
                <span className="pf-card-stamp">{p.stamp}</span>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="pf-tool-row">
                  {p.tools.map((t) => (
                    <span className="pf-tool-chip" key={t}>{t}</span>
                  ))}
                </div>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-card-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={13} /> {p.linkLabel || "View"}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PLAYABLES */}
        <section id="playables" ref={(el) => (refs.current.playables = el)} className="pf-section">
          <div className="pf-eyebrow">Playables</div>
          <h2 className="pf-h2 pf-display">Play it yourself</h2>
          <div className="pf-playable-card">
            <div>
              <h3 className="pf-display">Project Codename: DRIFT</h3>
              <p>Browser-playable prototype — momentum platforming, 12 hand-built levels.</p>
            </div>
            <button className="pf-play-btn"><Play size={16} /> Play on itch.io</button>
          </div>
          <div className="pf-playable-card">
            <div>
              <h3 className="pf-display">Systems Sandbox</h3>
              <p>Emergent rule-combination sandbox. Best played with sound on.</p>
            </div>
            <button className="pf-play-btn"><Play size={16} /> Play on itch.io</button>
          </div>
          <p className="pf-embed-note">
            To wire this up for real: upload your build to itch.io (free), enable "embed on your site,"
            and swap this card's button for an &lt;iframe&gt; pointing at your game's itch.io embed URL.
          </p>
        </section>

        {/* ART */}
        <section id="art" ref={(el) => (refs.current.art = el)} className="pf-section">
          <div className="pf-eyebrow">Visual Development</div>
          <h2 className="pf-h2 pf-display">Art &amp; concept</h2>
          <div className="pf-gallery-grid">
            {ART_PIECES.map((a) => (
              <a className="pf-gallery-item" key={a.title} href={a.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="pf-gallery-icon" />
                <div>
                  <h4>{a.title}</h4>
                  <span>{a.tag}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="pf-embed-note">
            Each tile links out to Instagram for now — once you've got specific post URLs, swap each
            entry's <code>link</code> in <code>ART_PIECES</code> to point at that exact piece.
          </p>
        </section>

        {/* 3D */}
        <section id="world" ref={(el) => (refs.current.world = el)} className="pf-section">
          <div className="pf-eyebrow">3D &amp; Environment Art</div>
          <h2 className="pf-h2 pf-display">Models &amp; game-ready assets</h2>
          <div className="pf-gallery-grid">
            {MODELS_3D.map((m) => (
              <a className="pf-gallery-item" key={m.title} href={m.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={16} className="pf-gallery-icon" />
                <div>
                  <h4>{m.title}</h4>
                  <span>{m.tag}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="pf-embed-note">
            If you set up a free Sketchfab or ArtStation profile, link each entry there instead of Drive —
            gives visitors a real interactive 3D viewer or a proper portfolio gallery.
          </p>
        </section>

        {/* ANIMATION */}
        <section id="animation" ref={(el) => (refs.current.animation = el)} className="pf-section">
          <div className="pf-eyebrow">Animation</div>
          <h2 className="pf-h2 pf-display">Motion &amp; animation reels</h2>
          <div className="pf-gallery-grid">
            {ANIMATIONS.map((v) => (
              <a className="pf-gallery-item" key={v.title} href={v.link} target="_blank" rel="noopener noreferrer">
                <Play size={16} className="pf-gallery-icon" />
                <div>
                  <h4>{v.title}</h4>
                  <span>{v.tag}</span>
                </div>
              </a>
            ))}
          </div>
          <p className="pf-embed-note">
            Once you upload reels to YouTube or Instagram, swap each <code>link</code> in
            <code> ANIMATIONS</code> for the direct video URL.
          </p>
        </section>

        {/* WRITING */}
        <section id="writing" ref={(el) => (refs.current.writing = el)} className="pf-section">
          <div className="pf-eyebrow">Narrative Design</div>
          <h2 className="pf-h2 pf-display">Worldbuilding &amp; writing</h2>
          <div className="pf-write-grid">
            {WRITING_SAMPLES.map((w) => (
              <div className="pf-write-card" key={w.title}>
                <h4>{w.title}</h4>
                <span>{w.tag}</span>
                <p className="pf-write-excerpt">{w.excerpt}</p>
                {w.link && (
                  <a href={w.link} target="_blank" rel="noopener noreferrer" className="pf-card-link">
                    <ExternalLink size={13} /> {w.linkLabel || "Read more"}
                  </a>
                )}
              </div>
            ))}
          </div>
          <p className="pf-embed-note">
            All three currently point at your full Drive archive — swap each <code>link</code> for the
            specific doc's Drive/PDF link once your files are organized into individual pieces.
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" ref={(el) => (refs.current.contact = el)} className="pf-section pf-contact">
          <div className="pf-eyebrow">Get In Touch</div>
          <h2 className="pf-h2 pf-display">Let's build something</h2>
          <p className="pf-lede">
            Open to game design, technical design, and gameplay programming roles — indie or studio.
            Reach out and I'll get back to you within a day or two.
          </p>
          <div className="pf-contact-links">
            <a href="mailto:m.mukuka1323@gmail.com"><Mail size={16} /> Email</a>
            <a href="https://www.linkedin.com/in/mutale-mukuka-0338a0234/" target="_blank" rel="noopener noreferrer"><Link2 size={16} /> LinkedIn</a>
            <a href="https://github.com/heraway" target="_blank" rel="noopener noreferrer"><Link2 size={16} /> GitHub</a>
            <a href="https://heraway.itch.io" target="_blank" rel="noopener noreferrer"><Play size={16} /> itch.io</a>
            <a href="https://www.artstation.com/heraway" target="_blank" rel="noopener noreferrer"><Palette size={16} /> ArtStation</a>
            <a href="https://www.instagram.com/heraway_/" target="_blank" rel="noopener noreferrer"><AtSign size={16} /> Instagram</a>
            <a href={DRIVE_LINK} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Full Archive (Drive)</a>
          </div>
        </section>

        <div className="pf-footer">Design doc v1.0 — last updated 2026 — built with React</div>
      </main>
    </div>
  );
}