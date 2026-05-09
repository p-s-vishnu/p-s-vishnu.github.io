import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Project = {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  stack: string[];
  year: string;
  url: string;
};

type WritingItem = {
  title: string;
  blurb: string;
  tag: string;
  date: string;
  slug: string;
  featured?: boolean;
};

type NoteItem = {
  title: string;
  blurb: string;
  tag: string;
  slug: string;
};


const PROJECTS: Project[] = [
  {
    title: 'Data Agent',
    tagline: 'LLM agent for messy real-world tabular data',
    description:
      'Schema inference, tool design, and the failure modes you only see in production. Wires an LLM to spreadsheets and CSVs and returns answers you can trust.',
    tags: ['Agents', 'LLM', 'Python'],
    stack: ['Python', 'LangGraph', 'FastAPI', 'Postgres'],
    year: '2025',
    url: 'https://github.com/p-s-vishnu/data-agent',
  },
  {
    title: 'Meetily',
    tagline: 'Privacy-first, local AI meeting assistant',
    description:
      '4x faster live transcription with Parakeet/Whisper, speaker diarization, Ollama summaries. Self-hosted, open-source, runs entirely on your machine.',
    tags: ['LLM', 'Audio', 'Rust'],
    stack: ['Rust', 'Whisper', 'Ollama', 'Tauri'],
    year: '2025',
    url: 'https://github.com/p-s-vishnu/meetily',
  },
  {
    title: 'Data-Quality-Driven MLOps',
    tagline: 'Data-centric strategies for production ML',
    description:
      'Empirical study showing how data quality interventions outperform model tweaks for real-world ML performance.',
    tags: ['MLOps', 'Research'],
    stack: ['Python', 'MLflow', 'DVC', 'Great Expectations'],
    year: '2024',
    url: 'https://github.com/p-s-vishnu/data-quality-driven-mlops',
  },
  {
    title: 'Cassava Leaf Disease Classification',
    tagline: 'CV classifier shipped as a one-line install',
    description:
      "Image classifier for detecting diseases in cassava plants. PyTorch + scikit-learn, packaged so any farmer's app can pip install cassava-classifier.",
    tags: ['CV', 'PyTorch'],
    stack: ['PyTorch', 'scikit-learn', 'Streamlit'],
    year: '2021',
    url: 'https://github.com/p-s-vishnu/cassava-leaf-disease-classification',
  },
  {
    title: 'Taxi Fare Prediction - Vertex AI',
    tagline: 'Real-time ML serving on GCP',
    description:
      'Stream fare predictions with TensorFlow on Pub/Sub to Dataflow to BigQuery to Vertex AI. End-to-end cloud ML pipeline.',
    tags: ['MLOps', 'GCP'],
    stack: ['TensorFlow', 'Vertex AI', 'Dataflow', 'BigQuery'],
    year: '2022',
    url: 'https://medium.com/@psvishnu/online-prediction-using-gcps-vertex-ai-e5fbc089906d',
  },
];

const WRITING: WritingItem[] = [
  {
    title: 'Why Your LLM Is Slow (And the 5 Papers That Fix It)',
    blurb:
      'A quick tour through FlashAttention, paged KV-cache, speculative decoding and friends - what each one actually changes.',
    tag: 'LLM - MLOps',
    date: 'Feb 2026',
    slug: '/blog/why-your-llm-is-slow',
    featured: true,
  },
  {
    title: 'Building a Production Data Analysis Agent',
    blurb:
      'Notes from wiring an LLM to messy real-world tabular data - schema inference, tool design, and the failure modes you only see in production.',
    tag: 'Agents - LLM',
    date: 'Aug 2025',
    slug: '/blog/building-a-data-analysis-agent',
  },
  {
    title: 'Learnings from Monzo at AWS re:Invent',
    blurb:
      'How Monzo scaled from 4M to 8M customers with a tiny infra team - the talks that mattered for ML platform teams.',
    tag: 'MLOps',
    date: 'Jan 2024',
    slug: '/blog/2024/01/06/Monzo-AWS-reInvent',
  },
];

