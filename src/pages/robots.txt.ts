import type { APIRoute } from 'astro';

const robots = `User-agent: *
Allow: /

Sitemap: https://example.com/sitemap-index.xml
`;

export const GET: APIRoute = () => {
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
