// Sitemap generation utility
export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const baseUrl = 'https://cinely.vercel.app';
  const currentDate = new Date().toISOString().split('T')[0];

  const sitemapUrls = urls.map(url => {
    const fullUrl = url.loc.startsWith('http') ? url.loc : `${baseUrl}${url.loc}`;
    const lastmod = url.lastmod || currentDate;
    const changefreq = url.changefreq || 'weekly';
    const priority = url.priority || 0.5;

    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;
};

// Static routes for the sitemap
export const staticRoutes: SitemapUrl[] = [
  {
    loc: '/',
    changefreq: 'daily',
    priority: 1.0
  },
  {
    loc: '/movies',
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: '/tv-shows',
    changefreq: 'daily',
    priority: 0.9
  },
  {
    loc: '/originals',
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: '/trending',
    changefreq: 'daily',
    priority: 0.8
  },
  {
    loc: '/watch-free',
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    loc: '/help',
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    loc: '/contact',
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    loc: '/privacy',
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: '/terms',
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: '/login',
    changefreq: 'monthly',
    priority: 0.4
  }
];

// Generate the complete sitemap
export const generateCompleteSitemap = (): string => {
  return generateSitemap(staticRoutes);
};