const NOTES: NoteItem[] = [
  {
    title: 'Transformer self-attention, derived from scratch',
    blurb:
      'Q, K, V matrices and why scaled dot-product works the way it does - with worked examples.',
    tag: 'Math',
    slug: '/notes/transformers/self-attention',
  },
  {
    title: 'RAG retrieval cheatsheet',
    blurb:
      'BM25 vs dense vs hybrid, when to rerank, chunking heuristics that actually move metrics.',
    tag: 'RAG',
    slug: '/notes/rag/retrieval-cheatsheet',
  },
  {
    title: 'vLLM serving knobs that matter',
    blurb:
      'Tensor parallelism, paged attention, prefix caching - what each flag changes for throughput and TTFT.',
    tag: 'MLOps',
    slug: '/notes/llm/vllm-knobs',
  },
  {
    title: 'Evaluating agents without going insane',
    blurb:
      'Trajectory-level evals, golden traces, and how to keep regressions from sneaking past.',
    tag: 'Agents',
    slug: '/notes/agents/eval',
  },
  {
    title: 'Probability and stats refresher for ML',
    blurb: 'The minimum viable probability you need before reading any ML paper.',
    tag: 'Math',
    slug: '/notes/math/probability',
  },
  {
    title: 'Information retrieval fundamentals',
    blurb: 'TF-IDF, BM25, vector spaces - the boring stuff that makes RAG work.',
    tag: 'IR',
    slug: '/notes/ir/fundamentals',
  },
];

const ACCENT_COLORS = ['#ff5a3c', '#d4ff3a', '#7c5cff', '#3affb7'] as const;
const DEFAULT_ACCENT = '#ff5a3c';
const FILTER_TAGS = ['All', 'Agents', 'LLM', 'MLOps', 'CV'];
const LS_KEY = 'portfolio-accent';

// ---------------------------------------------------------------------------
// Accent picker (floating corner)
// ---------------------------------------------------------------------------

