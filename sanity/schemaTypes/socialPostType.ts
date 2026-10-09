export const socialPostType = {
  name: 'socialPost',
  title: 'SocialPost',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'alt', title: 'Alt text', type: 'string' },
    { name: 'platform', title: 'Platform', type: 'string', options: { list: ['Instagram', 'YouTube', 'X'] } },
    { name: 'href', title: 'Original URL', type: 'url' },
    { name: 'publishedAt', title: 'Published date', type: 'datetime' },
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
