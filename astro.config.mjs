// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: 'https://benoabarcas.github.io',
  base: isGitHubPagesBuild ? '/p1' : '/',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
