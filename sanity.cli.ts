import { defineCliConfig } from 'sanity/cli';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');

export default defineCliConfig({
  api: {
    projectId: env.SANITY_PROJECT_ID || env.SANITY_STUDIO_PROJECT_ID || env.PUBLIC_SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET || env.SANITY_STUDIO_DATASET || env.PUBLIC_SANITY_DATASET || 'production',
  },
});