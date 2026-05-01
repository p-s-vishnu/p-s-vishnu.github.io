import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vishnu P.S.',
  tagline: 'AI Engineer - Deep Learning | LLM | RAG | Agents | MLOps',
  favicon: 'img/logo.svg',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Client modules for browser-side functionality
  clientModules: [
    './src/clientModules/navbar-scroll.js',
  ],

  // Preconnect to external resources for better performance
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
  ],

  // Set the production url of your site here
  url: 'https://www.vishnups.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/', // Set to '/' for custom domain deployment on GitHub Pages

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'p-s-vishnu', // Your GitHub org/user name.
  projectName: 'p-s-vishnu.github.io', // Your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        blog: {
          routeBasePath: '/blog',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/p-s-vishnu/p-s-vishnu.github.io/tree/master/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        docs: {
          path: 'notes',
          routeBasePath: '/notes',
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/p-s-vishnu/p-s-vishnu.github.io/tree/master/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-J8413B0NWF',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,

    ],
  ],

  plugins: [

  ],

  themeConfig: {
    algolia: {
      // The application ID provided by Algolia
      appId: '0T9WWE13Y1',
      // Public API key: it is safe to commit it
      apiKey: '0d4b182df6b49719598fbb36c329924a',
      indexName: 'psvishnu-blogs',

      // Optional: see https://algolia.com/docs/lite-client/usage/
      // searchParameters: {
      //   facetFilters: ['language:en', 'version:current'],
      // },

      // Optional: path for search page that Algolia will use to display search results
      contextualSearch: false, // Disabled temporarily until Algolia index is properly configured

      // Optional: Algolia search parameters
      // externalUrlRegex: 'external\.com/docs/',

      // Optional: Replace internal Docusaurus search with Algolia search
      // replaceInternalSearch: true,

      // Optional: Specify search options
      // searchPagePath: 'search',

      // Optional: Algolia search options
      // debug: true,
    },
    // Open Graph / Twitter social card
    image: 'img/og-social-card.png',
    stylesheets: [
      'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css',
    ],
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Vishnu P.S.',
      logo: {
        alt: 'Vishnu P.S. monogram',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Notes',
          to: '/notes',
          position: 'right',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'right',
        },
        // {
        //   label: 'Projects',
        //   to: '/projects',
        //   position: 'right',
        // },
        {
          label: 'About',
          to: '/about',
          position: 'right'
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          items: [
            {
              html: `<a href="https://www.linkedin.com/in/psvishnu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg></a>`,
            },
            {
              html: `<a href="https://medium.com/@psvishnu" target="_blank" rel="noopener noreferrer" aria-label="Medium" title="Medium"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.54 12a6.8 6.8 0 1 1-13.6 0 6.8 6.8 0 0 1 13.6 0zm7.46 0c0 3.54-1.52 6.42-3.4 6.42S14.2 15.54 14.2 12s1.52-6.42 3.4-6.42S21 8.46 21 12zm3 0c0 3.18-.54 5.76-1.2 5.76-.66 0-1.2-2.58-1.2-5.76s.54-5.76 1.2-5.76c.66 0 1.2 2.58 1.2 5.76z"/></svg></a>`,
            },
            {
              html: `<a href="mailto:hellovishnups@gmail.com" aria-label="Email" title="Email"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>`,
            },
            {
              html: `<a href="https://github.com/p-s-vishnu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.78-1.34-1.78-1.1-.74.08-.72.08-.72 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .3"/></svg></a>`,
            },
            {
              html: `<a href="https://www.kaggle.com/psvishnu" target="_blank" rel="noopener noreferrer" aria-label="Kaggle" title="Kaggle"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.83 23.16h-3.91a.62.62 0 0 1-.5-.25l-5.34-6.94-1.6 1.5v5.18a.46.46 0 0 1-.5.51H4.06a.45.45 0 0 1-.5-.5V.83A.45.45 0 0 1 4.05.32h2.92a.46.46 0 0 1 .5.5v13.28L13.7 7.7a.86.86 0 0 1 .58-.27h4.04a.43.43 0 0 1 .43.27.41.41 0 0 1-.06.5l-6.36 6.13 6.85 8.18c.13.16.16.35.05.5a.42.42 0 0 1-.4.16z"/></svg></a>`,
            },
            {
              html: `<a href="/rss.xml" target="_blank" rel="noopener noreferrer" aria-label="RSS Feed" title="RSS Feed"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44a15.56 15.56 0 0 1 15.56 15.56h-3.1A12.46 12.46 0 0 0 4 7.54V4.44zm0 5.55a10 10 0 0 1 10 10h-3.1A6.91 6.91 0 0 0 4 13.1v-3.1z"/></svg></a>`,
            }
          ]
        },
      ]
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      defaultLanguage: 'python',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;