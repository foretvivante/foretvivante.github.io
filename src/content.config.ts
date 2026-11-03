import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { getYoutubeVideoId } from './utils/youtube';

const actualitesCollection = defineCollection({
  // Files starting with "_" (e.g. _index.md) are excluded, as with legacy collections
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/actualites' }),
  schema: z.object({
    date: z.coerce.date(),
    image: z.string().optional(),
    imageLink: z.string().optional(),
    imageLegend: z.string().optional(),
    carousel: z.array(z.string()).optional(),
    youtube: z
      .url()
      .refine((url) => getYoutubeVideoId(url) !== undefined, {
        message: 'Invalid YouTube video URL',
      })
      .optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  actualites: actualitesCollection,
};
