import { defineCollection, z } from 'astro:content';

const actualitesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    image: z.string().optional(),
    imageLink: z.string().optional(),
    carousel: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  actualites: actualitesCollection,
};
