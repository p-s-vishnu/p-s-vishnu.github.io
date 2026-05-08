import React from 'react';

type ExperienceItem = {
  year: string;
  role: string;
  org: string;
  orgUrl?: string;
  blurb: string;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    year: '2025',
    role: 'AI Engineer',
    org: 'CourtCorrect',
    orgUrl: 'https://www.courtcorrect.com/',
    blurb: 'Helping customers streamline complaints and reduce quality fails using AI.',
  },
  {
    year: '2024',
    role: 'Self-employed',
    org: 'Cohere AI - Zackriya Solutions',
    orgUrl: 'https://www.cohere.com/',
    blurb: 'Improving large language models - fine-tuning, evals, and RAG pipelines for clients.',
  },
  {
    year: '2023',
    role: 'MSc Artificial Intelligence',
    org: 'Queen Mary University of London',
    orgUrl: 'https://www.qmul.ac.uk/',
    blurb:
      'Specialised in NLP and deep learning. Thesis on data-quality-driven MLOps.',
  },
  {
    year: '2022',
    role: 'ML Engineer',
    org: 'Vodafone',
    orgUrl: 'https://www.vodafone.com/',
    blurb: 'Strengthening the Germany market.',
  },
  {
    year: '2020',
    role: 'Data Scientist',
    org: 'Happiest Minds',
    orgUrl: 'https://www.happiestminds.com/',
    blurb:
      'Stakeholder management, data engineering, analytics, modelling, and deployment end-to-end.',
  },
  {
    year: '2019',
    role: 'PG Diploma - Data Science',
    org: 'Great Lakes Institute of Management',
    blurb: 'Pivot from product engineering into ML.',
  },
  {
    year: '2018',
    role: 'Co-Dean and Lead Organizer',
    org: 'School of AI, Trivandrum',
    orgUrl: 'https://www.meetup.com/school-of-ai-trivandrum/',
    blurb: 'Built a non-profit community teaching ML to hundreds of students.',
  },
  {
    year: '2017',
    role: 'Product Engineer',
    org: 'Envestnet',
    orgUrl: 'https://www.envestnet.com/',
    blurb: "FinTech systems by day. Andrew Ng's ML and Udacity nanodegrees by night.",
  },
  {
    year: '2016',
    role: 'Co-founder',
    org: 'Amnoid Labs',
    blurb: 'Incubated a startup with friends at university.',
  },
];

const ACCENT: React.CSSProperties = { color: 'var(--accent)' };

export default function Experience(): React.ReactElement {
  return (
    <section className="ex-section">
      <h2 className="ex-section-title">
        A <em className="ex-section-title__em" style={ACCENT}>path</em> through ML
      </h2>
      <ol className="ex-exp-list">
        {EXPERIENCE.map((e, i) => (
          <li key={i} className="ex-exp-row">
            <span className="ex-exp-row__year" style={ACCENT}>
              {e.year}
            </span>
            <div>
              <div className="ex-exp-row__role">{e.role}</div>
              <div className="ex-exp-row__org">{e.org}</div>
            </div>
            <div className="ex-exp-row__blurb">{e.blurb}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
