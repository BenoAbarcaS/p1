export const configType = {
  name: 'editorialConfig',
  title: 'Editorial configuration',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Site name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'description', title: 'General description', type: 'text', rows: 4 },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'socialLinks', title: 'Social links', type: 'array', of: [{ type: 'url' }] },
    { name: 'contactEmail', title: 'Public email', type: 'string' },
    { name: 'featuredStory', title: 'Featured story', type: 'reference', to: [{ type: 'article' }] },
    {
      name: 'seo',
      title: 'Global SEO settings',
      type: 'object',
      fields: [
        { name: 'siteTitle', title: 'Site title', type: 'string' },
        { name: 'metaDescription', title: 'Meta description', type: 'text', rows: 2 },
      ],
    },
  ],
};
