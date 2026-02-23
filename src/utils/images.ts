import { getImage } from 'astro:assets';

/**
 * Resolves image imports for use with Astro's <Image /> component.
 * Uses import.meta.glob to enable dynamic image resolution from content.
 */
const imageModules = import.meta.glob<{ default: import('astro').ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,gif,webp,svg}',
  { eager: true }
);

const imageMap = new Map<string, import('astro').ImageMetadata>();
for (const [path, mod] of Object.entries(imageModules)) {
  const filename = path.split('/').pop() ?? '';
  if (mod.default) {
    imageMap.set(filename, mod.default);
  }
}

export function getImageByFilename(filename: string): import('astro').ImageMetadata | undefined {
  return imageMap.get(filename);
}

/** Returns the optimized image URL for use in links/modals (e.g. onclick handlers). */
export async function getImageUrl(filename: string): Promise<string | undefined> {
  const image = imageMap.get(filename);
  if (!image) return undefined;
  const result = await getImage({ src: image });
  return result.src;
}
