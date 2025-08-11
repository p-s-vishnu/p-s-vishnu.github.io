import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vishnu P.S.',
  tagline: 'AI Engineer - Deep Learning | LLM | RAG | Agents | MLOps',
  favicon: 'img/old/icon_minion.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://p-s-vishnu.github.io', // Updated with your GitHub Pages URL
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/', // Set to '/' for custom domain deployment on GitHub Pages

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'p-s-vishnu', // Your GitHub org/user name.
  projectName: 'p-s-vishnu.github.io', // Your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

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
          routeBasePath: '/',
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/p-s-vishnu/p-s-vishnu.github.io/tree/main/', // Updated
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
            'https://github.com/p-s-vishnu/p-s-vishnu.github.io/tree/main/', // Updated
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
      contextualSearch: true,

      // Optional: Algolia search parameters
      // externalUrlRegex: 'external\.com/docs/',

      // Optional: Replace internal Docusaurus search with Algolia search
      // replaceInternalSearch: true,

      // Optional: Specify search options
      // searchPagePath: 'search',

      // Optional: Algolia search options
      // debug: true,
    },
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg', // You can update this later
    stylesheets: [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css',
    ],
    navbar: {
      title: 'Vishnu P.S.',
      logo: {
        alt: 'Vishnu\'s Portfolio Logo',
        src: 'img/old/icon_minion.png',
      },
      items: [
        {
          label: 'Notes',
          to: '/notes',
          position: 'right',
        },
        {
          to: '/',
          label: 'Blog',
          position: 'right',
        },
        {
          label: 'Projects',
          to: '/projects',
          position: 'right',
        },
        {
          label: 'About',
          to: '/',
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
              html: `<a href="https://www.linkedin.com/in/psvishnu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><i class="fa-brands fa-linkedin"></i></a>`,
            },
            {
              html: `<a href="https://medium.com/@psvishnu" target="_blank" rel="noopener noreferrer" aria-label="Medium" title="Medium"><i class="fa-brands fa-medium"></i></a>`,
            },
            {
              html: `<a href="mailto:hellovishnups@gmail.com" aria-label="Contact" title="Contact"><i class="fa-solid fa-envelope"></i></a>`,
            },
            {
              html: `<a href="https://github.com/p-s-vishnu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><i class="fa-brands fa-github"></i></a>`,
            },
            {
              html: `<a href="https://www.kaggle.com/psvishnu" target="_blank" rel="noopener noreferrer" aria-label="Kaggle" title="Kaggle"><i class="fa-brands fa-kaggle"></i></a>`,
            },
            {
              html: `<a href="/rss.xml" target="_blank" rel="noopener noreferrer" aria-label="RSS Feed" title="RSS Feed"><i class="fa-solid fa-rss"></i></a>`,
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