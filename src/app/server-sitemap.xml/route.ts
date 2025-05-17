import { getServerSideSitemap } from 'next-sitemap'

export async function GET() {
  const appUrl = process.env.APP_URL as string;
  const fields = [
    {
      loc: appUrl,
      lastmod: new Date().toISOString(),
      images: [
        {
          loc: new URL(`${appUrl}/logo.webp`),
          title: 'Image Optimizer',
        },
      ],
    },
    {
      loc: `${appUrl}/features`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${appUrl}/about`,
      lastmod: new Date().toISOString(),
    },
    {
      loc: `${appUrl}/blog/benifits-of-web-format`,
      lastmod: new Date().toISOString(),
    },
  ]

  return getServerSideSitemap(fields)
}
