export const issueType = {
  name: 'issue',
  title: 'Issue',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
    { name: 'number', title: 'Edition number', type: 'string' },
    { name: 'cover', title: 'Cover', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published date', type: 'datetime' },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'summary', title: 'Summary', type: 'text', rows: 3 },
    { name: 'body', title: 'Editorial body', type: 'text', rows: 8 },
    { name: 'articles', title: 'Related articles', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }] },
    { name: 'pdf', title: 'PDF file', type: 'file', options: { accept: 'application/pdf' } },
    { name: 'pdfUrl', title: 'PDF file', type: 'url' },
    {
      name: 'status',
      title: 'Publication status',
      type: 'string',
      options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Published', value: 'published' }] },
      initialValue: 'draft',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'title', title: 'SEO title', type: 'string' },
        { name: 'description', title: 'SEO description', type: 'text', rows: 2 },
      ],
    },
  ],
};
