import { defineCollection, z } from 'astro:content';
import { getYoutubeVideoId } from '../utils/youtube';

const actualitesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    image: z.string().optional(),
    imageLink: z.string().optional(),
    imageLegend: z.string().optional(),
    carousel: z.array(z.string()).optional(),
    youtube: z
      .string()
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
