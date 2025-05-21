// ✅ app/sitemap.xml/route.js

export async function GET() {
  const baseUrl = 'https://calculatingwithme.com';

  const pages = [
    '', // homepage
    'bmi-calculator',
    'loan-calculator',
    'mortgage-calculator',
    'investment-calculator',
    'salary-calculator',
    'compound-interest-calculator',
    'currency-converter',
    'interest-rate-calculator',
    'percentage-calculator',
    'scientific-calculator',
    'word-counter',
    'reverse-text',
    'uppercase-lowercase',
    'extra-space-remover',
    'duplicate-line-remover',
    'invoice-generator',
    'estimate-generator',
    'finance-calculator',
    'text-tools',
  ];

  const urls = pages.map((page) => {
    return `
    <url>
      <loc>${baseUrl}/${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(sitemap.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
