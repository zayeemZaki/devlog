import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Zayeem\'s DevLog',
  tagline: 'Engineering notes from my journey building and learning.',
  favicon: 'img/ts-logo-512.svg',

  future: {
    v4: true, 
  },

  url: 'https://notes.zayeemzaki.com',
  baseUrl: '/',

  organizationName: 'zayeemZaki', 
  projectName: 'zayeems-devlog', 

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: false, // Disabled the blog feature to keep the focus strictly on your notes
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Zayeem\'s DevLog',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'notesSidebar',
          position: 'left',
          label: 'Notes',
        },
        {
          href: 'https://zayeemzaki.com',
          label: 'Portfolio',
          position: 'right',
        },
        {
          href: 'https://github.com/zayeemZaki',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'TypeScript DevLog',
              to: '/docs/typescript/intro',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'Portfolio',
              href: 'https://zayeemzaki.com',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/zayeemzaki/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zayeem Zaki.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['typescript'], // Ensures syntax highlighting is optimized for TS
    },
  } satisfies Preset.ThemeConfig,
};

export default config;