import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vishnu P.S.',
  tagline: 'AI Engineer - Deep Learning | LLM | RAG | Agents | MLOps',
  favicon: 'img/favicon.ico',
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
    './src/clientModules/accent-init.js',
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
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon-16x16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/img/favicon-192x192.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/img/apple-touch-icon.png',
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
    // Replace with your project's social card
    image: 'img/og-social-card.png',
    stylesheets: [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
      'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css',
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'Vishnu P.S.',
      logo: {
        alt: 'Vishnu\'s Portfolio Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   label: 'Notes',
        //   to: '/notes',
        //   position: 'right',
        // },
        {
          to: '/blog',
          label: 'Blogs',
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
              label: 'GitHub',
              href: 'https://github.com/p-s-vishnu',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/psvishnu/',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/@psvishnu',
            },
            {
              label: 'Kaggle',
              href: 'https://www.kaggle.com/psvishnu',
            },
          ],
        },
      ],
      copyright: '© 2026 - VISHNUPS.COM',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
      defaultLanguage: 'python',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;