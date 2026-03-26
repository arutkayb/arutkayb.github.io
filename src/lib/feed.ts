import Parser from 'rss-parser';

export interface FeedItem {
  title: string;
  excerpt: string;
  url: string;
  date: Date;
  imageUrl?: string;
}

function extractImageUrl(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : undefined;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

function extractSubtitle(html: string): string | undefined {
  const match = html.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
  if (!match) return undefined;
  const text = stripHtml(match[1]).trim();
  return text || undefined;
}

function extractExcerpt(html: string, maxLines: number): string {
  const cleaned = html.replace(/<figcaption[^>]*>[\s\S]*?<\/figcaption>/gi, '');
  const text = stripHtml(cleaned);
  const lines = text
    .split(/\n+/)
    .filter((l) => l.trim())
    .filter((l) => !l.trim().match(/^https?:\/\/\S+$/));
  return lines.slice(0, maxLines).join('\n');
}

export async function fetchMediumPosts(): Promise<FeedItem[]> {
  try {
    const parser = new Parser();
    const feed = await parser.parseURL('https://medium.com/feed/@arutkayb');
    return feed.items.map((item) => {
      const rawHtml = item['content:encoded'] ?? item.content ?? '';
      const subtitle = extractSubtitle(rawHtml);
      // Strip <h4> so the subtitle doesn't repeat in the body excerpt
      const bodyHtml = rawHtml.replace(/<h4[^>]*>[\s\S]*?<\/h4>/gi, '');
      const bodyExcerpt = extractExcerpt(bodyHtml, 7);
      const excerpt = subtitle ? `${subtitle}\n\n${bodyExcerpt}` : bodyExcerpt;
      return {
        title: item.title ?? 'Untitled',
        excerpt,
        url: item.link ?? '',
        date: new Date(item.pubDate ?? ''),
        imageUrl: extractImageUrl(rawHtml),
      };
    });
  } catch (e) {
    console.warn('Medium feed fetch failed:', e);
    return [];
  }
}


export async function getAllFeedItems(): Promise<FeedItem[]> {
  return fetchMediumPosts();
}
