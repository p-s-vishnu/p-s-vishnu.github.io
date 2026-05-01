import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type FeaturedPost = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  blurb: string;
};

const featuredPosts: FeaturedPost[] = [
  {
    slug: '/blog/why-your-llm-is-slow',
    title: 'Why Your LLM Is Slow (And the 5 Papers That Fix It)',
    tag: 'LLM · MLOps',
    date: 'Feb 2026',
    blurb:
      'A quick tour through FlashAttention, paged KV-cache, speculative decoding and friends - what each one actually changes.',
  },
  {
    slug: '/blog/building-a-data-analysis-agent',
    title: 'Building a Production Data Analysis Agent',
    tag: 'Agents · LLM',
    date: 'Aug 2025',
    blurb:
      'Notes from wiring an LLM up to messy real-world tabular data - schema inference, tool design, and the failure modes you only see in production.',
  },
  {
    slug: '/blog/2024/01/06/Monzo-AWS-reInvent',
    title: 'Learnings from Monzo at AWS re:Invent',
    tag: 'MLOps',
    date: 'Jan 2024',
    blurb:
      'A deep dive into how Monzo scaled from 4M to 8M customers with a tiny infra team - the talks that mattered for ML platform teams.',
  },
];

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <div className="home-bg" aria-hidden="true">
        <span className="home-orb home-orb--indigo" />
        <span className="home-orb home-orb--violet" />
        <span className="home-orb home-orb--cyan" />
      </div>
      <header className="home-hero">
        <h1>AI Engineer working on LLMs, RAG and agents.</h1>
        <p className="lead">
          I'm Vishnu - currently building AI systems at CourtCorrect.
          Previously ML at Vodafone, contributed at Cohere, and write about
          deep learning, MLOps, and the parts of LLM serving that nobody
          warned you about.
        </p>
        <div className="home-cta">
          <Link className="button button--primary button--lg" to="/blog">
            Read the blog
          </Link>
          <Link className="button button--secondary button--lg" to="/notes">
            Browse notes
          </Link>
        </div>
      </header>

      <section className="home-section" aria-labelledby="featured-heading">
        <h2 id="featured-heading">Featured posts</h2>
        <div className="home-posts">
          {featuredPosts.map((post, i) => (
            <Link
              key={post.slug}
              to={post.slug}
              className={`home-post-card${i === 0 ? ' home-post-card--featured' : ''}`}
            >
              <span className="home-post-tag">{post.tag}</span>
              <span className="home-post-title">{post.title}</span>
              <p
                style={{
                  margin: '0 0 0.75rem',
                  fontSize: '0.9rem',
                  color: 'var(--ifm-font-color-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {post.blurb}
              </p>
              <span className="home-post-meta">{post.date}</span>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
