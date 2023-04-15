import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math';
import remarkDirective from 'remark-directive';
import rehypeAsciimathKatex from './src/math';


import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://aleshkev.github.io',
  base: '/markdown-math-page',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [remarkGfm, remarkDirective, remarkMath,],
    rehypePlugins: [
      rehypeAsciimathKatex
    ],

    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-light',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});