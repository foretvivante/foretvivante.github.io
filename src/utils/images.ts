import { getImage } from 'astro:assets';

/**
 * Resolves image imports for use with Astro's <Image /> component.
 * Uses import.meta.glob to enable dynamic image resolution from content.
 */
const imageModules = import.meta.glob<{ default: import('astro').ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,gif,webp,svg}',
  { eager: true }
);

const IMAGES_ROOT = '/src/assets/images/';

const imageMap = new Map<string, import('astro').ImageMetadata>();
for (const [path, mod] of Object.entries(imageModules)) {
  if (!mod.default) continue;
  // Store by relative path from images root (e.g. "2026-03-01/photo.jpg")
  const relativePath = path.startsWith(IMAGES_ROOT)
    ? path.slice(IMAGES_ROOT.length)
    : path;
  imageMap.set(relativePath, mod.default);
  // Also store by filename alone for backward compatibility
  const filename = path.split('/').pop() ?? '';
  if (!imageMap.has(filename)) {
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
