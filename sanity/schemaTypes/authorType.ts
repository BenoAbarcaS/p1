export const authorType = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (Rule: any) => Rule.required() },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Biography', type: 'text', rows: 6 },
    { name: 'speciality', title: 'Speciality', type: 'string' },
    { name: 'links', title: 'Public links', type: 'array', of: [{ type: 'url' }] },
  ],
};
