export const articleType = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
    { name: 'subtitle', title: 'Subtitle', type: 'string' },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    {
      name: 'image',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    },
    { name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] },
    { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'publishedAt', title: 'Published at', type: 'datetime' },
    { name: 'updatedAt', title: 'Updated at', type: 'datetime' },
    {
      name: 'type',
      title: 'Tipo de publicación',
      type: 'string',
      options: { list: [{ title: 'Artículo', value: 'Artículo' }, { title: 'Ensayo', value: 'Ensayo' }, { title: 'Reportaje', value: 'Reportaje' }] },
      initialValue: 'Artículo',
    },
    {
      name: 'status',
      title: 'Editorial status',
      type: 'string',
      options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Published', value: 'published' }] },
      initialValue: 'draft',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        {
          name: 'table',
          title: 'Tabla',
          type: 'object',
          fields: [
            { name: 'headers', title: 'Encabezados', type: 'array', of: [{ type: 'string' }] },
            {
              name: 'rows',
              title: 'Filas',
              type: 'array',
              of: [
                {
                  name: 'tableRow',
                  title: 'Fila',
                  type: 'object',
                  fields: [{ name: 'cells', title: 'Celdas', type: 'array', of: [{ type: 'string' }] }],
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'readingTime', title: 'Reading time', type: 'string' },
    { name: 'relatedArticles', title: 'Related articles', type: 'array', of: [{ type: 'reference', to: [{ type: 'article' }] }] },
    { name: 'issue', title: 'Associated issue', type: 'reference', to: [{ type: 'issue' }] },
    { name: 'featured', title: 'Featured content', type: 'boolean', initialValue: false },
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
