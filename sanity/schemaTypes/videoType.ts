export const videoType = {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 4 },
    { name: 'youtubeUrl', title: 'YouTube URL', type: 'url' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published date', type: 'datetime' },
    { name: 'duration', title: 'Duration', type: 'string' },
    {
      name: 'status',
      title: 'Publication status',
      type: 'string',
      options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Published', value: 'published' }] },
      initialValue: 'draft',
    },
    { name: 'featured', title: 'Featured content', type: 'boolean', initialValue: false },
  ],
};
