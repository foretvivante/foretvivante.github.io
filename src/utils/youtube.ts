/**
 * Extracts the video ID from a YouTube URL.
 * Supports youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID and youtube.com/embed/ID.
 */
export function getYoutubeVideoId(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }
  const host = parsed.hostname.replace(/^(www\.|m\.)/, '');
  let id: string | null | undefined;
  if (host === 'youtu.be') {
    id = parsed.pathname.slice(1);
  } else if (host === 'youtube.com') {
    id = parsed.searchParams.get('v') ?? parsed.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1];
  }
  return id && /^[\w-]{11}$/.test(id) ? id : undefined;
}

/** Returns the URL of the embedded player of a YouTube video, starting automatically. */
export function getYoutubeEmbedUrl(url: string): string | undefined {
  const id = getYoutubeVideoId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : undefined;
}

/** Returns the URL of the cover image of a YouTube video. */
export function getYoutubeThumbnailUrl(url: string): string | undefined {
  const id = getYoutubeVideoId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : undefined;
}