function AccentPicker({
  accent,
  setAccent,
}: {
  accent: string;
  setAccent: (c: string) => void;
}) {
  return (
    <div className="ex-accent-picker" aria-label="Choose accent color">
      {ACCENT_COLORS.map((c) => (
        <button
          key={c}
          onClick={() => setAccent(c)}
          aria-label={`Accent ${c}`}
          aria-pressed={accent === c}
          className={`ex-accent-swatch${accent === c ? ' ex-accent-swatch--active' : ''}`}
          style={{ background: c }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero({ accent }: { accent: string }) {
  return (
    <section className="ex-hero">
      <div className="ex-hero__eyebrow">Vishnu P.S. · AI Engineer · UK</div>
      <h1 className="ex-hero__headline">
        Building
        <br />
        <em className="ex-hero__headline-em" style={{ color: accent }}>
          intelligent
        </em>
        <br />
        systems<span style={{ color: accent }}>.</span>
      </h1>
      <div className="ex-hero__below">
        <div />
        <div className="ex-hero__copy">
          <p className="ex-hero__body">
            I&apos;m Vishnu - currently building AI at{' '}
            <a
              href="https://www.courtcorrect.com/"
              className="ex-hero__inline-link"
              style={{ textDecorationColor: accent }}
              target="_blank"
              rel="noreferrer"
            >
              CourtCorrect
            </a>
            . Previously ML at Vodafone, contributor at Cohere. I write about LLMs, RAG,
            agents, and the parts of model serving nobody warned you about.
          </p>
          <div className="ex-hero__ctas">
            <a
              href="#projects"
              className="ex-cta-primary"
              style={{ background: accent, color: '#08080a' }}
            >
              See projects ↘
            </a>
            <a href="/blog" className="ex-cta-outline">
              Read the blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

function ProjectRow({
  project,
  idx,
  accent,
}: {
  key?: React.Key;
  project: Project;
  idx: number;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer"
      className={`ex-project-row${hovered ? ' ex-project-row--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <span
          className="ex-project-row__bar"
          style={{ background: accent }}
          aria-hidden="true"
        />
      )}
      <span className="ex-project-row__idx">{String(idx).padStart(2, '0')}</span>
      <div className="ex-project-row__title-col">
        <span
          className="ex-project-row__title"
          style={{ color: hovered ? accent : undefined }}
        >
          {project.title}
        </span>
        <span className="ex-project-row__tagline">{project.tagline}</span>
      </div>
      <div className="ex-project-row__desc-col">
        <span className="ex-project-row__desc">{project.description}</span>
        <div className="ex-project-row__stack">
          {project.stack.slice(0, 4).map((s) => (
            <span key={s} className="ex-chip">
              {s}
            </span>
          ))}
        </div>
      </div>
      <span className="ex-project-row__year">{project.year}</span>
      <span
        className="ex-project-row__arrow"
        style={{
          color: hovered ? accent : undefined,
          transform: hovered ? 'translateX(4px)' : undefined,
        }}
      >
        ↗
      </span>
    </a>
  );
}

function Projects({ accent }: { accent: string }) {
  const [filter, setFilter] = useState('All');
  const filtered =
    filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="ex-section">
      <div className="ex-projects__header">
        <h2 className="ex-section-title">
          Selected{' '}
          <em className="ex-section-title__em" style={{ color: accent }}>
            work
          </em>
        </h2>
        <div className="ex-filter-pills">
          {FILTER_TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`ex-filter-pill${filter === t ? ' ex-filter-pill--active' : ''}`}
              style={
                filter === t ? { background: accent, color: '#08080a', border: 'none' } : undefined
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="ex-project-list">
        {filtered.map((p, i) => (
          <ProjectRow key={p.title} project={p} idx={i + 1} accent={accent} />
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Writing / Essays
// ---------------------------------------------------------------------------

function Writing({ accent }: { accent: string }) {
  return (
    <section id="writing" className="ex-section">
      <h2 className="ex-section-title">
        Recent{' '}
        <em className="ex-section-title__em" style={{ color: accent }}>
          blogs
        </em>
      </h2>
      <div className="ex-essays-grid">
        {WRITING.map((w, i) => (
          <a
            key={w.slug}
            href={w.slug}
            className={`ex-essay-card${i === 0 ? ' ex-essay-card--featured' : ''}`}
            style={i === 0 ? { background: accent } : undefined}
          >
            <span
              className="ex-essay-card__tag"
              style={{ color: i === 0 ? '#08080a' : accent }}
            >
              {i === 0 ? 'Featured - ' : ''}
              {w.tag}
            </span>
            <div>
              <div
                className={`ex-essay-card__title${
                  i === 0 ? ' ex-essay-card__title--featured' : ''
                }`}
                style={{ color: i === 0 ? '#08080a' : undefined }}
              >
                {w.title}
              </div>
              <p
                className="ex-essay-card__blurb"
                style={{ color: i === 0 ? 'rgba(8,8,10,0.70)' : undefined }}
              >
                {w.blurb}
              </p>
            </div>
            <span
              className="ex-essay-card__date"
              style={{ color: i === 0 ? 'rgba(8,8,10,0.55)' : undefined }}
            >
              {w.date} →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

function NoteRow({
  note,
  idx,
  accent,
}: {
  key?: React.Key;
  note: NoteItem;
  idx: number;
  accent: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <li className="ex-note-item">
      <Link
        to={note.slug}
        className="ex-note-row"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="ex-note-row__idx">{String(idx).padStart(2, '0')}</span>
        <div>
          <div
            className="ex-note-row__title"
            style={{ color: hovered ? accent : undefined }}
          >
            {note.title}
          </div>
          <div className="ex-note-row__blurb">{note.blurb}</div>
        </div>
        <span className="ex-note-row__tag" style={{ color: accent }}>
          {note.tag}
        </span>
      </Link>
    </li>
  );
}

function Notes({ accent }: { accent: string }) {
  return (
    <section id="notes" className="ex-section">
      <div className="ex-notes-grid">
        <div className="ex-notes-left">
          <h2 className="ex-section-title">
            <em className="ex-section-title__em" style={{ color: accent }}>
              Notes
            </em>
          </h2>
          <p className="ex-notes-desc">
            Working notes I keep updating - math, retrieval, serving, evals. Less polished than
            the blog, more useful as reference.
          </p>
        </div>
        <ol className="ex-notes-list">
          {NOTES.map((n, i) => (
            <NoteRow key={n.slug} note={n} idx={i + 1} accent={accent} />
          ))}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function SiteFooter({ accent }: { accent: string }) {
  return (
    <footer className="ex-footer">
      <h2 className="ex-footer__headline">
        Let&apos;s{' '}
        <em style={{ color: accent }}>build</em>
        <br />
        something<span style={{ color: accent }}>.</span>
      </h2>
      <div className="ex-footer__email-row">
        <a
          href="mailto:hellovishnups@gmail.com"
          className="ex-footer__email"
          style={{ textDecorationColor: accent }}
        >
          hellovishnups@gmail.com
        </a>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page root
// ---------------------------------------------------------------------------

export default function Home(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();

  const [accent, setAccent] = useState<string>(DEFAULT_ACCENT);

  // Hydrate from localStorage after mount to avoid SSR hydration mismatch
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_KEY);
      if (stored && (ACCENT_COLORS as readonly string[]).includes(stored)) {
        setAccent(stored);
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) - fine to ignore
    }
  }, []);

  // Sync accent to :root so navbar/logo (outside ex-canvas wrapper) inherit it
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--accent', accent);
    }
  }, [accent]);

  const handleAccent = useCallback((c: string) => {
    setAccent(c);
    try {
      localStorage.setItem(LS_KEY, c);
    } catch {
      // ignore
    }
  }, []);

  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
      wrapperClassName="ex-page-wrapper"
    >
      <div className="ex-canvas">
        <AccentPicker accent={accent} setAccent={handleAccent} />
        <Hero accent={accent} />
        <Writing accent={accent} />
        <Projects accent={accent} />
        <Notes accent={accent} />
        <SiteFooter accent={accent} />
      </div>
    </Layout>
  );
}
