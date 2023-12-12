import { CollectionConfig } from 'payload/types';

const BlogArticles: CollectionConfig = {
  slug: 'blog',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'text',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: false,
      admin: {
        condition: (_, document) => document.published,
      },
      defaultValue: () => new Date().toISOString(),
    },
  ],
};

export default BlogArticles;
