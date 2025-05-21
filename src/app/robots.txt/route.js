// ✅ app/robots.txt/route.js

export async function GET() {
  const content = `
User-agent: *
Allow: /

Sitemap: https://calculatingwithme.com/sitemap.xml
`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
