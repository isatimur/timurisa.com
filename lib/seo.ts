import type { Metadata } from 'next';
export const SITE_URL = 'https://timurisa.com';
export const person = {
  '@type': 'Person', '@id': `${SITE_URL}/#person`, name: 'Timur Isachenko',
  url: SITE_URL, jobTitle: 'AI CTO & Principal Solution Architect',
  sameAs: ['https://github.com/isatimur', 'https://linkedin.com/in/timur-isachenko'],
  knowsAbout: ['AI engineering', 'Solution architecture', 'Distributed systems', 'Apache Ignite', 'Generative AI'],
};
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const url = `${SITE_URL}${path}`;
  return { title: { absolute: title.includes("Timur Isachenko") ? title : `${title} | Timur Isachenko` }, description, alternates: { canonical: url },
    openGraph: { type: 'website', url, siteName: 'Timur Isachenko', title, description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Timur Isachenko — AI engineering and solution architecture' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] } };
}
