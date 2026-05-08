import React from 'react';

const SKILLS: Record<string, string[]> = {
  'AI - Data - MLOps': [
    'Python',
    'C++',
    'Rust',
    'Typescript',
    'PyTorch',
    'Keras TensorFlow',
    'Hugging Face',
    'vLLM',
    'LangChain',
    'LangSmith',
    'Streamlit',
  ],
  'Backend - DBs - DevOps': [
    'FastAPI',
    'PostgreSQL',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Google Cloud',
    'AWS',
    'Sentry',
    'Grafana',
    'Prometheus',
  ],
};

const ACCENT: React.CSSProperties = { color: 'var(--accent)' };

export default function Toolkit(): React.ReactElement {
  return (
    <section className="ex-section">
      <h2 className="ex-section-title">
        The <em className="ex-section-title__em" style={ACCENT}>toolkit</em>
      </h2>
      <div className="ex-skills-grid">
        {Object.entries(SKILLS).map(([group, items]) => (
          <div key={group} className="ex-skill-group">
            <div className="ex-skill-group__label" style={ACCENT}>
              {group}
            </div>
            <div className="ex-skill-group__chips">
              {items.map((s) => (
                <span key={s} className="ex-chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
