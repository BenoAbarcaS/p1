// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === 'true';
const isDevelopment = process.env.NODE_ENV === 'development';
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const sanityProjectId = env.PUBLIC_SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID || env.SANITY_PROJECT_ID;
const sanityDataset = env.PUBLIC_SANITY_DATASET || env.SANITY_STUDIO_DATASET || env.SANITY_DATASET || 'production';
const sanityIntegration = sanityProjectId && sanityProjectId !== 'your_project_id'
  ? sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      useCdn: false,
      studioBasePath: '/studio',
    })
  : undefined;

export default defineConfig({
  site: 'https://benoabarcas.github.io',
  base: isGitHubPagesBuild ? '/p1' : '/',
  integrations: [
    sitemap(),
    ...(!isDevelopment && sanityIntegration ? [react(), sanityIntegration] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
